
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
  import { HospitalesComponent } from './hospitales/hospitales.component';
  import { MedicosComponent } from './medicos/medicos.component';
  import { MedicoComponent } from './medicos/medico.component';
  import { BusquedaComponent } from './busqueda/busqueda.component';

  import { LoginGuardGuard } from '../services/guards/login-guard.guard';
  import { AdminGuard } from '../services/guards/admin.guard';
  import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';


  const pagesRoutes : Routes = [

    // rutas hijas de PagesComponent
            { path: 'dashboard', component : DashboardComponent,
              canActivate : [VerificaTokenGuard], // guards para VerificaTokenGuard
              data : {titulo : 'Dashboard'} },
            { path: 'profile', component : ProfileComponent, data : { titulo : 'Perfil de usuario'} },
            { path: 'progress', component : ProgressComponent, data : {titulo : 'Progress'} },
            { path: 'graficas1', component : Graficas1Component, data : {titulo : 'Graficas'} },
            { path: 'account-settings', component : AccountSettingsComponent, data : {titulo : 'Ajustes del tema'} },
            { path: 'promesas', component : PromesasComponent, data : {titulo : 'Promsesas'} },
            { path: 'rxjs', component: RxjsComponent, data : {titulo : 'Rxjs'} },

            // busqueda
            { path: 'busqueda/:termino', component: BusquedaComponent, data : {titulo : 'Buscador'} },

            // Mantenimientos
            { path: 'usuarios', component : UsuariosComponent,
              canActivate : [ AdminGuard ],
              data : { titulo : 'Mantenimiento de usuarios'} },

            { path: 'hospitales', component : HospitalesComponent, data : { titulo : 'Mantenimiento de hospitales' } },
            { path: 'medicos', component : MedicosComponent, data : { titulo : 'Mantenimiento de medicos' } },
            { path: 'medico/:id', component : MedicoComponent, data : { titulo : 'Mantenimiento de medico' } },
            { path: '', redirectTo : '/dashboard', pathMatch : 'full' }, // ruta vacia redirecionar el dashboard

  ];

  export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
