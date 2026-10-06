import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface NavItem {
  icon: string;
  label: string;
  route?: string;
}

@Component({
  selector: 'app-establishment-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './establishment-layout.html',
  styleUrl: './establishment-layout.scss',
})
export class EstablishmentLayout {
  establishmentName = 'Hotel Solar';

  items: NavItem[] = [
    { icon: '🏠', label: 'Início', route: '/establishment/dashboard' },
    { icon: '⚡', label: 'Carregadores' },
    { icon: '🔑', label: 'Aluguel' },
    { icon: '📅', label: 'Reservas' },
    { icon: '👥', label: 'Clientes' },
    { icon: '$', label: 'Financeiro' },
    { icon: '📊', label: 'Estatísticas' },
    { icon: '🏷', label: 'Promoções' },
    { icon: '⚙', label: 'Configurações' },
  ];
}