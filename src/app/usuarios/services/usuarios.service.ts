import { Injectable } from '@angular/core';
import {v4 as uuidv4} from 'uuid';
import { Usuario } from '../interfaces/usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  establecerDatosIniciales(){
    if(!localStorage.getItem('listaUsuarios')){
      const id = uuidv4();
      const imagen = "data:image/png;base64,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";
      const nombre = "Rubén Aquino Santos";
      const email = "ruben.aquino@neoris.com";
      const password = "password123";
      const rol = "Administrador";
      const fechaAlta = new Date().toLocaleDateString("es-MX");

      const usuarioActual = {id, imagen, nombre, email, password, rol, fechaAlta}
      const usuarios = [];
      usuarios.push(usuarioActual)

      localStorage.setItem('listaUsuarios', JSON.stringify(usuarios))
    }
  }

  guardarElemento(usuario: Usuario){
    const usuariosExistentes = JSON.parse(localStorage.getItem('listaUsuarios')!);
    usuariosExistentes.push(usuario);
  
    localStorage.setItem('listaUsuarios', JSON.stringify(usuariosExistentes))
  }

  editarElemento(usuario: Usuario){
    const usuariosExistentes = JSON.parse(localStorage.getItem('listaUsuarios')!);
    const index = usuariosExistentes.findIndex((obj: any)=> obj.id ===  usuario.id);
    usuariosExistentes[index] = usuario;
    localStorage.setItem('listaUsuarios', JSON.stringify(usuariosExistentes));
  }

  borrarElemento(id: string){
    let usuarios = JSON.parse(localStorage.getItem('listaUsuarios')!);
    usuarios = usuarios.filter((x:any)=> x.id !== id)
    localStorage.setItem('listaUsuarios', JSON.stringify(usuarios))
  }
}
