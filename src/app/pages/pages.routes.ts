
  import { Routes, RouterModule } from '@angular/router';

  import { PagesComponent } from './pages.component';
  import { DashboardComponent } from './dashboard/dashboard.component';
  import { Graficas1Component } from './graficas1/graficas1.component';
  import { ProgressComponent } from './progress/progress.component';
  import { AccountSettingsComponent } from './account-settings/account-settings.component';
  import { PromesasComponent } from './promesas/promesas.component';
  import { RxjsComponent } from './rxjs/rxjs.component';

  const pagesRoutes : Routes = [

    // rutas hijas de PagesComponent
    { path: '', component: PagesComponent,

          children : [
            { path: 'dashboard', component : DashboardComponent, data : {titulo : 'Dashboard'} },
            { path: 'progress', component : ProgressComponent, data : {titulo : 'Progress'} },
            { path: 'graficas1', component : Graficas1Component, data : {titulo : 'Graficas'} },
            { path: 'account-settings', component : AccountSettingsComponent, data : {titulo : 'Ajustes del tema'} },
            { path: 'promesas', component : PromesasComponent, data : {titulo : 'Promsesas'} },
            { path: 'rxjs', component: RxjsComponent, data : {titulo : 'Rxjs'} },
            { path: '', redirectTo : '/dashboard', pathMatch : 'full' }, // ruta vacia redirecionar el dashboard
            ]
    }

  ];

  export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
