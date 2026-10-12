import { Component } from '@angular/core';
import { MapaComponent } from './mapa/mapa.component';

/** só esta hospedando o mapa**/

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapaComponent],
  template: `<app-mapa></app-mapa>`
})
export class AppComponent {}
