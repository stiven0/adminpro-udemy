  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { map, filter } from 'rxjs/operators';
  import { Usuario } from '../../models/usuario.model';
  import { URL_SERVICE } from '../../config/config';
  import { Router } from '@angular/router';
  import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

  @Injectable({
    providedIn: 'root'
  })
  export class UsuarioService {
    public url : string;
    public usuario : Usuario;
    public token : string;

    constructor(private http : HttpClient, private router : Router, private _subirImagen : SubirArchivoService) {
      this.url = URL_SERVICE;
      this.cargarStorage();
    }

    // funcion para determinar si el usuario tiene el token valido o no
    estaLogueado(){
      return ( this.token.length > 1 ) ? true : false;
    };

    cargarStorage(){
      if(localStorage.getItem('token')){
          this.token = localStorage.getItem('token');
          this.usuario = JSON.parse(localStorage.getItem('usuario'));
      } else {
          this.token = '';
          this.usuario = null;
      }
    };

    // funcion para guardar informacion en el localStorage
    guardarLocalstorage(response){
      localStorage.setItem('id', response.id);
      localStorage.setItem('token', response.token);
      localStorage.setItem('usuario', JSON.stringify(response.usuario));

      this.usuario = response.usuario;
      this.token = response.token;
    };

    // salir de la aplicacion
    Logout(){
      this.usuario = null;
      this.token = '';
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      localStorage.removeItem('id');

      this.router.navigate(['/login']);
    };

    // servicio para crear un usuario
    crearUsuario(usuario : Usuario){
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post(this.url + 'usuario/', usuario, { headers })
                      .pipe(map((response:any) => {
                              swal('Usuario creado', usuario.email, 'success');
                              return response['user'];
                      }));
    };

    // login de usuario normal
    loginUsuario(usuario : Usuario, recordar : boolean = false){

      // comprobar si el usuario le ha dado recordar, y guardamos correo del usuario en el localStorage
      if(recordar){
          localStorage.setItem('correo', usuario.email);
      } else {
          localStorage.removeItem('correo');
      }


      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post(this.url + 'login', usuario, { headers })
                      .pipe(map(response => {

                            this.guardarLocalstorage(response);
                            return true;
                      }));
    };


    // login de google
    loginGoogle(tokenGoogle : string){
      return this.http.post(this.url + 'login/google', { tokenGoogle })
                      .pipe(map(response => {

                        this.guardarLocalstorage(response);
                        return true;
                      }));
    };

    // actualizar usuario
    actualizarUsuario(datos : Usuario){
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('token', this.token );
      return this.http.put(this.url + `usuario/${ this.usuario._id }`, datos, { headers })
                      .pipe(map( (response:any) => {

                        localStorage.setItem('usuario', JSON.stringify(response.usuario));
                        localStorage.setItem('id', response.usuario._id);
                        localStorage.setItem('token', this.token);
                        swal('Usuario actualizado', this.usuario.nombre, 'success');
                        return true;
                      }));

    };

    // subir archivo al backend
    cambiarImagen(archivo : File, id : string){

      // llamamos al servicio subirArchivo y le pasamos los datos
      this._subirImagen.subirArchivo(archivo, 'usuarios', id)
                       .then((response:any) => {

                            this.usuario.img = response.usuario.img;
                            swal('Imagen actualizada', this.usuario.nombre, 'success');
                            this.guardarLocalstorage(response
                       })
                       .catch(error => console.log(error));

    };

  }
