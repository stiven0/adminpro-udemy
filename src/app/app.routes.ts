  import { RouterModule, Routes } from '@angular/router';

  import { PagesComponent } from './pages/pages.component';
  import { LoginComponent } from './login/login.component';
  import { RegisterComponent } from './login/register.component';
  import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

  // guard
  import { LoginGuardGuard, VerificaTokenGuard } from './services/service.index';


  const appRoutes : Routes = [
    { path: 'login', component : LoginComponent },
    { path: 'register', component : RegisterComponent },
    {
      // cargamos rutas de PagesComponent
      path: '',
      canActivate : [LoginGuardGuard],
      // canActivateChild : [VerificaTokenGuard],
      component : PagesComponent,
      // cargar modulo de pages - direccion del modulo y nombre del modulo (lazyload)
      loadChildren : './pages/pages.modulo#PagesModule'
    },
    { path: '**', component : NopagefoundComponent } // cualquier otra ruta me mostrara el componente nopagefound
  ];

  export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash:true });
