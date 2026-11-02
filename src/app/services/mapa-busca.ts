import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

export interface PedidoBusca {
  raioKm: number;
  conector: string | null; // null = todos os tipos
}

@Injectable({ providedIn: 'root' })
export class MapaBusca {
  // Comando: o painel pede, o mapa executa
  private readonly pedidos = new Subject<PedidoBusca>();
  readonly buscaSolicitada$ = this.pedidos.asObservable();

  // Estado: o mapa escreve, o painel mostra
  readonly buscando = signal(false);
  readonly status = signal('');

  solicitarBusca(raioKm: number, conector: string | null): void {
    this.pedidos.next({ raioKm, conector });
  }
}