import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import {v4 as uuidv4} from 'uuid';
import { Usuario } from '../../interfaces/usuario.interface';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styles: ``
})
export class FormularioComponent implements OnInit {
  esNuevo = true;
  usuarioEditar: Usuario = { id: null, imagen: null, nombre: null, email: null, rol: null, fechaAlta: null};
  formularioUsuario: FormGroup = this.fb.group({
    imagen:[null, Validators.required],
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6),]],
    confirmar: ['', [Validators.required, Validators.minLength(6)]],
    rol: ['', Validators.required],
    fechaAlta: [new Date().toLocaleDateString('es-MX')],
  }, {
    validators: this.passwordIguales('password', 'confirmar')
  });

  constructor(private fb: FormBuilder, private router: Router,
              private cd: ChangeDetectorRef, private activatedRoute: ActivatedRoute,
              private usuariosService: UsuariosService){ }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) =>  {
      if(id)
      { this.cargarDatos(id); }
    });
  }

  cargarDatos(id: any){
    const usuariosExistentes = JSON.parse(localStorage.getItem('listaUsuarios')!)
    const { imagen, nombre, email, password, rol, fechaAlta } = usuariosExistentes.find((x: any)=> x.id === id);
    this.usuarioEditar = { id, imagen, nombre, email, rol, fechaAlta };
    this.formularioUsuario.setValue({ imagen, nombre, email, password, 'confirmar': password, rol, fechaAlta});
    this.esNuevo = false;
  }

  async guardar(){
    if(this.formularioUsuario.invalid){
      Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
    }else{
      const imagen = this.formularioUsuario.get('imagen')?.value;
      const nombre = this.formularioUsuario.get('nombre')?.value;
      const email = this.formularioUsuario.get('email')?.value;
      const password = this.formularioUsuario.get('password')?.value;
      const rol = this.formularioUsuario.get('rol')?.value;
      const fechaAlta = this.formularioUsuario.get('fechaAlta')?.value;
      
      if(this.esNuevo){
        const id = uuidv4();
        const usuarioActual = {id, imagen, nombre, email, password, rol, fechaAlta}
        this.usuariosService.guardarElemento(usuarioActual);

        Swal.fire({
          title: 'Guardado',
          text: 'La información se guardó correctamente',
          icon: 'success', allowOutsideClick: false,
          confirmButtonText: "Ok"
        }).then((result =>{
            if(result.isConfirmed){
              this.router.navigateByUrl('/usuarios');
            }
          }
        ));
      } else {
        const usuarioEditar = { ...this.formularioUsuario.value, id: this.usuarioEditar.id };
        this.usuariosService.editarElemento(usuarioEditar);

        Swal.fire({
          title: 'Editado',
          text: 'La información se editó correctamente',
          icon: 'success', allowOutsideClick: false,
          confirmButtonText: "Ok"
        }).then((result =>{
            if(result.isConfirmed){
              this.router.navigateByUrl('/usuarios');
            }
          }
        ));
      }
      
    }
  }

  onFileChange(event: any) {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.formularioUsuario.patchValue({
          imagen: reader.result
        });

        this.cd.markForCheck();
      };
    }
  }

  passwordIguales(pass1: string, pass2: string){
    return (formGroup: FormGroup) =>{
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if(pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    }
  }
}
