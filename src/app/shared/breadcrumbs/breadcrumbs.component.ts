  import { Component, OnInit } from '@angular/core';
  import { Router, ActivationEnd  } from '@angular/router';
  import { filter, map, retry } from 'rxjs/operators';
  import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

  @Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styles: []
  })
  export class BreadcrumbsComponent implements OnInit {
    public titulo : string;

    constructor(private router : Router, private title : Title, private meta : Meta) {

      this.getDataRoute().subscribe(data => {
        this.titulo = data.titulo;
        this.title.setTitle(this.titulo);

        // creacion de un meta tag
        const metaTag : MetaDefinition = {
          name : 'description',
          content : this.titulo
        };

        // actualizamos el metaTag
        this.meta.updateTag(metaTag);


      });
    }

    ngOnInit() {
    }

    // funcion para encadenar operadores rxjs
    getDataRoute(){
      return this.router.events.pipe(
        filter( evento => evento instanceof ActivationEnd ),
        filter( (evento : ActivationEnd) => evento.snapshot.firstChild === null ),
        map( (evento : ActivationEnd) => evento.snapshot.data )
      )
    };

  }
