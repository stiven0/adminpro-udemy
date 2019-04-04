  import { Component, OnInit } from '@angular/core';
  import { MedicoService } from '../../services/service.index';
  import { Medico } from '../../models/medico.model';

  @Component({
    selector: 'app-medicos',
    templateUrl: './medicos.component.html',
    styles: []
  })
  export class MedicosComponent implements OnInit {
    public medicos : Medico[] = [];
    public cero_resultados : boolean = false;
    public cargando : boolean = false;
    public desde : number = 0;

    constructor(private _medicoServicio : MedicoService ) {
    }

    ngOnInit() {
      this.obtenerMedicos();
    }

    obtenerMedicos(){
      this.cargando = true;
      this._medicoServicio.getMedicos(this.desde).subscribe(
        response => {
          this.cargando = false;
          this.medicos = response;
        },
        error => {
          this.cargando = false;
          console.log(error);
        });
    };

    // buscar medicos por un termino
    buscarMedico( valor : string){
      if(valor.length <= 0){
          this.obtenerMedicos();
          return;
      }

      this._medicoServicio.buscarMedicos(valor).subscribe(
        response => {
          if(response.length === 0){
              this.cero_resultados = true;
              return;
          }
          this.cero_resultados = false;
          this.medicos = response;

        },
        error => {
          this.cero_resultados = false;
          console.log(error);
        });
    };

    borrarMedico(medico : Medico){
      this._medicoServicio.delteMedico(medico._id).subscribe(
        response => {
          if(response === true){
            this.obtenerMedicos();
          }
        },
        error => {
          console.log(error);
        });
    };

    cambiarDesde(valor : number){
      let desde = this.desde + valor;

      // comprobar si desde es mayor al numero total de registros en la DB
      if(desde >= this._medicoServicio.totalMedicos){
          return;
      }
      // si desde es menor que cero
      if(desde < 0){
          return;
      }

      // le adjucamos el valor this.desde mas el valor que recibimos
      this.desde += valor;
      this.obtenerMedicos();
    }

  }
