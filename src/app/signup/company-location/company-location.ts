import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupHeader } from '../signup-header/signup-header';
import { SignupState } from '../signup-state';

@Component({
  selector: 'app-company-location',
  imports: [ReactiveFormsModule, SignupHeader],
  templateUrl: './company-location.html',
  styleUrl: './company-location.scss',
})
export class CompanyLocation {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private signupState = inject(SignupState);

  states = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
    'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
  ];

  searchingZipCode = signal(false);
  zipCodeError = signal('');

  locationForm = this.formBuilder.group({
    zipCode: [this.signupState.company.zipCode, Validators.required],
    street: [this.signupState.company.street, Validators.required],
    number: [this.signupState.company.number, Validators.required],
    complement: [this.signupState.company.complement],
    district: [this.signupState.company.district, Validators.required],
    city: [this.signupState.company.city, Validators.required],
    state: [this.signupState.company.state, Validators.required],
  });

  async searchZipCode() {
    const digits = (this.locationForm.value.zipCode ?? '').replace(/\D/g, '');
    if (digits.length !== 8) {
      this.zipCodeError.set('CEP inválido.');
      return;
    }

    this.searchingZipCode.set(true);
    this.zipCodeError.set('');
    try {
      const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await response.json();
      if (data.erro) {
        this.zipCodeError.set('CEP não encontrado.');
        return;
      }
      this.locationForm.patchValue({
        street: data.logradouro,
        district: data.bairro,
        city: data.localidade,
        state: data.uf,
      });
    } catch {
      this.zipCodeError.set('Não foi possível buscar o CEP.');
    } finally {
      this.searchingZipCode.set(false);
    }
  }

  submit() {
    if (this.locationForm.invalid) {
      this.locationForm.markAllAsTouched();
      return;
    }
    Object.assign(this.signupState.company, this.locationForm.getRawValue());
    this.router.navigate(['/signup/company-category']);
  }
}