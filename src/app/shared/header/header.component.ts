  import { Component, OnInit } from '@angular/core';
  import { UsuarioService } from '../../services/service.index';
  import { Usuario } from '../../models/usuario.model';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: []
  })
  export class HeaderComponent implements OnInit {
    public usuario : Usuario;

    constructor(private _usuarioServicio : UsuarioService, private router : Router) {
      this.usuario = this._usuarioServicio.usuario;
    }

    ngOnInit() {
    }

    buscar(termino : string){
      if(termino.length <= 0){
          return;
      }

      this.router.navigate(['/busqueda', termino]);
    }



  }
