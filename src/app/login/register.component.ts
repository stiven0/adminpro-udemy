  import { Component, OnInit } from '@angular/core';
  import { FormGroup, FormControl, Validators } from '@angular/forms';
  import swal from 'sweetalert';
  import { Usuario } from '../models/usuario.model';
  import { UsuarioService } from '../services/service.index';
  import { Router } from '@angular/router';

  declare function init_plugins();

  @Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./login.component.css']
  })
  export class RegisterComponent implements OnInit {
    public forma : FormGroup;
    public usuario : Usuario;

    constructor(private _usuarioService : UsuarioService, private router : Router) {
    }

    ngOnInit() {
      init_plugins();

      // formulario por data para registro
      this.forma = new FormGroup({
        nombre : new FormControl(null, Validators.required, ),
        email : new FormControl(null, [Validators.required, Validators.email], ),
        password : new FormControl(null, [Validators.required], ),
        password2 : new FormControl(null, [Validators.required], ),
        condiciones : new FormControl(false)
      }, { validators : this.sonIguales('password', 'password2') }); // validacion metodo sonIguales(dentro los campo a evaluar)

      // rellenar formulario de forma automatica
      this.forma.setValue({
        nombre : 'test ',
        email : 'test1@hotmail.com',
        password : '123456',
        password2 : '123456',
        condiciones : true

      });
    }

    // submit del formulario
    registro(){
      if(this.forma.invalid){
          return;
      }
      if(!this.forma.value.condiciones){
          swal("Importante", "Debes aceptar las condiciones!", "warning");
          return;
      }

      // crear el usuario a guardar, con base en nuestro modelo de usuario
      this.usuario = new Usuario(
        this.forma.value.nombre,
        this.forma.value.email,
        this.forma.value.password
      );

      // subscripcion al servicio para guardar un usuario
      this._usuarioService.crearUsuario(this.usuario).subscribe(
        response => {
          this.router.navigate(['/login']);
        },

        error => {
          console.log(error);
        });

    };

    // metodo para comprobar que las contraseñas coincidan
    sonIguales(password1:string, password2:string){
      return (group : FormGroup) => {

        // obtenemos los valores de los campos seleccionados (en este caso los password)
        let pass1 = group.controls[password1].value;
        let pass2 = group.controls[password2].value;

        // comprobar que las contraseñas son iguales y que pase por eso retornamos null
        if(pass1 === pass2){
          return null;
        }

        // si las contraseñas no coincidan
        return {
          sonIguales : true
        };

      };
    };


  }
