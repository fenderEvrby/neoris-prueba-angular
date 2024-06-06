import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor() {
    if(!localStorage.getItem('masterUser')){
      localStorage.setItem('masterUser', '{"email":"master@mail.com","password":"master123"}')
    }
  }

  login(email: string, password: string): boolean{
    const _usuario = JSON.parse(localStorage.getItem('masterUser')!)
    
    if(email === _usuario.email && password === _usuario.password){
      return true
    }else{
      return false
    }
  }
}
