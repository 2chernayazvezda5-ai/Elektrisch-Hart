import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MapaBusca {
  // Comando: o painel pede, o mapa executa
  private readonly pedidos = new Subject<number>();
  readonly buscaSolicitada$ = this.pedidos.asObservable();

  // Estado: o mapa escreve, o painel mostra
  readonly buscando = signal(false);
  readonly status = signal('');

  solicitarBusca(raioKm: number): void {
    this.pedidos.next(raioKm);
  }
}