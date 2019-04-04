  import { Injectable } from '@angular/core';
  import { HttpHeaders, HttpClient } from '@angular/common/http';
  import { map } from 'rxjs/operators';
  import { URL_SERVICE } from '../../config/config';
  import { UsuarioService } from '../usuario/usuario.service';
  import { Hospital } from '../../models/hospital.model';

  @Injectable({
    providedIn: 'root'
  })
  export class HospitalService {
    public url : string;
    public tokenUser : string;

    constructor(private http : HttpClient, private _usuarioServicios : UsuarioService) {
      this.url = URL_SERVICE;
      this.tokenUser = this._usuarioServicios.token;
    }

    // retornar todos los hospitales
    getHospitales(desde? : number){
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.get(this.url + `hospital/?desde=${ desde }`, { headers });
    };

    // retornar un hospital con base en su id
    getHospitalId(id : string){
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.get(this.url + `hospital/`+ id, { headers })
                      .pipe(map(response => response['hospital']));
    };

    // metodo para borrar un hospital con base en su id
    deleteHospital(id : string){
      let headers = new HttpHeaders().set('token', this.tokenUser)
                                     .set('Content-Type', 'application/json');
      return this.http.delete(this.url + `hospital/${ id }`, { headers });
    };

    // metodo para crear un hospital en la base de datos
    saveHospital(nombre : string){
      let headers = new HttpHeaders().set('token', this.tokenUser)
                                     .set('Content-Type', 'application/json');
      return this.http.post(this.url + 'hospital', {nombre}, { headers });
    };

    // metodo para buscar hospital por un termino
    getHospitalPorTermino(termino : string){
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.get(this.url + `busqueda/coleccion/hospitales/${ termino }`, { headers })
                      .pipe(map(response => response['hospitales']));
    };

    // metodo para actualizar un hospital
    putHospital(hospital : Hospital){
      let headers = new HttpHeaders().set('token', this.tokenUser);
      return this.http.put(this.url + `hospital/${ hospital._id }`, hospital, { headers });
    };



  }
