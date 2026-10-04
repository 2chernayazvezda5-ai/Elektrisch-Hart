import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

// Quando a integração com os carregadores voltar, reativar estes imports:
// import { CarregadorService } from '../../services/carregador.service';
// import { Carregador, CarregadorProximo } from '../../models/carregador.model';

/**
 * Componente responsável apenas pela navegação do mapa por enquanto:
 * - Renderizar o mapa Leaflet/OpenStreetMap
 * - Centralizar na localização do usuário (geolocalização)
 * - Capturar cliques no mapa para marcar um ponto
 *
 * A busca/exibição de carregadores foi deixada comentada mais abaixo,
 * pronta para ser reativada quando o backend for integrado.
 *
 * O futuro menu lateral vai se comunicar com este componente por um
 * service compartilhado (ainda não criado). Quando ele existir,
 * latitudeSelecionada/longitudeSelecionada devem passar a morar nesse
 * service em vez de aqui , hoje ficam neste componente só para o mapa
 * continuar funcionando sozinho enquanto o menu não existe.
 */
@Component({
  selector: 'app-mapa',
  standalone: true,
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements AfterViewInit {

  private map!: L.Map;

  // Marcadores dos carregadores vindos da API (usado só quando a
  // integração com o backend estiver ativa novamente)
  // private marcadoresCarregadores: L.Marker[] = [];

  // Marcador temporário do ponto clicado pelo usuário no mapa
  private marcadorSelecionado: L.Marker | null = null;

  // Coordenadas do ponto que o usuário clicou no mapa.
  // TODO: mover para o service compartilhado quando o menu lateral existir.
  latitudeSelecionada: number | null = null;
  longitudeSelecionada: number | null = null;

  mensagemStatus = '';

  // constructor(private carregadorService: CarregadorService) {}

  ngAfterViewInit(): void {
    this.inicializarMapa();
    this.obterLocalizacaoUsuario();
    // this.carregarTodosCarregadores();
  }

  /**
   * Cria a instância do mapa Leaflet e define a camada de tiles do
   * OpenStreetMap.
   */
  private inicializarMapa(): void {
    this.map = L.map('mapa').setView([-22.8219, -47.2669], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(this.map);

    this.map.on('click', (evento: L.LeafletMouseEvent) => {
      this.selecionarPontoNoMapa(evento.latlng.lat, evento.latlng.lng);
    });
  }

  /** Tenta centralizar o mapa na localização do usuário via Geolocation API */
  private obterLocalizacaoUsuario(): void {
    if (!navigator.geolocation) {
      this.mensagemStatus = 'Geolocalização não suportada.';
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (posicao) => {
        const lat = posicao.coords.latitude;
        const lon = posicao.coords.longitude;
        this.map.setView([lat, lon], 14);

        L.marker([lat, lon])
          .addTo(this.map)
          .bindPopup('Você está aqui')
          .openPopup();
      },
      () => {
        this.mensagemStatus = 'Permissão de localização negada.';
      }
    );
  }

  /** Desenha/move o marcador temporário de seleção e guarda as coordenadas */
  private selecionarPontoNoMapa(lat: number, lon: number): void {
    this.latitudeSelecionada = lat;
    this.longitudeSelecionada = lon;

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

  // -----------------------------------------------------------------
  // Integração com os carregadores (backend) — desativada por enquanto.
  // Reative os métodos abaixo, os imports no topo e a chamada a
  // carregarTodosCarregadores() no ngAfterViewInit quando o backend
  // estiver pronto para ser integrado.
  // -----------------------------------------------------------------

  // carregarTodosCarregadores(): void {
  //   this.carregadorService.listarTodos().subscribe({
  //     next: (carregadores) => this.desenharMarcadoresCarregadores(carregadores),
  //     error: () => this.mensagemStatus = 'Erro ao carregar carregadores da API.'
  //   });
  // }

  // private desenharMarcadoresCarregadores(carregadores: (Carregador | CarregadorProximo)[]): void {
  //   this.marcadoresCarregadores.forEach(marker => this.map.removeLayer(marker));
  //   this.marcadoresCarregadores = [];
  //
  //   carregadores.forEach(c => {
  //     const marker = L.marker([c.latitude, c.longitude]).addTo(this.map);
  //
  //     const distanciaHtml = 'distanciaKm' in c
  //       ? `<br>Distância: ${(c as CarregadorProximo).distanciaKm} km`
  //       : '';
  //
  //     marker.bindPopup(`
  //       <strong>${c.nome}</strong><br>
  //       Potência: ${c.potenciaKw} kW<br>
  //       Conector: ${this.formatarConector(c.tipoConector)}
  //       ${distanciaHtml}
  //     `);
  //
  //     this.marcadoresCarregadores.push(marker);
  //   });
  // }

  // private formatarConector(tipo: string): string {
  //   const nomes: Record<string, string> = {
  //     TIPO_2: 'Tipo 2',
  //     CCS: 'CCS',
  //     CHADEMO: 'CHAdeMO'
  //   };
  //   return nomes[tipo] ?? tipo;
  // }

  // buscarCarregadoresProximos(raioKm: number): void {
  //   if (this.latitudeSelecionada === null || this.longitudeSelecionada === null) {
  //     this.mensagemStatus = 'Clique em um ponto do mapa antes de buscar.';
  //     return;
  //   }
  //
  //   this.carregadorService.buscarProximos(
  //     this.latitudeSelecionada,
  //     this.longitudeSelecionada,
  //     raioKm
  //   ).subscribe({
  //     next: (proximos: CarregadorProximo[]) => {
  //       this.desenharMarcadoresCarregadores(proximos);
  //       this.mensagemStatus = `${proximos.length} carregador(es) encontrado(s) em um raio de ${raioKm} km.`;
  //     },
  //     error: () => this.mensagemStatus = 'Erro ao buscar carregadores próximos.'
  //   });
  // }

  // aoCadastrarCarregador(novoCarregador: Carregador): void {
  //   const marker = L.marker([novoCarregador.latitude, novoCarregador.longitude]).addTo(this.map);
  //   marker.bindPopup(`
  //     <strong>${novoCarregador.nome}</strong><br>
  //     Potência: ${novoCarregador.potenciaKw} kW<br>
  //     Conector: ${this.formatarConector(novoCarregador.tipoConector)}
  //   `).openPopup();
  //
  //   this.marcadoresCarregadores.push(marker);
  //   this.mensagemStatus = `Carregador "${novoCarregador.nome}" cadastrado com sucesso!`;
  // }
}