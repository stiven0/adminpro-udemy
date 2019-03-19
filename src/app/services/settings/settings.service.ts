  import { Injectable, Inject } from '@angular/core';
  import { DOCUMENT } from '@angular/platform-browser';

  @Injectable({
    providedIn: 'root'
  })
  export class SettingsService {

    public ajustes : Ajustes = {
      temaUrl : 'assets/css/colors/default.css',
      tema : 'default'
    };

    constructor( @Inject(DOCUMENT) private _document) {
      this.cargarAjustes();
    }

    // guardar ajustes en el localStorage
    guardarAjustes(){
      localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
    };

    // obtener los ajustes guardados en el localStorage
    cargarAjustes(){

      if(localStorage.getItem('ajustes')){
        this.ajustes = JSON.parse(localStorage.getItem('ajustes'));

        this.apicarTema(this.ajustes.tema);
      } else {
          this.apicarTema(this.ajustes.tema);
      }
    };

    apicarTema( tema : string ){
      let url = `assets/css/colors/${ tema }.css`;

      // selecionar elemento que tenga el id tema y cambiar el atributo href
      this._document.getElementById('tema').setAttribute('href', url);

      this.ajustes.temaUrl = url; // llamamos al servicio y modificamos la propiedad ajustes - temaUrl
      this.ajustes.tema = tema; // llamamos al servicio y modificamos la propiedad ajustes - tema

      this.guardarAjustes(); // llamamos al servicio y el metodo guardarAjustes

    }

  }



  // interface para registringir parametros
  interface Ajustes {
    temaUrl : string;
    tema : string;
  }
