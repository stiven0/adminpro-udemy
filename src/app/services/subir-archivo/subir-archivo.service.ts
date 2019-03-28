  // servicio para subir una imagen al backend

  import { Injectable } from '@angular/core';
  import { URL_SERVICE } from '../../config/config';

  @Injectable({
    providedIn: 'root'
  })
  export class SubirArchivoService {

    constructor() {
    }

    // recibe el archivo, de que tipo sera (medico, usuario, hospital) y el id del usuario
    subirArchivo( archivo : File, tipo : string, id : string ){

      return new Promise((resolve, reject) => {

        let formData = new FormData(); // payload que vamos a subir
        let xhr = new XMLHttpRequest(); // inicializar peticion ajax

        formData.append( 'imagen', archivo, archivo.name ); // inicializar formData (nombre del campo, archivo y su nombre)

        // configuracion peticion Ajax
        xhr.onreadystatechange = () => {

          // cuando termine el proceso
          if(xhr.readyState === 4){

            // si todo salio correctamente
            if(xhr.status === 200){
              console.log('imagen subida');
              resolve(JSON.parse(xhr.response));

              // si ocurrio un error
            } else {
                console.log('Fallo la subida');
                reject(xhr.response);
            }

          }

        };

        // definimos la url a la cual se va a realizar la peticion
        let url = `${ URL_SERVICE }upload/${ tipo }/${ id }`;

        xhr.open('PUT', url, true); // definimos la peticion, le pasamos la url y definimos que se asincrona (true)
        xhr.send(formData); // por ultimo enviamos el formulario el formData con la imagen a subir
      });


    };


  }
