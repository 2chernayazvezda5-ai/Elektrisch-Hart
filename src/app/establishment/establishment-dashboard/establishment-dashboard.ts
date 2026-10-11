import { Component } from '@angular/core';

@Component({
  selector: 'app-establishment-dashboard',
  templateUrl: './establishment-dashboard.html',
  styleUrl: './establishment-dashboard.scss',
})
export class EstablishmentDashboard {
  establishmentName = 'Hotel Solar';

  stats = [
    { label: 'Carregadores ativos', value: '6 / 8', note: '↑ 20% vs ontem', up: true },
    { label: 'Carregadores ocupados', value: '4 / 8', note: '50% ocupados', up: false },
    { label: 'Receita de hoje', value: 'R$ 1.248,00', note: '↑ 15% vs ontem', up: true },
    { label: 'Avaliação média', value: '4,8', note: '(128 avaliações)', up: false },
  ];

  usage = [
    { hour: '08h', value: 30 },
    { hour: '10h', value: 45 },
    { hour: '12h', value: 65 },
    { hour: '14h', value: 85 },
    { hour: '16h', value: 80 },
    { hour: '18h', value: 55 },
    { hour: '20h', value: 40 },
    { hour: '22h', value: 25 },
  ];

  miniStats = [
    { label: 'Média de ocupação', value: '62%' },
    { label: 'Tempo médio por aluguel', value: '5h 30m' },
    { label: 'Aluguéis finalizados', value: '28' },
  ];

  statuses = [
    { label: 'Ativos', value: 6, color: '#4CAF50' },
    { label: 'Ocupados', value: 4, color: '#3b82f6' },
    { label: 'Em manutenção', value: 1, color: '#FFC107' },
    { label: 'Offline', value: 1, color: '#ff5252' },
  ];

  reservations = [
    { name: 'Ana Souza', info: 'Carregador 24 kW', time: 'Hoje, 10:30 - 12:30', status: 'Em andamento', cls: 'ongoing' },
    { name: 'Rafael Lima', info: 'Carregador 18 kW', time: 'Hoje, 13:00 - 15:00', status: 'Reservado', cls: 'booked' },
    { name: 'Juliana Costa', info: 'Carregador 22 kW', time: 'Hoje, 15:30 - 18:00', status: 'Reservado', cls: 'booked' },
    { name: 'Bruno Alves', info: 'Carregador 7,4 kW', time: 'Hoje, 19:00 - 21:00', status: 'Pendente', cls: 'pending' },
  ];

  chargers = [
    { name: 'Carregador 01', spec: '7,4 kW • Tipo 2', status: 'Ativo', cls: 'active', place: 'Entrada Principal' },
    { name: 'Carregador 02', spec: '7,4 kW • Tipo 2', status: 'Ocupado', cls: 'busy', place: 'Estacionamento A' },
    { name: 'Carregador 03', spec: '22 kW • CCS', status: 'Ativo', cls: 'active', place: 'Estacionamento A' },
    { name: 'Carregador 04', spec: '22 kW • CCS', status: 'Ativo', cls: 'active', place: 'Estacionamento B' },
    { name: 'Carregador 05', spec: '22 kW • Tipo 1', status: 'Manutenção', cls: 'maintenance', place: 'Estacionamento B' },
  ];

  hours = [
    { days: 'Segunda - Sábado', time: '08:00 - 22:00' },
    { days: 'Domingo', time: '09:00 - 18:00' },
  ];

  address = 'Av. Principal, 123 - Centro, São Paulo - SP';

  get donut(): string {
    const total = this.statuses.reduce((sum, s) => sum + s.value, 0);
    let acc = 0;
    const parts = this.statuses.map((s) => {
      const start = acc;
      acc += (s.value / total) * 100;
      return `${s.color} ${start}% ${acc}%`;
    });
    return `conic-gradient(${parts.join(', ')})`;
  }
}