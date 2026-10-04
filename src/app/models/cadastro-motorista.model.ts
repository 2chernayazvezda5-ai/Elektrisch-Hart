export interface VeiculoRequest {
  marca?: string;
  modelo?: string;
  ano?: string;
  tipoConector?: string;
  capacidadeBateria?: string;
  autonomia?: string;
  cor?: string;
  placa?: string;
}

export interface CadastroMotoristaRequest {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  dataNascimento: string;
  senha: string;
  veiculo?: VeiculoRequest;
}

export interface MotoristaResponse {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  dataNascimento: string;
  veiculos: { id: number; marca: string; modelo: string }[];
}