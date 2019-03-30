  import { Component, OnInit } from '@angular/core';
  import { Usuario } from '../../models/usuario.model';
  import { UsuarioService } from '../../services/service.index';
  import { ModalUploadService } from '../../componentes/modal-upload/modal-upload.service';

  declare let swal : any;

  @Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
  })
  export class UsuariosComponent implements OnInit {
    public usuarios : Usuario[] = [];
    public desde : number = 0;
    public totalRegistro : number = 0;
    public cargando : boolean = true;
    public cero_resultados : boolean = false;

    constructor(private _usuariosServicio : UsuarioService, private _moduloUploadService : ModalUploadService) {
    }

    ngOnInit() {
      this.cargarUsuarios();

      // metodo para subscribirme a una notificacion en _moduloUploadService
      this._moduloUploadService.notificacion.subscribe(
        response => {
        this.cargarUsuarios();
      });
    }

    cargarUsuarios(){
      this.cargando = true;
      this._usuariosServicio.getUsuarios(this.desde).subscribe(
        (response:any) => {
         this.cargando = false;
         this.usuarios = response.usuarios;
         this.totalRegistro = response.totalUsuarios;
        },
        error => {
          console.log(error);
        });
    };

    // funcion para cambiar o paginar los usuarios
    cambiarDesde(valor : number){

      let desde = this.desde + valor;

      // comprobar si desde es mayor al numero total de registros en la DB
      if(desde >= this.totalRegistro){
          return;
      }
      // si desde es menor que cero
      if(desde < 0){
          return;
      }

      // le adjucamos el valor this.desde mas el valor que recibimos
      this.desde += valor;
      this.cargarUsuarios();
    };

    // metodo para buscar un o unos usuarios atraves de una busqueda
    buscarUsuario( termino : string ){

      if(termino.length <= 0){
          this.cargarUsuarios();
          return;
      } else {
        this.cargando = true;
        this._usuariosServicio.buscarUsuarios(termino).subscribe(
          response => {
            this.cargando = false;

            if(response.length === 0){
                this.cero_resultados = true;
                return;
            }
            this.cero_resultados = false;
            this.usuarios = response;
          },
          error => {
            this.cero_resultados = false;
            console.log(error);
          });
        };
      };

      // metodo para borrar un usuario
      borrarUsuarios(usuario : Usuario){
          if(usuario._id === this._usuariosServicio.usuario._id){
              swal('No se puede borra usuario', 'No se puedo borrar a si mismo', 'error');
          } else {

            // mensaje de confirmacion para borar un usuario
            swal({
                title: '¿Esta seguro?',
                text: 'Esta a punto de borrar a ' + usuario.nombre,
                icon: 'warning',
                buttons: ['Cancelar', 'Aceptar'],
                dangerMode: true,
              })
              .then(borrar => {

                if (borrar) {
                    this._usuariosServicio.borrarUsuario(usuario._id).subscribe(
                        response => {
                            if(response === true){
                                swal('Exito', 'El usuario se ha borrado correctamente', 'success');
                                this.cargarUsuarios();
                            }
                          },
                          error => {
                              console.log(error);
                            });
                }
              });

          }
      };

      // actualizar role de usuario
      guardar(usuario : Usuario){
        this._usuariosServicio.actualizarUsuario(usuario).subscribe(
          response => {
            // if(response == true){
            //     this.cargarUsuarios();
            // }
          },
          error => {
            console.log(error);
          });
      };

      // funcion para llamar el metodo de _moduloUploadService que muestra el modal para cambiar img
      mostrarM( id : string){
        this._moduloUploadService.mostrarModal('usuarios', id);
      };

  }
