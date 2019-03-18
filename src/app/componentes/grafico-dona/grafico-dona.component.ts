  import { Component, OnInit, Input } from '@angular/core';

  @Component({
    selector: 'app-grafico-dona',
    templateUrl: './grafico-dona.component.html',
    styles: []
  })
  export class GraficoDonaComponent implements OnInit {
    @Input('data') dataGrafico : Number[] = [];
    @Input('labels') labelsGrafico : String[] = [];
    @Input('type') typeGrafico : String = '';
    @Input('leyenda') leyendaGrafico : String = '';

    constructor() {
    }

    ngOnInit() {
    }

  }
