import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {

  formularioLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService){ }

  login(){
    const { email, password } = this.formularioLogin.value;

    if(this.authService.login(email, password)){
      localStorage.setItem('acceso', "1");
      this.router.navigateByUrl('/usuarios');
    } else{
      Swal.fire({title: 'Error', text: 'Usuario o contraseña incorrecta', icon: 'error', allowOutsideClick: false});
    }

  }
}
