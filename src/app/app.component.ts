import { Component } from '@angular/core';
import { MapaComponent } from './mapa/mapa.component';

/** por enquanto só esta hospedando o mapa , ao integrar com o resto aqui vai ficar tudo para o roteamento*/

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapaComponent],
  template: `<app-mapa></app-mapa>`
})
export class AppComponent {}
