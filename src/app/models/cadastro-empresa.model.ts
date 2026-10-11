export interface EnderecoRequest {
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface InfraestruturaRequest {
  quantidadeCarregadores: number;
  potencia: string;
  tipoConector: string;
  velocidade: string;
  horarioFuncionamento: string;
  gratuito: boolean;
  precoPorKwh: string;
  taxaOciosidade: string;
  wifi: boolean;
  cafeteria: boolean;
  banheiro: boolean;
  areaEspera: boolean;
  informacoesAdicionais: string;
}

export interface CadastroEmpresaRequest {
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  senha: string;
  categoria: string;
  descricao: string;
  endereco: EnderecoRequest;
  infraestrutura: InfraestruturaRequest;
}

export interface EmpresaResponse {
  id: number;
  nome: string;
  email: string;
  cnpj: string;
  categoria: string;
  status: string;
}