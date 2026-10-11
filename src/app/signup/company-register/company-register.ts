import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupHeader } from '../signup-header/signup-header';
import { SignupState } from '../signup-state';
import { MaskDirective } from '../../shared/mask.directive';
import { cnpjValidator, phoneValidator } from '../../shared/validators';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordsMismatch: true };
}

@Component({
  selector: 'app-company-register',
  imports: [ReactiveFormsModule, SignupHeader, MaskDirective],
  templateUrl: './company-register.html',
  styleUrl: './company-register.scss',
})
export class CompanyRegister {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private signupState = inject(SignupState);

  showPassword = false;
  showConfirmPassword = false;

  companyForm = this.formBuilder.group(
    {
      name: [this.signupState.company.name, Validators.required],
      cnpj: [this.signupState.company.cnpj, [Validators.required, cnpjValidator]],
      email: [this.signupState.company.email, [Validators.required, Validators.email]],
      phone: [this.signupState.company.phone, [Validators.required, phoneValidator]],
      password: [this.signupState.company.password, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [this.signupState.company.password, Validators.required],
    },
    { validators: passwordsMatch },
  );

  submit() {
    if (this.companyForm.invalid) {
      this.companyForm.markAllAsTouched();
      return;
    }
    const { confirmPassword, ...data } = this.companyForm.getRawValue();
    Object.assign(this.signupState.company, {
      ...data,
      cnpj: (data.cnpj ?? '').replace(/[^A-Z0-9]/gi, '').toUpperCase(),
      phone: (data.phone ?? '').replace(/\D/g, ''),
    });
    this.router.navigate(['/signup/company-location']);
  }
}