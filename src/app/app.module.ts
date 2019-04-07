  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  // import { HttpClientModule } from '@angular/common/http';

  import { AppComponent } from './app.component';
  import { LoginComponent } from './login/login.component';
  import { RegisterComponent } from './login/register.component';

  // modulos personalizados
  import { SharedModule } from './shared/shared.module';

  // rutas
  import { APP_ROUTES } from './app.routes';

  // servicios modulo
  import { ServiceModule } from './services/service.module';

  import { PagesComponent } from './pages/pages.component';

  @NgModule({
    declarations: [
      AppComponent,
      LoginComponent,
      RegisterComponent,
      PagesComponent
    ],
    imports: [
      BrowserModule,
      SharedModule,
      APP_ROUTES,
      FormsModule,
      ReactiveFormsModule,
      // HttpClientModule,
      ServiceModule,
      SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
