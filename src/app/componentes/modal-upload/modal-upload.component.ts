  import { Component, OnInit } from '@angular/core';
  import { SubirArchivoService } from '../../services/service.index';
  import { ModalUploadService } from './modal-upload.service';

  @Component({
    selector: 'app-modal-upload',
    templateUrl: './modal-upload.component.html',
    styles: []
  })
  export class ModalUploadComponent implements OnInit {
    public imagenSubir : File;
    public imagenTemporal : any;

    constructor(private _subirImagen : SubirArchivoService, private _moduloUploadService : ModalUploadService) {
    }

    ngOnInit() {
    }

    cerrarModal(){
      this.imagenSubir = null;
      this.imagenTemporal = null;

      this._moduloUploadService.ocultarModal();
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

    // subir imagen desde el modal
    subirImagen(){
      this._subirImagen.subirArchivo(this.imagenSubir, this._moduloUploadService.tipo, this._moduloUploadService.id)
                      .then(result => {

                        // emitir una notificacion en _moduloUploadService
                        this._moduloUploadService.notificacion.emit(result);
                        this.cerrarModal();

                      })
                      .catch(error => {
                        console.log('Error en la carga...');
                      });
    };


  }
