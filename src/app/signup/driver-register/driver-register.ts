import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupHeader } from '../signup-header/signup-header';
import { SignupState } from '../signup-state';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordsMismatch: true };
}

@Component({
  selector: 'app-driver-register',
  imports: [ReactiveFormsModule, SignupHeader],
  templateUrl: './driver-register.html',
  styleUrl: './driver-register.scss',
})
export class DriverRegister {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private signupState = inject(SignupState);

  showPassword = false;
  showConfirmPassword = false;

  registerForm = this.formBuilder.group(
    {
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      cpf: ['', Validators.required],
      birthDate: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsMatch },
  );

  submit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const { confirmPassword, ...data } = this.registerForm.getRawValue();
    Object.assign(this.signupState.driver, data);
    this.router.navigate(['/signup/vehicle']);
  }
}