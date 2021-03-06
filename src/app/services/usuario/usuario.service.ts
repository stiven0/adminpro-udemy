  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { map, filter, catchError } from 'rxjs/operators';
  import { Usuario } from '../../models/usuario.model';
  import { URL_SERVICE } from '../../config/config';
  import { Router } from '@angular/router';
  import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class UsuarioService {
    public url : string;
    public usuario : Usuario;
    public token : string;
    public menu : any = [];

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
          this.menu = JSON.parse(localStorage.getItem('menu'));
      } else {
          this.token = '';
          this.usuario = null;
          this.menu = [];
      }
    };

    // funcion para guardar informacion en el localStorage
    guardarLocalstorage(response, menu? : any){
      localStorage.setItem('id', response.id);
      localStorage.setItem('token', response.token);
      localStorage.setItem('usuario', JSON.stringify(response.usuario));
      localStorage.setItem('menu', JSON.stringify(menu));

      this.usuario = response.usuario;
      this.token = response.token;
      this.menu = menu;
    };

    // salir de la aplicacion
    Logout(){
      this.usuario = null;
      this.token = '';
      this.menu = [];

      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      localStorage.removeItem('id');
      localStorage.removeItem('menu');

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
                            this.guardarLocalstorage(response, response['menu']);
                            return true;
                      }));

    };


    // login de google
    loginGoogle(tokenGoogle : string){
      return this.http.post(this.url + 'login/google', { tokenGoogle })
                      .pipe(map(response => {

                        this.guardarLocalstorage(response, response['menu']);
                        return true;
                      }));
    };

    // actualizar usuario
    actualizarUsuario(datos : Usuario){
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('token', this.token );
      return this.http.put(this.url + `usuario/${ this.usuario._id }`, datos, { headers })
                      .pipe(map( (response:any) => {

                        if(datos._id === this.usuario._id ){
                            localStorage.setItem('usuario', JSON.stringify(response.usuario));
                            localStorage.setItem('id', response.usuario._id);
                            localStorage.setItem('token', this.token);
                            localStorage.setItem('menu', JSON.stringify(this.menu));
                        }

                        swal('Usuario actualizado', this.usuario.nombre, 'success');
                        return true;
                      }));

    };

    // subir imagen al backend
    cambiarImagen(archivo : File, id : string){

      // llamamos al servicio subirArchivo y le pasamos los datos
      this._subirImagen.subirArchivo(archivo, 'usuarios', id)
                       .then((response:any) => {

                            this.usuario.img = response.usuario.img;
                            swal('Imagen actualizada', this.usuario.nombre, 'success');
                            this.guardarLocalstorage(response);
                       })
                       .catch(error => console.log(error));

    };

    // obtener usuarios de forma paginada
    getUsuarios(desde? : number){
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.get(this.url + `usuario/?desde=${ desde }`, { headers });
    };

    // buscar por coleccion de usuarios
    buscarUsuarios(termino : string){
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.get(this.url + 'busqueda/coleccion/usuarios/' + termino, { headers })
                      .pipe(map(response => response['usuarios']));
    };

    // buscar en todas las colecciones
    busquedaGeneral(termino : string){
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.get(this.url + 'busqueda/todo/' + termino, { headers });
    };

    // borrar usuario
    borrarUsuario(id : string){
      let headers = new HttpHeaders().set('token', this.token)
                                     .set('Content-Type', 'application/json');
      return this.http.delete(this.url + 'usuario/' + id, { headers })
                      .pipe(map(response => response['ok']));
    };

    // servicio pra renovar token
    renuevaToken(){
      let headers = new HttpHeaders().set('token', this.token)
                                     .set('Content-Type', 'application/json');

      return this.http.get(this.url + 'login/renueva-token', { headers })
                      .pipe(map(response => {

                        this.token = response['token'];
                        localStorage.setItem('token', this.token);
                        console.log('token renovado');
                        return true;
                      }));

                      // // manejar error en un servicio atraves de catchError
                      // catchError(error => {
                      //   this.router.navigate(['/login']);
                      //   swal('No se puedo renovar token', 'No fue posible renovar token', 'error');
                      //   return Observable.throw(error); // retornamo el Observable
                      // });
    };
  }
