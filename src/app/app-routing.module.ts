import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { validarAccesoGuard } from './guards/validar-acceso.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m=> m.AuthModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then(m=> m.UsuariosModule),
    canActivate: [validarAccesoGuard],
    canLoad: [validarAccesoGuard]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
