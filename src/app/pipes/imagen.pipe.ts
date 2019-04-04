  // pipe para trabajar con imagenes
  import { Pipe, PipeTransform } from '@angular/core';
  import { URL_SERVICE } from '../config/config';

  @Pipe({
    name: 'imagen'
  })
  export class ImagenPipe implements PipeTransform {

    transform(imagen: string, tipo : string = 'usuarios' ): any {

      // ruta del backend para devolver imagenes
      let url = URL_SERVICE + 'img';


      // si no viene ninguna imagen
      if(!imagen){
          return url + '/usuarios/xxx';
      }

      // comprobar si la imagen que viene tiene en su path 'https', quiere decir que es de google y la retornamos igual
      if(imagen.indexOf('https') >= 0) {
          return imagen;
      }

      // comprobar de que tipo es la imagen
      switch(tipo) {

        case 'usuarios' :
         url += '/usuarios/' + imagen;
        break;

        case 'medicos' :
           url += '/medicos/' + imagen;
        break;

        case 'hospitales' :
           url += '/hospitales/' + imagen;
        break;

        default :
          console.log('Tipo de imagen no existe, usuarios, medicos, hospitales ', tipo);
          url += '/usuarios/xxx';
      }
      return url;

    }

  }
