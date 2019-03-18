  import { Component, OnInit } from '@angular/core';

  @Component({
    selector: 'app-progress',
    templateUrl: './progress.component.html',
    styles: []
  })
  export class ProgressComponent implements OnInit {
    public porcentaje1 : Number;
    public porcentaje2 : Number;


    constructor() {
      this.porcentaje1 = 50;
      this.porcentaje2 = 20;
    }

    ngOnInit() {
    }



  }
