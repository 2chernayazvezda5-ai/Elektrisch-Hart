import { Component, AfterViewInit, DestroyRef, OnDestroy, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';
import * as L from 'leaflet';
import { EstabelecimentoApi } from '../services/estabelecimento-api';
import { Localizacao, Posicao } from '../services/localizacao';
import { EstabelecimentoProximo } from '../models/estabelecimento.model';
import { MapaBusca, PedidoBusca } from '../services/mapa-busca';

// Onde o mapa sempre começa: Facens, em Sorocaba.
// TODO: troque pelas coordenadas exatas do campus (veja a explicação abaixo do código).
const FACENS: L.LatLngTuple = [-23.4707, -47.4251];
const ZOOM_INICIAL = 15;

@Component({
  selector: 'app-mapa',
  standalone: true,
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements AfterViewInit, OnDestroy {

  private readonly api = inject(EstabelecimentoApi);
  private readonly busca = inject(MapaBusca);
  private readonly localizacao = inject(Localizacao);
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

  // Estrela amarela para o estabelecimento mais próximo (o estilo fica no mapa.component.css)
  private readonly iconeMaisProximo = L.divIcon({
    className: 'marcador-mais-proximo',
    html: '★',
    iconSize: [32, 32]
  });

  ngAfterViewInit(): void {
  this.inicializarMapa();

  // Se o login já pediu a localização, isto não pede de novo (útil para quem abre /mapa direto)
  this.localizacao.solicitar();

  // O BehaviorSubject entrega a posição na hora, se ela já existir, e avisa quando chegar
  this.localizacao.posicao$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(pos => {
      if (pos) {
        this.mostrarPosicaoDoUsuario(pos);
      }
    });

  // Fica "escutando" o botão de buscar do painel lateral
  this.busca.buscaSolicitada$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(pedido => this.buscarProximos(pedido));
}

  ngOnDestroy(): void {
    this.buscaEmAndamento?.unsubscribe();
    this.map?.remove(); // libera o Leaflet (listeners, tiles) ao sair da tela
  }

  private inicializarMapa(): void {
    this.map = L.map('mapa').setView(FACENS, ZOOM_INICIAL);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(this.map);

    this.camadaResultados.addTo(this.map);

    this.map.on('click', (evento: L.LeafletMouseEvent) => {
      this.selecionarPontoNoMapa(evento.latlng.lat, evento.latlng.lng);
    });
  }

  /** Marca onde o usuário está, sem mover o mapa */
  private mostrarPosicaoDoUsuario(pos: Posicao): void {
    const ponto = L.latLng(pos.latitude, pos.longitude);

    // Um clique do usuário no mapa vale mais que a localização automática
    if (!this.marcadorSelecionado) {
      this.origem = ponto;
    }

    // De propósito sem setView() e sem openPopup(): os dois levariam o mapa até o
    // usuário (o popup aberto faz o Leaflet deslocar a tela para mostrá-lo), e o
    // mapa precisa começar sempre na Facens.
    L.marker(ponto).addTo(this.map).bindPopup('Você está aqui');
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

  private buscarProximos(pedido: PedidoBusca): void {
  const { raioKm, conector } = pedido;

  // Sem localização e sem clique, usa o centro do que está visível no mapa
  const centro = this.origem ?? this.map.getCenter();

  this.busca.buscando.set(true);
  this.busca.status.set('');

  // Se o usuário clicar em buscar de novo, cancela a requisição anterior
  this.buscaEmAndamento?.unsubscribe();
  this.buscaEmAndamento = this.api.buscarProximos(centro.lat, centro.lng, raioKm, conector).subscribe({
    next: (resultados) => {
      this.desenharResultados(resultados);
      this.desenharCirculo(centro, raioKm);

      const filtro = conector ? ` com conector ${conector}` : '';
      this.busca.status.set(
        resultados.length === 0
          ? `Nenhum estabelecimento${filtro} em até ${raioKm} km.`
          : `${resultados.length} estabelecimento(s)${filtro} em até ${raioKm} km. O mais próximo está em amarelo.`
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

  // A API devolve a lista ordenada por distância: o primeiro é o mais próximo
  lista.forEach((e, indice) => {
    const maisProximo = indice === 0;

    L.marker(
      [e.latitude, e.longitude],
      maisProximo ? { icon: this.iconeMaisProximo, zIndexOffset: 1000 } : {}
    )
      .bindPopup(this.montarPopup(e, maisProximo))
      .addTo(this.camadaResultados);
  });
}

private montarPopup(e: EstabelecimentoProximo, maisProximo: boolean): string {
  const pontos = e.pontosRecarga.map(p => {
    const preco = p.gratuito
      ? 'Gratuito'
      : p.precoPorKwh != null
        ? `R$ ${p.precoPorKwh.toFixed(2).replace('.', ',')}/kWh`
        : 'Preço não informado';
    return `<li>${p.quantidade}× ${this.esc(p.potencia)} · ${this.esc(p.tipoConector)} · ${preco}</li>`;
  }).join('');

  const destaque = maisProximo ? '<strong>★ Mais próximo</strong><br>' : '';

  return `
    ${destaque}
    <strong>${this.esc(e.nome)}</strong><br>
    ${this.esc(e.categoria)} · ${e.distanciaKm} km<br>
    Horário: ${this.esc(e.horarioFuncionamento)}
    <ul style="margin:6px 0 0;padding-left:18px">${pontos}</ul>
  `;
}

  

  /** Círculo mostrando a área pesquisada, o mapa dá zoom no local */
  private desenharCirculo(centro: L.LatLng, raioKm: number): void {
    this.circuloBusca?.remove();
    this.circuloBusca = L.circle(centro, { radius: raioKm * 1000, weight: 1 }).addTo(this.map);
    this.map.fitBounds(this.circuloBusca.getBounds());
  }


  /** Os textos vêm de formulários então tem que ter isso para não quebrar o popup **/
  private esc(texto: string | null | undefined): string {
    const trocas: Record<string, string> = {
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    };
    return (texto ?? '').replace(/[&<>"']/g, c => trocas[c]);
  }
}