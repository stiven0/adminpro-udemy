
  import { Routes, RouterModule } from '@angular/router';

  import { PagesComponent } from './pages.component';
  import { DashboardComponent } from './dashboard/dashboard.component';
  import { Graficas1Component } from './graficas1/graficas1.component';
  import { ProgressComponent } from './progress/progress.component';

  const pagesRoutes : Routes = [

    // rutas hijas de PagesComponent
    { path: '', component: PagesComponent,

          children : [
            { path: 'dashboard', component : DashboardComponent },
            { path: 'progress', component : ProgressComponent },
            { path: 'graficas1', component : Graficas1Component },
            { path: '', redirectTo : '/dashboard', pathMatch : 'full' }, // ruta vacia redirecionar el dashboard
            ]
    }

  ];

  export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
