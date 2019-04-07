  // guards para verificar token
  import { Injectable } from '@angular/core';
  import { CanActivate } from '@angular/router';
  import { UsuarioService } from '../usuario/usuario.service';
  import { Router } from '@angular/router';

  @Injectable({
    providedIn: 'root'
  })
  export class VerificaTokenGuard implements CanActivate {
    public token : string;

    constructor(private _usuarioServicio : UsuarioService, private router : Router){
      this.token = this._usuarioServicio.token;
    }

    canActivate(): Promise<boolean> | boolean {

      // decodificar token - transformamos el token en un array y extramos la posicion [1]
      let payload = JSON.parse( atob(this.token.split('.')[1]) );
      // le pasamos el tiempo de expiracion del token a la funcion comprobarExpiracionToken
      let expirado = this.comprobarExpiracionToken(payload.exp);

      if(expirado){ // si retorna true, negamos el acceso en el canActivate
          this.router.navigate(['/login']);
          return false;
      }

      // si el token no ha expirado llamamos la funcion verificarRenueva y le pasamos el tiempo de exp de token
      return this.verificarRenueva(payload.exp);

    }

    // funcion para renovar el token
    verificarRenueva(fechaExp : number): Promise<boolean>{

      return new Promise((resolve, reject) => {

        let tokenExp = new Date(fechaExp * 1000); // expiracion de token actual en milisegundos
        let ahora = new Date(); // fecha actual

        ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 * 1000 ));  // hora actual mas (+) 1 hora

        // console.log(tokenExp);
        // console.log(ahora);

        // si la fecha de expiracion del token es mayor que ahora, quiere decir que el token no esta proximo a expirar
        if(tokenExp.getTime() > ahora.getTime()){
            resolve(true);

        // si el token esta proximo a expirar - llamamos el servicio y renovamos el token
        } else {
            this._usuarioServicio.renuevaToken().subscribe(
              response => {
                resolve(true);
              },
              error => {
                this.router.navigate(['/login']);
                reject(false);
              });
        }

      });
    };

    // funcion para comprobar la expiracion del token
    comprobarExpiracionToken(fechaExp : number){

      let ahora = new Date().getTime() / 1000; // obtener la hora actual en segundos
      // si la fechaExp es menor a la hora actual quiere decir que el token ya expiro
      if( fechaExp < ahora){
            return true;
      // si no el token no ha expirado
      } else{
          return false;
      }


    };
  }
