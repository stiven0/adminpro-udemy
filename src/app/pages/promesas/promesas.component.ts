  import { Component, OnInit } from '@angular/core';

  @Component({
    selector: 'app-promesas',
    templateUrl: './promesas.component.html',
    styles: []
  })
  export class PromesasComponent implements OnInit {

    constructor() {
      this.retornarPromesa()
        .then(mensaje => { // llama el then de la promesa
        console.log('Contador es igual a 3', mensaje);
      })
      .catch(error => console.log(error));

    }

    ngOnInit() {
    }

    // metodo que contiene una promesa (devuel una promesa de tipo boolean)
    retornarPromesa() : Promise<boolean>{

      return new Promise((resolve, reject) => { // inicializacion de la promesa
        let contador = 0;

          let intervalo = setInterval(() => {
            contador += 1;
            console.log(contador);

            if(contador === 3){
                resolve(true);
                // reject('Simplemente un error');
                clearInterval(intervalo); // metodo clearInterval para detener un setInterval
            }

          }, 1000 );

      });
    };

  }
