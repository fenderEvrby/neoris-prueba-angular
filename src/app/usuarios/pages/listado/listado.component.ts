import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from '../../interfaces/usuario.interface';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: ``
})
export class ListadoComponent implements OnInit {
  
  usuarios: Usuario[] = [];

  constructor(private usuariosService: UsuariosService){}

  ngOnInit(): void {
    if(!localStorage.getItem('listaUsuarios')){
      this.usuariosService.establecerDatosIniciales();
    }
    this.usuarios = JSON.parse(localStorage.getItem('listaUsuarios')!);
  }

  borrar(id: string){
    
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      text: "¿Desea borrar el usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.borrarElemento(id)
        this.usuarios = JSON.parse(localStorage.getItem('listaUsuarios')!);
      }
    });
  }

}
