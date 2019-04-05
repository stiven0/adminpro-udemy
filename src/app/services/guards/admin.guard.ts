  import { Injectable } from '@angular/core';
  import { CanActivate } from '@angular/router';
  import { UsuarioService } from '../usuario/usuario.service';
  import { Router } from '@angular/router';

  @Injectable({
    providedIn: 'root'
  })
  export class AdminGuard implements CanActivate {
    constructor(private _usuarioServicio : UsuarioService, private router : Router){

    }

    canActivate(){
      if(this._usuarioServicio.usuario.role === 'ADMIN_ROLE'){
          return true;
      } else {
        // this.router.navigate(['/dashboard']);
        this._usuarioServicio.Logout();
        return false;
      }
    }

  }
