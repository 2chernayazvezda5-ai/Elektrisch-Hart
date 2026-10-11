export interface LoginRequest {
  email: string;
  senha: string;
}

export interface UsuarioLogado {
  id: number;
  nome: string;
  email: string;
  tipo: 'MOTORISTA' | 'EMPRESA';
}