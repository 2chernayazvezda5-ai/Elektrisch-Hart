import { Component, AfterViewInit, DestroyRef, OnDestroy, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';
import * as L from 'leaflet';
import { EstabelecimentoApi } from '../services/estabelecimento-api';
import { MapaBusca } from '../services/mapa-busca';
import { EstabelecimentoProximo } from '../models/estabelecimento.model';

@Component({
  selector: 'app-mapa',
  standalone: true,
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements AfterViewInit, OnDestroy {

  private readonly api = inject(EstabelecimentoApi);
  private readonly busca = inject(MapaBusca);
  private readonly destroyRef = inject(DestroyRef);

  private map!: L.Map;

  // Todos os marcadores de resultado ficam neste grupo: limpar a busca anterior
  // é uma chamada só (clearLayers), sem precisar guardar uma lista na mão.
  private camadaResultados = L.layerGroup();
  private circuloBusca: L.Circle | null = null;
  private marcadorSelecionado: L.Marker | null = null;
  private buscaEmAndamento?: Subscription;

  // Centro da busca: a localização do usuário ou o último ponto clicado (o clique vence)
  private origem: L.LatLng | null = null;

  ngAfterViewInit(): void {
    this.inicializarMapa();
    this.obterLocalizacaoUsuario();

    // Fica "escutando" o botão de buscar do painel lateral
    this.busca.buscaSolicitada$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(raioKm => this.buscarProximos(raioKm));
  }

  ngOnDestroy(): void {
    this.buscaEmAndamento?.unsubscribe();
    this.map?.remove(); // libera o Leaflet (listeners, tiles) ao sair da tela
  }

  private inicializarMapa(): void {
    this.map = L.map('mapa').setView([-22.8219, -47.2669], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(this.map);

    this.camadaResultados.addTo(this.map);

    this.map.on('click', (evento: L.LeafletMouseEvent) => {
      this.selecionarPontoNoMapa(evento.latlng.lat, evento.latlng.lng);
    });
  }

  private obterLocalizacaoUsuario(): void {
    if (!navigator.geolocation) {
      this.busca.status.set('Geolocalização não suportada. Clique no mapa para escolher o ponto de busca.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (posicao) => {
        const lat = posicao.coords.latitude;
        const lon = posicao.coords.longitude;
        this.origem = L.latLng(lat, lon);
        this.map.setView([lat, lon], 14);

        L.marker([lat, lon])
          .addTo(this.map)
          .bindPopup('Você está aqui')
          .openPopup();
      },
      () => {
        this.busca.status.set('Localização não permitida. Clique no mapa para escolher o ponto de busca.');
      }
    );
  }

  /** Marca o ponto clicado e passa a usá-lo como centro da busca */
  private selecionarPontoNoMapa(lat: number, lon: number): void {
    this.origem = L.latLng(lat, lon);

    if (this.marcadorSelecionado) {
      this.marcadorSelecionado.setLatLng([lat, lon]);
    } else {
      const iconeSelecao = L.divIcon({
        className: 'marcador-selecionado',
        iconSize: [16, 16]
      });
      this.marcadorSelecionado = L.marker([lat, lon], { icon: iconeSelecao }).addTo(this.map);
    }
  }

  private buscarProximos(raioKm: number): void {
    // Sem localização e sem clique, usa o centro do que está visível no mapa
    const centro = this.origem ?? this.map.getCenter();

    this.busca.buscando.set(true);
    this.busca.status.set('');

    // Se o usuário clicar em buscar de novo, cancela a requisição anterior
    this.buscaEmAndamento?.unsubscribe();
    this.buscaEmAndamento = this.api.buscarProximos(centro.lat, centro.lng, raioKm).subscribe({
      next: (resultados) => {
        this.desenharResultados(resultados);
        this.desenharCirculo(centro, raioKm);
        this.busca.status.set(
          resultados.length === 0
            ? `Nenhum estabelecimento em até ${raioKm} km.`
            : `${resultados.length} estabelecimento(s) em até ${raioKm} km.`
        );
        this.busca.buscando.set(false);
      },
      error: () => {
        this.busca.status.set('Não foi possível buscar carregadores. Tente novamente.');
        this.busca.buscando.set(false);
      }
    });
  }

  private desenharResultados(lista: EstabelecimentoProximo[]): void {
    this.camadaResultados.clearLayers();

    lista.forEach(e => {
      L.marker([e.latitude, e.longitude])
        .bindPopup(this.montarPopup(e))
        .addTo(this.camadaResultados);
    });
  }

  /** Círculo mostrando a área pesquisada; o mapa dá zoom para enquadrá-lo */
  private desenharCirculo(centro: L.LatLng, raioKm: number): void {
    this.circuloBusca?.remove();
    this.circuloBusca = L.circle(centro, { radius: raioKm * 1000, weight: 1 }).addTo(this.map);
    this.map.fitBounds(this.circuloBusca.getBounds());
  }

  private montarPopup(e: EstabelecimentoProximo): string {
    const pontos = e.pontosRecarga.map(p => {
      const preco = p.gratuito
        ? 'Gratuito'
        : p.precoPorKwh != null
          ? `R$ ${p.precoPorKwh.toFixed(2).replace('.', ',')}/kWh`
          : 'Preço não informado';
      return `<li>${p.quantidade}× ${this.esc(p.potencia)} · ${this.esc(p.tipoConector)} · ${preco}</li>`;
    }).join('');

    return `
      <strong>${this.esc(e.nome)}</strong><br>
      ${this.esc(e.categoria)} · ${e.distanciaKm} km<br>
      Horário: ${this.esc(e.horarioFuncionamento)}
      <ul style="margin:6px 0 0;padding-left:18px">${pontos}</ul>
    `;
  }

  /** Os textos vêm de formulários: sem isso, um "<" no nome quebraria o popup */
  private esc(texto: string | null | undefined): string {
    const trocas: Record<string, string> = {
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    };
    return (texto ?? '').replace(/[&<>"']/g, c => trocas[c]);
  }
}