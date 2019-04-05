  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { HttpClientModule } from '@angular/common/http';
  import { ModalUploadService } from '../componentes/modal-upload/modal-upload.service';

  import { SettingsService, SharedService, SidebarService, SubirArchivoService,
           LoginGuardGuard, UsuarioService, HospitalService, MedicoService, AdminGuard } from './service.index';


  @NgModule({
    declarations: [
    ],
    providers : [
      SettingsService,
      SharedService,
      SidebarService,
      UsuarioService,
      LoginGuardGuard,
      AdminGuard,
      SubirArchivoService,
      ModalUploadService,
      HospitalService,
      MedicoService
    ],
    imports: [
      CommonModule,
      HttpClientModule
    ],

  })
  export class ServiceModule { }
