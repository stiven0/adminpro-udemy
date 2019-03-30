  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  // import { HttpClientModule } from '@angular/common/http';

  import { AppComponent } from './app.component';
  import { LoginComponent } from './login/login.component';
  import { RegisterComponent } from './login/register.component';

  // modulos personalizados
  import { PagesModule } from './pages/pages.modulo';
  import { SharedModule } from './shared/shared.module';

  // rutas
  import { APP_ROUTES } from './app.routes';

  // servicios modulo
  import { ServiceModule } from './services/service.module';

  @NgModule({
    declarations: [
      AppComponent,
      LoginComponent,
      RegisterComponent
    ],
    imports: [
      BrowserModule,
      PagesModule,
      SharedModule,
      APP_ROUTES,
      FormsModule,
      ReactiveFormsModule,
      // HttpClientModule,
      ServiceModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
