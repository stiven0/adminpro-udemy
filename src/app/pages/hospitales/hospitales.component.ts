  import { Component, OnInit } from '@angular/core';
  import { Hospital } from '../../models/hospital.model';
  import { HospitalService } from '../../services/service.index';
  import { ModalUploadService } from '../../componentes/modal-upload/modal-upload.service';

  declare let swal : any;

  @Component({
    selector: 'app-hospitales',
    templateUrl: './hospitales.component.html',
    styles: []
  })
  export class HospitalesComponent implements OnInit {
    public hospitales : Hospital[] = [];
    public cargando : boolean = false;
    public cero_resultados : boolean = false;
    public totalRegistro : number = 0;
    public desde : number = 0;

    constructor(private _hospitalServicios : HospitalService, private _modalUpload : ModalUploadService) {
    }

    ngOnInit() {
      this.cargaHospitales();

      // subscripcion al evento emitido por el servicio para cargar imagen
      this._modalUpload.notificacion.subscribe(
        response => {
          this.cargaHospitales();
      });
    }

    cargaHospitales(){
      this.cargando = true;
      this._hospitalServicios.getHospitales(this.desde).subscribe(
        (response:any) => {
          this.cargando = false;
          this.hospitales = response.Hospital;
          this.totalRegistro = response.total;
        },
        error => {
          this.cargando = false;
          console.log(error);
        });
    };


    buscarHospital(termino : string){
      if(termino.length <= 0){
          this.cargaHospitales();
          return;
      } else {
        this.cargando = true;
        this._hospitalServicios.getHospitalPorTermino(termino).subscribe(
          (response:any) => {
            this.cargando = false;
            if(response.length === 0){
                this.cero_resultados = true;
                return;
            }
            this.cero_resultados = false;
            this.hospitales = response;
          },
          error => {
            this.cero_resultados = false;
            console.log(error);
          });
        };
      };

      actualizar(nuevoNombre : string, hospital : Hospital){
        hospital.nombre = nuevoNombre
        this._hospitalServicios.putHospital(hospital).subscribe(
          (response:any) => {
            if(response){
              swal('Hospital actualizado', response.Hospital.nombre, 'success');

            }
          },
          error => {
            console.log(error);
          });
      };

      borrarHospital(hospital : Hospital, i : number){
        // mensaje de confirmacion para borar un usuario
        swal({
            title: '¿Esta seguro?',
            text: 'Esta a punto de borrar al hospital ' + hospital.nombre,
            icon: 'warning',
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
          })
          .then( borrar => {
            if(borrar){
              this._hospitalServicios.deleteHospital(hospital._id).subscribe(
                response => {
                  if(response){
                    swal('Exito', 'El hospital se ha borrado correctamente', 'success');
                    this.cargaHospitales();
                  }
                },
                error => {
                  console.log(error);
                });
            }
          });
      };

      // funcion para cambiar o paginar los usuarios
      cambiarDesde(valor : number){

        let desde = this.desde + valor;

        // comprobar si desde es mayor al numero total de registros en la DB
        if(desde >= this.totalRegistro){
            return;
        }
        // si desde es menor que cero
        if(desde < 0){
            return;
        }

        // le adjucamos el valor this.desde mas el valor que recibimos
        this.desde += valor;
        this.cargaHospitales();
      };

      crearHospital(){
        swal("Escribe el nombre del nuevo hospital:", {
          content: "input",
          buttons: 'Aceptar',
        })
        .then((nombre : string) => {
            if(nombre.length > 0){
                this._hospitalServicios.saveHospital(nombre).subscribe(
                  (response:any) => {
                    if(response.ok === true){
                        this.cargaHospitales();
                    }
                  },
                  error => {
                    console.log(error);
                  });
            } else {
                return;
            }
        });
      };

      // llamamos al servicio para mostrar el modal
      mostrarM( id : string){
        this._modalUpload.mostrarModal('hospitales', id);
      };


    }
