  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';
  import { FormsModule } from '@angular/forms';

  import { AppComponent } from './app.component';
  import { LoginComponent } from './login/login.component';
  import { RegisterComponent } from './login/register.component';
  // import { IncrementadorComponent } from './componentes/incrementador/incrementador.component';

  // modulos personalizados
  import { PagesModule } from './pages/pages.modulo';
  import { SharedModule } from './shared/shared.module';

  // rutas
  import { APP_ROUTES } from './app.routes';

  @NgModule({
    declarations: [
      AppComponent,
      LoginComponent,
      RegisterComponent,
    ],
    imports: [
      BrowserModule,
      PagesModule,
      SharedModule,
      APP_ROUTES,
      FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
