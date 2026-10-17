export interface PontoRecargaResumo {
  quantidade: number;
  potencia: string;
  tipoConector: string;
  velocidade: string;
  gratuito: boolean;
  precoPorKwh: number | null;
  taxaOciosidade: string | null;
}

export interface EstabelecimentoProximo {
  id: number;
  nome: string;
  categoria: string;
  latitude: number;
  longitude: number;
  distanciaKm: number;
  horarioFuncionamento: string;
  pontosRecarga: PontoRecargaResumo[];
}