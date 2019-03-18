import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress : ElementRef;

  @Input('') porcentaje : number;
  @Input('nombre') leyenda : string;

  @Output() cambioPorcentaje : EventEmitter<number>;

  constructor() {
    this.cambioPorcentaje = new EventEmitter();
  }

  ngOnInit() {
  }

  onChanges(newValue : number ){

    // seleccionamos el o los elementos que tengan por name porcentaje y seleccionamos el primero de ellos
    // let elementoHtml : any = document.getElementsByName('porcentaje')[0];

    if(newValue >= 100){
        this.porcentaje = 100;
    } else if ( newValue <= 0){
        this.porcentaje = 0;
    } else {
        this.porcentaje = newValue;
    }

    // definimos que el valor del input html va ser igual al del porcentaje
    // elementoHtml.value = this.porcentaje;

    this.txtProgress.nativeElement.value = this.porcentaje;

    this.cambioPorcentaje.emit(this.porcentaje);
  }

  cambiar( valor : number ){
    if( this.porcentaje >= 100 && valor > 0){
        this.porcentaje = 100;
        return;
    }
    if( this.porcentaje === 0 && valor < 0){
        this.porcentaje = 0;
        return;
    }

    this.porcentaje = Number(this.porcentaje) + valor;
    this.cambioPorcentaje.emit(this.porcentaje);
    this.txtProgress.nativeElement.focus();
  }

 }
