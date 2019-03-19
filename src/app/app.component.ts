  import { Component } from '@angular/core';

  // en el archivo service index estaran todos los servicios que tengamos de nuestra aplicacion
  import { SettingsService } from './services/service.index';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent {
    title = 'adminpro';

    constructor(public _settingsServicio : SettingsService ){
    }
  }
