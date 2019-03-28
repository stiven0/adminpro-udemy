  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { HttpClientModule } from '@angular/common/http';

  import { SettingsService, SharedService, SidebarService, SubirArchivoService, LoginGuardGuard, UsuarioService } from './service.index';


  @NgModule({
    declarations: [
    ],
    providers : [
      SettingsService,
      SharedService,
      SidebarService,
      UsuarioService,
      LoginGuardGuard,
      SubirArchivoService
    ],
    imports: [
      CommonModule,
      HttpClientModule
    ],

  })
  export class ServiceModule { }
