import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SignupHeader } from '../signup-header/signup-header';
import { SignupState } from '../signup-state';
import { EmpresaApi } from '../../services/empresa-api';
import { CadastroEmpresaRequest } from '../../models/cadastro-empresa.model';

@Component({
  selector: 'app-company-review',
  imports: [SignupHeader],
  templateUrl: './company-review.html',
  styleUrl: './company-review.scss',
})
export class CompanyReview {
  private router = inject(Router);
  private signupState = inject(SignupState);
  private empresaApi = inject(EmpresaApi);

  company = this.signupState.company;

  enviando = false;
  mensagemErro = '';

  get extras() {
    const list: string[] = [];
    if (this.company.hasWifi) list.push('Wi-Fi gratuito');
    if (this.company.hasBathroom) list.push('Banheiro disponível');
    if (this.company.hasCafe) list.push('Cafeteria / Conveniência');
    if (this.company.hasWaitingArea) list.push('Área de espera');
    return list;
  }

  get price() {
    return this.company.isFree ? 'Gratuito' : `R$ ${this.company.pricePerKwh}`;
  }

  edit(route: string) {
    this.router.navigate(['/signup', route]);
  }

  finish() {
    this.mensagemErro = '';
    this.enviando = true;

    this.empresaApi.cadastrar(this.montarPayload()).subscribe({
      next: () => {
        this.enviando = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.enviando = false;
        this.mensagemErro =
          err?.error?.message ?? 'Não foi possível concluir o cadastro. Tente novamente.';
      },
    });
  }

  /**
   * Traduz o signupState.company (nomes em inglês, formato dos forms) para o
   * JSON que o backend espera. CNPJ e CEP vão só com dígitos, porque o
   * backend rejeita pontuação. O categoryHint não é enviado: é só texto de tela.
   */
  private montarPayload(): CadastroEmpresaRequest {
    const c = this.company;

    return {
      nome: c.name,
      cnpj: c.cnpj.replace(/\D/g, ''),
      email: c.email,
      telefone: c.phone,
      senha: c.password,
      categoria: c.category,
      descricao: c.description,
      endereco: {
        cep: c.zipCode.replace(/\D/g, ''),
        rua: c.street,
        numero: c.number,
        complemento: c.complement,
        bairro: c.district,
        cidade: c.city,
        estado: c.state,
      },
      infraestrutura: {
        quantidadeCarregadores: c.chargerCount,
        potencia: c.chargerPower,
        tipoConector: c.connectorType,
        velocidade: c.chargingSpeed,
        horarioFuncionamento: c.openingHours,
        gratuito: c.isFree,
        precoPorKwh: c.pricePerKwh,
        taxaOciosidade: c.idleFee,
        wifi: c.hasWifi,
        cafeteria: c.hasCafe,
        banheiro: c.hasBathroom,
        areaEspera: c.hasWaitingArea,
        informacoesAdicionais: c.additionalInfo,
      },
    };
  }
}