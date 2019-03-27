  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { HttpClientModule } from '@angular/common/http';

  import { SettingsService, SharedService, SidebarService } from './service.index';
  import { UsuarioService} from './usuario/usuario.service';
  import { LoginGuardGuard } from './guards/login-guard.guard';


  @NgModule({
    declarations: [
    ],
    providers : [
      SettingsService,
      SharedService,
      SidebarService,
      UsuarioService,
      LoginGuardGuard
    ],
    imports: [
      CommonModule,
      HttpClientModule
    ],

  })
  export class ServiceModule { }
