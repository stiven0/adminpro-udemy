  import { Component, OnInit } from '@angular/core';
  import { UsuarioService, SubirArchivoService } from '../../services/service.index';
  import { Usuario } from '../../models/usuario.model';

  @Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styles: []
  })
  export class ProfileComponent implements OnInit {
    public usuario : Usuario;
    public formulario : Usuario;
    public token : string;
    public imagenSubir : File;
    public imagenTemporal : any;

    constructor(private _usuarioServicio : UsuarioService, private _subirImagen : SubirArchivoService) {
      this.usuario = this._usuarioServicio.usuario; // datos del usuario
    }

    ngOnInit() {
    }

    // submit del formulario actualizar
    guardar(form : Usuario) {
      this.usuario.nombre = form.nombre;

      if(!this.usuario.google){
          this.usuario.email = this.usuario.email;
      }

      // llamamos al servicio y le pasamos el usuario a actualizar
      this._usuarioServicio.actualizarUsuario(this.usuario).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
    };


    seleccionImagen(archivo : File){
      // si el usuario no sube ningun archivo inicializamos la imagenSubir en null y hacemos un return
      if(!archivo){
          this.imagenSubir = null;
          return;
      }

      // si el archivo subido no es una imagen
      if(archivo.type.indexOf('image') < 0){
          swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
          this.imagenSubir = null;
          return;
      }

      this.imagenSubir = archivo;

      // lineas para mostrar una imagen de manera asincrona, apenas el usuario la halla seleccionado, sin cargarla aun a la DB
      let reader = new FileReader();
      let urlImagenTemp = reader.readAsDataURL(archivo);

      // inicializamos la imagenTemporal con la imagen en base 64 que devuelve el reader
      reader.onloadend = () => this.imagenTemporal = reader.result;



    };

    // boton que permitira el cambio de imagen
    cambiarImagen(){
      this._usuarioServicio.cambiarImagen(this.imagenSubir, this.usuario._id);
    
    };
  }
