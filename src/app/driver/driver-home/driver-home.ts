import { Component } from '@angular/core';

interface Feature {
  icon: string;
  title: string;
  text: string;
}

interface Step {
  title: string;
  short: string;
  intro: string;
  features: Feature[];
}

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.html',
  styleUrl: './driver-home.scss',
})
export class DriverHome {
  userName = 'Nome do Usuário';
  current = 0;

  steps: Step[] = [
    {
      title: 'Encontre carregadores',
      short: 'Veja no mapa os pontos de recarga próximos de você.',
      intro: 'Use o mapa interativo para localizar carregadores disponíveis próximos a você.',
      features: [
        { icon: '📍', title: 'Mapa interativo', text: 'Veja todos os carregadores perto de você com filtros inteligentes.' },
        { icon: '🛡', title: 'Informações completas', text: 'Confira potência, tipo de conector, preço e disponibilidade.' },
        { icon: '🧭', title: 'Navegue até o local', text: 'Ative o GPS e chegue ao carregador com apenas um toque.' },
      ],
    },
    {
      title: 'Planeje sua rota',
      short: 'Planeje seus trajetos com paradas estratégicas.',
      intro: 'Crie rotas otimizadas com paradas de recarga no caminho.',
      features: [
        { icon: '🗺', title: 'Rotas inteligentes', text: 'Escolha entre a rota mais rápida ou a de menor custo.' },
        { icon: '⚡', title: 'Paradas de recarga', text: 'Adicione carregadores compatíveis com o seu veículo.' },
        { icon: '⏱', title: 'Tempo estimado', text: 'Veja a duração e a distância antes de sair.' },
      ],
    },
    {
      title: 'Recarregue e acompanhe',
      short: 'Acompanhe em tempo real o status de sua recarga.',
      intro: 'Acompanhe cada recarga do começo ao fim.',
      features: [
        { icon: '🔋', title: 'Status em tempo real', text: 'Veja o nível de carga e o tempo restante.' },
        { icon: '💲', title: 'Custo da recarga', text: 'Saiba quanto está gastando enquanto carrega.' },
        { icon: '🕘', title: 'Histórico', text: 'Consulte todas as suas recargas anteriores.' },
      ],
    },
    {
      title: 'Alugue ou compartilhe',
      short: 'Alugue seu carregador ou compartilhe energia.',
      intro: 'Alugue carregadores pessoais ou disponibilize o seu.',
      features: [
        { icon: '🔑', title: 'Aluguel simples', text: 'Reserve um carregador pessoal onde você estiver.' },
        { icon: '🤝', title: 'Compartilhe energia', text: 'Disponibilize o seu carregador para outros motoristas.' },
        { icon: '📅', title: 'Gerencie reservas', text: 'Acompanhe seus aluguéis em um só lugar.' },
      ],
    },
    {
      title: 'Economize e ganhe',
      short: 'Use energia limpa e ganhe benefícios exclusivos.',
      intro: 'Economize e aproveite benefícios ao usar energia limpa.',
      features: [
        { icon: '🌱', title: 'Energia limpa', text: 'Veja quanto você já economizou.' },
        { icon: '🎁', title: 'Benefícios', text: 'Ganhe vantagens exclusivas dos parceiros.' },
        { icon: '📈', title: 'Acompanhe seu impacto', text: 'Meça o resultado de cada quilômetro elétrico.' },
      ],
    },
  ];

  get step(): Step {
    return this.steps[this.current];
  }

  select(index: number) {
    this.current = index;
  }

  next() {
    this.current = (this.current + 1) % this.steps.length;
  }
}