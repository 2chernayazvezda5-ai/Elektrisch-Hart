import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-signup-header',
  imports: [],
  templateUrl: './signup-header.html',
  styleUrl: './signup-header.scss',
})
export class SignupHeader {
  @Input() currentStep = 1;
  @Input() showBack = true;
  @Input() flow: 'driver' | 'company' = 'driver';

  constructor(private location: Location) {}

  get steps() {
    return this.flow === 'company'
      ? ['Dados da empresa', 'Localização', 'Tipo de estabelecimento', 'Infraestrutura', 'Conclusão']
      : ['Tipo de conta', 'Cadastro', 'Veículo', 'Verificação', 'Concluído'];
  }

  goBack() {
    this.location.back();
  }
}