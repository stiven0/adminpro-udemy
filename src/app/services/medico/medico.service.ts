  import { Injectable } from '@angular/core';
  import { Medico } from '../../models/medico.model';
  import { URL_SERVICE } from '../../config/config';
  import { HttpHeaders, HttpClient } from '@angular/common/http';
  import { UsuarioService } from '../../services/usuario/usuario.service';
  import { map } from 'rxjs/operators';

  @Injectable({
    providedIn: 'root'
  })
  export class MedicoService {
    public url : string;
    public tokenUser : string;
    public totalMedicos : number = 0;

    constructor(private http : HttpClient, private _usuarioServicio : UsuarioService) {
       this.url = URL_SERVICE;
       this.tokenUser = this._usuarioServicio.token;
    }

    getMedicos(desde? : number){
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.get(this.url + `medico/?desde=${ desde }`, { headers })
                      .pipe(map((response:any) => {

                        this.totalMedicos = response.total;
                        return response.medicos
                      }));
    };

    // buscar por coleccion de medicos
    buscarMedicos(termino : string){
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.get(this.url + 'busqueda/coleccion/medicos/' + termino, { headers })
                      .pipe(map(response => response['medicos']));
    };

    // borrar un medico
    delteMedico(id : string){
      let headers = new HttpHeaders().set('token', this.tokenUser)
                                    .set('Content-Type', 'application/json');
      return this.http.delete(this.url + `medico/${id }`, { headers })
                      .pipe(map(response => {
                        swal('Medico borrado', 'Medico eliminado correctamente', 'success');
                        return true;
                      }));
    };

    // guardar un medico en la DB
    saveMedico(medico : Medico){
      let headers = new HttpHeaders().set('token', this.tokenUser)
                                     .set('Content-Type', 'application/json');

     // actualizar medico
     if(medico._id){
          return this.http.put(this.url + `medico/${ medico._id }`, medico, { headers })
                          .pipe(map(response => {
                            swal('Medico actualizado', medico.nombre, 'success');
                            return response['Medico'];
                          }));

     } else {
      // crear medico
        return this.http.post(this.url + 'medico', medico, { headers })
        .pipe(map(response => {
          swal('Medico creado', medico.nombre, 'success');
          return response['medico'];
        }));
     }

    };

    // retornar medico por id
    getMedicoId(id : string){
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.get(this.url + `medico/${ id }`, { headers })
                      .pipe(map(response => response['medico']));
    };




  }
