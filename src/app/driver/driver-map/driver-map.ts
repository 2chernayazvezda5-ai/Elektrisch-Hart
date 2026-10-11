import { Component } from '@angular/core';
import { MapSlot } from '../../shared/map-slot/map-slot';

@Component({
  selector: 'app-driver-map',
  imports: [MapSlot],
  templateUrl: './driver-map.html',
  styleUrl: './driver-map.scss',
})
export class DriverMap {
  tab: 'find' | 'plan' = 'find';
  routePref = 'fast';
  onlyAvailable = true;

  prefs = [
    { id: 'fast', icon: '⚡', label: 'Rota mais rápida' },
    { id: 'cheap', icon: '$', label: 'Menor custo' },
  ];

  connectors = ['Tipo 2 (Mennekes)', 'CCS2', 'CHAdeMO', 'GB/T', 'Tipo 1'];

  charger = {
    name: 'Shopping Iguatemi',
    address: '—',
    status: 'Disponível',
    price: 'R$ 1,40',
    unit: '/ kWh',
    fee: 'Taxa de ocupação: R$ 1,50/min',
    power: '50 kW',
    connector: 'CCS2',
    hours: '24h',
  };

  route = {
    duration: '19 min',
    distance: '12,4 km',
    stopsLabel: '3 paradas sugeridas',
    stops: [
      { name: 'Minha localização', color: 'green' },
      { name: 'FyChar Est. Iguatemi', color: 'yellow' },
      { name: 'Shopping Iguatemi', color: 'yellow' },
    ],
  };

  filters = [
    { label: 'Disponível', dot: 'green', active: false },
    { label: 'Rápido (50kW+)', dot: 'yellow', active: false },
    { label: 'Gratuito', dot: '', active: false },
  ];

  toggleFilter(f: { active: boolean }) {
    f.active = !f.active;
  }

  clearFilters() {
    this.filters.forEach((f) => (f.active = false));
  }
}