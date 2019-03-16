  // modulo personalizado para los componentes de pages

  import { NgModule } from '@angular/core';

  // modulo shared
  import { SharedModule } from '../shared/shared.module';

  // rutas de PagesComponent
  import { PAGES_ROUTES } from './pages.routes';

  import { PagesComponent } from './pages.component';

  import { DashboardComponent } from './dashboard/dashboard.component';
  import { ProgressComponent } from './progress/progress.component';
  import { Graficas1Component } from './graficas1/graficas1.component';

  @NgModule({
    declarations : [
      PagesComponent,
      DashboardComponent,
      ProgressComponent,
      Graficas1Component
    ],
    // modulos requeridos para que funcione los elementos de este modulo
    imports : [
      SharedModule,
      PAGES_ROUTES
    ],
    // elementos que seran utilizados en otros modulos o lugares
    exports : [
      PagesComponent,
      DashboardComponent,
      ProgressComponent,
      Graficas1Component
    ]
  })

  export class PagesModule { } // exportamos el modulo
