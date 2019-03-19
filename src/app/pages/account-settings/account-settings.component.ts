  import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
  import { SettingsService } from '../../services/service.index';

  @Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styles: []
  })
  export class AccountSettingsComponent implements OnInit {

    constructor(private _settingsServicio : SettingsService) {
    }

    ngOnInit() {
      this.colocarCheck();
    }

    cambiarColor(color : string, link : any ){
      this.aplicarCheck(link);

      this._settingsServicio.apicarTema(color);

    };



    aplicarCheck(link : any){
      let selectores : any = document.getElementsByClassName('selector');

      for(let selector of selectores){
           selector.classList.remove('working');
      }
      link.classList.add('working');
    };

    colocarCheck(){
      let selectores : any = document.getElementsByClassName('selector'); // selecionar los elementos con clase selector
      let tema = this._settingsServicio.ajustes.tema; // obtener el tema (color) actual

      for (let selector of selectores){
            if( selector.getAttribute('data-theme') === tema ){ // comprobar cual de los elementos tiene el data-theme = al tema actual
                  selector.classList.add('working'); // adicionar o agregar la clase working a ese elemento en particular
                  break; // dejar de iterar el bucle apenas encuentre el elemento
            }
      }

    };

  }
