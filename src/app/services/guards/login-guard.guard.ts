  import { Injectable } from '@angular/core';
  import { CanActivate, Router } from '@angular/router';
  import { UsuarioService } from '../usuario/usuario.service';

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGuardGuard implements CanActivate {

    constructor(private router : Router, private _usuarioService : UsuarioService){

    }

    // proctetor de rutas
    canActivate() {
      if(this._usuarioService.estaLogueado()){
          return true;
      } else {
          this.router.navigate(['/login']);
          return false;
      }

    }
  }
