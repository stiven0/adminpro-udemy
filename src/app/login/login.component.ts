  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { NgForm } from '@angular/forms';
  import { UsuarioService } from '../services/usuario/usuario.service';
  import { Usuario } from '../models/usuario.model';

  declare function init_plugins();
  declare const gapi : any;

  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent implements OnInit {
    public recuerdame : boolean = false;
    public usuario : Usuario;
    public email : string;
    public auth2 : any;

    constructor(public router : Router, private _usuarioServicio : UsuarioService ) {
    }

    ngOnInit() {
      init_plugins();
      this.googleInit();
      this.email = localStorage.getItem('correo') || '';

      if(this.email.length > 1){
          this.recuerdame = true;
      }

    }
    // funcion para recibir token de google
    googleInit(){
      gapi.load('auth2', () => {

        this.auth2 = gapi.auth2.init({
          client_id : '835064850729-6g8fa51u430sev8iqrk9ne5j5labjkhi.apps.googleusercontent.com', // id del cliente de nuestra applicacion
          cookiepolicy : 'single_host_origin',
          scope : 'profile email'
        });

        // llamamos al metodo attachSignin y le pasamos el boton con id google
        this.attachSignin( document.getElementById('btnGoogle'));

      });
    };

    // recibir informacion del usuario que se autentica por google
    attachSignin( element ){
      this.auth2.attachClickHandler( element , {}, (googleUser) => {
        // let profile = googleUser.getBasicProfile();

        let token = googleUser.getAuthResponse().id_token; // obtener token de google
        console.log(token);

        // servicio para logueo de google, le pasamos el token
        this._usuarioServicio.loginGoogle(token).subscribe(
          (response:any) => {

            if(response === true){
                window.location.href = '#/dashboard';
            }

          },
          error => {
            console.log(error);
          });

      });
    };

    // submit del formulario
    ingresar(formulario : NgForm){

      if(formulario.invalid){
          return;
      }
      // nombre y correo de usuario
      this.usuario = new Usuario(null, formulario.value.email, formulario.value.password);

      // servicio para realizar el login
      this._usuarioServicio.loginUsuario(this.usuario, this.recuerdame).subscribe(
        (response:any) => {

          if(response === true){
            this.router.navigate(['/dashboard']);
          }

        },
        error => {
          console.log(error);
        });
    };

  }
