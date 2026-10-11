import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface NavItem {
  icon: string;
  label: string;
  route?: string;
  danger?: boolean;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

@Component({
  selector: 'app-driver-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './driver-layout.html',
  styleUrl: './driver-layout.scss',
})
export class DriverLayout {
  sections: NavSection[] = [
    {
      items: [{ icon: '🏠', label: 'Home', route: '/driver/home' }],
    },
    {
      title: 'Carregadores',
      items: [
        { icon: '🗺', label: 'Mapa de carregadores', route: '/driver/map' },
        { icon: '🕘', label: 'Histórico de recargas' },
      ],
    },
    {
      title: 'Aluguel',
      items: [
        { icon: '🔑', label: 'Alugar carregador' },
        { icon: '📅', label: 'Meus aluguéis' },
      ],
    },
    {
      title: 'Meu carro',
      items: [
        { icon: '🚗', label: 'Meu Veículo' },
        { icon: '📚', label: 'Comparar veículos' },
      ],
    },
    {
      title: 'Insights',
      items: [
        { icon: '☀', label: 'Energia Solar' },
        { icon: 'ℹ', label: 'Formas e Benefícios sob...' },
        { icon: '⚙', label: 'Sobre o Projeto' },
      ],
    },
    {
      title: 'Preferências',
      items: [
        { icon: '👤', label: 'Minha conta' },
        { icon: '⚙', label: 'Configurações' },
        { icon: '❓', label: 'Ajuda' },
        { icon: '⎋', label: 'Sair', route: '/login', danger: true },
      ],
    },
  ];
}