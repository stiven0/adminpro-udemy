  // modulo personalizado para los componentes de shared

  import { NgModule } from '@angular/core';
  // CommonModule permite utilizar (ngif, ngfor, pipes, directivas, etc..)
  import { CommonModule } from '@angular/common';

  // modulo que permite trabajar con rutas de angular
  import { RouterModule } from '@angular/router';

  // pipe modulo
  import { PipesModule } from '../pipes/pipes.module';

  import { HeaderComponent } from './header/header.component';
  import { SidebarComponent } from './sidebar/sidebar.component';
  import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
  import { NopagefoundComponent } from './nopagefound/nopagefound.component';
  import { ModalUploadComponent } from '../componentes/modal-upload/modal-upload.component';

  @NgModule({
    declarations : [
      HeaderComponent,
      SidebarComponent,
      BreadcrumbsComponent,
      NopagefoundComponent,
      ModalUploadComponent
    ],
    imports : [
      RouterModule,
      CommonModule,
      PipesModule
    ],
    exports : [
      HeaderComponent,
      SidebarComponent,
      BreadcrumbsComponent,
      NopagefoundComponent,
      ModalUploadComponent
    ]
  })

  export class SharedModule { }
