  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
  import { HttpHeaders, HttpClient } from '@angular/common/http';
  import { URL_SERVICE } from '../../config/config';
  import { Usuario } from '../../models/usuario.model';
  import { Hospital } from '../../models/hospital.model';
  import { Medico } from '../../models/medico.model';

  @Component({
    selector: 'app-busqueda',
    templateUrl: './busqueda.component.html',
    styles: []
  })
  export class BusquedaComponent implements OnInit {
    public url : string = URL_SERVICE;
    public medicos : Medico[] = [];
    public usuarios : Usuario[] = [];
    public hospitales : Hospital[] = [];

    constructor(private activated : ActivatedRoute, private http : HttpClient) {

      this.activated.params.subscribe(params => {
        let termino = params.termino;
        this.buscar(termino);
      });

    }

    ngOnInit() {
    }

    // servicio para traer una busqueda global
    buscar(termino : string){
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.get(this.url + `busqueda/todo/${ termino }`, { headers })
                      .subscribe(response => {
                        this.usuarios = response['usuarios'];
                        this.medicos = response['medicos'];
                        this.hospitales = response['hospitales'];
                      });
    };


  }
