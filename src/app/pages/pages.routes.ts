
  import { Routes, RouterModule } from '@angular/router';

  import { ProfileComponent } from './profile/profile.component';
  import { PagesComponent } from './pages.component';
  import { DashboardComponent } from './dashboard/dashboard.component';
  import { Graficas1Component } from './graficas1/graficas1.component';
  import { ProgressComponent } from './progress/progress.component';
  import { AccountSettingsComponent } from './account-settings/account-settings.component';
  import { PromesasComponent } from './promesas/promesas.component';
  import { RxjsComponent } from './rxjs/rxjs.component';
  import { UsuariosComponent } from './usuarios/usuarios.component';

  import { LoginGuardGuard } from '../services/guards/login-guard.guard';

  const pagesRoutes : Routes = [

    // rutas hijas de PagesComponent
    { path: '', component: PagesComponent,

          canActivate : [ LoginGuardGuard ], // proteger rutas
          children : [
            { path: 'dashboard', component : DashboardComponent, data : {titulo : 'Dashboard'} },
            { path: 'profile', component : ProfileComponent, data : { titulo : 'Perfil de usuario'} },
            { path: 'progress', component : ProgressComponent, data : {titulo : 'Progress'} },
            { path: 'graficas1', component : Graficas1Component, data : {titulo : 'Graficas'} },
            { path: 'account-settings', component : AccountSettingsComponent, data : {titulo : 'Ajustes del tema'} },
            { path: 'promesas', component : PromesasComponent, data : {titulo : 'Promsesas'} },
            { path: 'rxjs', component: RxjsComponent, data : {titulo : 'Rxjs'} },

            // Mantenimientos
            { path: 'usuarios', component : UsuariosComponent, data : {titulo : 'Mantenimiento de usuarios'} },
            { path: '', redirectTo : '/dashboard', pathMatch : 'full' }, // ruta vacia redirecionar el dashboard
            ]
    }

  ];

  export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
