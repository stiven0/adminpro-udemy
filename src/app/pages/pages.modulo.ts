  // modulo personalizado para los componentes de pages

  import { NgModule } from '@angular/core';

  import { FormsModule } from '@angular/forms';

  // ng2-charts
  import { ChartsModule } from 'ng2-charts';

  // modulo shared
  import { SharedModule } from '../shared/shared.module';

  // rutas de PagesComponent
  import { PAGES_ROUTES } from './pages.routes';

  import { PagesComponent } from './pages.component';

  import { DashboardComponent } from './dashboard/dashboard.component';
  import { ProgressComponent } from './progress/progress.component';
  import { Graficas1Component } from './graficas1/graficas1.component';
  import { IncrementadorComponent } from '../componentes/incrementador/incrementador.component';
  import { GraficoDonaComponent } from '../componentes/grafico-dona/grafico-dona.component';
  import { AccountSettingsComponent } from './account-settings/account-settings.component';
  import { PromesasComponent } from './promesas/promesas.component';
  import { RxjsComponent } from './rxjs/rxjs.component';

  @NgModule({
    declarations : [
      PagesComponent,
      DashboardComponent,
      ProgressComponent,
      Graficas1Component,
      IncrementadorComponent,
      GraficoDonaComponent,
      AccountSettingsComponent,
      PromesasComponent,
      RxjsComponent
    ],
    // modulos requeridos para que funcione los elementos de este modulo
    imports : [
      SharedModule,
      PAGES_ROUTES,
      FormsModule,
      ChartsModule
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
