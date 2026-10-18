import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MapaBusca } from './mapa-busca';

export interface Posicao {
  latitude: number;
  longitude: number;
}

@Injectable({ providedIn: 'root' })
export class Localizacao {
  private readonly busca = inject(MapaBusca);

  // BehaviorSubject guarda o último valor: quem se inscrever depois (o mapa, por exemplo)
  // recebe a posição na hora, sem precisar pedir ao navegador de novo.
  private readonly posicao = new BehaviorSubject<Posicao | null>(null);
  readonly posicao$ = this.posicao.asObservable();

  private solicitada = false;

  /** Pede a localização ao navegador (aparece a janelinha de permissão). Só pede uma vez. */
  solicitar(): void {
    if (this.solicitada) {
      return;
    }
    this.solicitada = true;

    if (!navigator.geolocation) {
      this.busca.status.set('Geolocalização não suportada. Clique no mapa para escolher o ponto de busca.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (p) => this.posicao.next({ latitude: p.coords.latitude, longitude: p.coords.longitude }),
      (erro) =>
        this.busca.status.set(
          erro.code === erro.PERMISSION_DENIED
            ? 'Localização não permitida. Clique no mapa para escolher o ponto de busca.'
            : 'Não foi possível obter sua localização. Clique no mapa para escolher o ponto de busca.',
        ),
      { timeout: 10000 },
    );
  }
}