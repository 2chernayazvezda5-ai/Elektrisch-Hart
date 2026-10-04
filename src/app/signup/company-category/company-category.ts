import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupHeader } from '../signup-header/signup-header';
import { SignupState } from '../signup-state';

@Component({
  selector: 'app-company-category',
  imports: [FormsModule, SignupHeader],
  templateUrl: './company-category.html',
  styleUrl: './company-category.scss',
})
export class CompanyCategory {
  private router = inject(Router);
  private signupState = inject(SignupState);

  categories = [
    { label: 'Hotel', hint: 'Hospedagem e serviços para viajantes', icon: '🛏' },
    { label: 'Restaurante', hint: 'Alimentação e conveniência', icon: '🍴' },
    { label: 'Shopping', hint: 'Centros comerciais e lojas', icon: '🛍' },
    { label: 'Estacionamento', hint: 'Estacionamentos públicos ou privados', icon: '🅿' },
    { label: 'Posto de combustível', hint: 'Abastecimento e serviços automotivos', icon: '⛽' },
    { label: 'Empresa', hint: 'Empresas e escritórios', icon: '💼' },
    { label: 'Universidade / Escola', hint: 'Instituições de ensino e pesquisa', icon: '🎓' },
    { label: 'Outro', hint: 'Outro tipo de estabelecimento', icon: '⋯' },
  ];

  selectedCategory = this.signupState.company.category;
  description = this.signupState.company.description;

  select(category: { label: string; hint: string }) {
    this.selectedCategory = category.label;
    this.signupState.company.categoryHint = category.hint;
  }

  submit() {
    if (!this.selectedCategory) return;
    this.signupState.company.category = this.selectedCategory;
    this.signupState.company.description = this.description;
    this.router.navigate(['/signup/company-infrastructure']);
  }
}