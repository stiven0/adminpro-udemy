  import { Component, OnInit } from '@angular/core';
  import { Medico } from '../../models/medico.model';
  import { Hospital } from '../../models/hospital.model';
  import { MedicoService } from '../../services/medico/medico.service';
  import { HospitalService } from '../../services/hospital/hospital.service';
  import { NgForm } from '@angular/forms';
  import { Router, ActivatedRoute } from '@angular/router';
  import { ModalUploadService } from '../../componentes/modal-upload/modal-upload.service';

  @Component({
    selector: 'app-medico',
    templateUrl: './medico.component.html',
    styles: []
  })
  export class MedicoComponent implements OnInit {
    public hospitales :  Hospital[] = [];
    public medico : Medico;
    public hospital : Hospital;

    constructor(private _medicoServicio : MedicoService, private _hospitalServicio : HospitalService,
                public router : Router, private activated : ActivatedRoute, private _modalServicio : ModalUploadService) {
      this.medico = new Medico('', '', '', '', '');
      this.hospital = new Hospital('');

    }

    ngOnInit() {
      this._hospitalServicio.getHospitales().subscribe(
        (response:any) => {
          this.hospitales = response.Hospital;
      });

      this._modalServicio.notificacion.subscribe(response => {
        if(response){
          this.medico.img = response.medico.img;
        }
      });

      // comprobar si el id viene por el url
      this.activated.params.subscribe(params => {
        if(params.id.length === 24){
            this.retornarMedicoPorId(params.id)
        } else {
            return;
        }
      });
    }

    // submit del formulario medico
    guardarMedico(formulario : NgForm){

      // confirmar si el formulario es valido
      if(!formulario.valid){
          return;
      }

      // guardar un medico
      this._medicoServicio.saveMedico(this.medico).subscribe(
        response => {
          this.medico._id = response._id;
          this.router.navigate(['/medico' , this.medico._id]);
      });
    };

    // detectar cambio en el selector y extraer su valor, ademas de llamar el servicio hospital y retornar uno
    cambioHospital(idHospital : string){
      this._hospitalServicio.getHospitalId(idHospital).subscribe(
        response => {
          this.hospital = response;
        },
        error => {
          console.log(error);
        });
    };

    // retornar Medico por id
    retornarMedicoPorId(id : string){
      this._medicoServicio.getMedicoId(id).subscribe(response => {
        this.medico = response;
        this.medico.hospital = response.hospital._id;
        this.cambioHospital(this.medico.hospital);
      });
    };

    cambiarFoto(){
      this._modalServicio.mostrarModal('medicos', this.medico._id);
    };

  }
