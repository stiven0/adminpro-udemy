  import { Component, OnInit, OnDestroy } from '@angular/core';
  import { Observable, Subscriber, Subscription } from 'rxjs';
  import { retry, map, filter } from 'rxjs/operators';

  @Component({
    selector: 'app-rxjs',
    templateUrl: './rxjs.component.html',
    styles: []
  })
  export class RxjsComponent implements OnInit, OnDestroy {
    public subscripcion : Subscription;

    constructor() {
        // un Observable tiene 3 callbacks, response o data, el error, y la finalizacion del observer
        // operators retry() sirve para reintentar la ejecucion de un Observable, retry(2) - el numero quiere decir las veces
                                                                                            //  que intentara ejecutar el code nuevamente
        this.subscripcion =  this.regresarObservable().subscribe(
          numero => console.log(numero),
          error => console.log(error),
          () => console.log('El observador termino')
        );

    }

    ngOnInit() {
    }

    // ciclo o hooks de componentes, sirve para identificar cuando abandonemos esta pagina y ejecutara algo
    ngOnDestroy(){
      console.log('La pagina se va a cerrar');
      this.subscripcion.unsubscribe(); // eliminar subscripcion del Observable apenas cambiemos de ruta
    }

    regresarObservable() : Observable<any>{
      // creacion de un Observable manualmente
        return new Observable( (observer: Subscriber<any>) => {
          let contador = 0;

          let intervalo = setInterval(() => {
            contador += 1;

            const salida = {
              valor : contador
            };

              observer.next(salida); // se ejcute el observer

              // if(contador === 3){
              //     clearInterval(intervalo);
              //     observer.complete(); // el observer finalizo
              // }

              // if(contador === 2){
              //     // clearInterval(intervalo);
              //     observer.error(); // error en el observer
              // }

          }, 1000);

        }).pipe(
            map(response => response.valor), // operators map
            filter( ( valor, index) => {

              if( (valor % 2) === 1 ){
                    return true;
              } else {
                    return false;
              }

            })
          );


    };

  }
