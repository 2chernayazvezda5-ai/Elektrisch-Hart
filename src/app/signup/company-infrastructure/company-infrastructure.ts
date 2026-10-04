import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupHeader } from '../signup-header/signup-header';
import { SignupState } from '../signup-state';

@Component({
  selector: 'app-company-infrastructure',
  imports: [ReactiveFormsModule, SignupHeader],
  templateUrl: './company-infrastructure.html',
  styleUrl: './company-infrastructure.scss',
})
export class CompanyInfrastructure {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private signupState = inject(SignupState);

  powers = ['3.7 kW', '7 kW', '11 kW', '22 kW', '50 kW', '75 kW', '100 kW', '150 kW', '350 kW'];
  connectors = ['Tipo 2 (Mennekes)', 'CCS2', 'CHAdeMO', 'GB/T', 'Tipo 1', 'Tesla (NACS)'];
  speeds = [
    { label: 'Rápido (DC)', detail: '50 kW ou mais' },
    { label: 'Semi-rápido (AC)', detail: '7 kW a 22 kW' },
    { label: 'Lento (AC)', detail: 'até 3.7 kW' },
  ];

  infrastructureForm = this.formBuilder.group({
    chargerCount: [this.signupState.company.chargerCount, [Validators.required, Validators.min(1)]],
    chargerPower: [this.signupState.company.chargerPower, Validators.required],
    connectorType: [this.signupState.company.connectorType, Validators.required],
    chargingSpeed: [this.signupState.company.chargingSpeed, Validators.required],
    openingHours: [this.signupState.company.openingHours, Validators.required],
    pricePerKwh: [this.signupState.company.pricePerKwh, Validators.required],
    isFree: [this.signupState.company.isFree],
    idleFee: [this.signupState.company.idleFee],
    hasWifi: [this.signupState.company.hasWifi],
    hasBathroom: [this.signupState.company.hasBathroom],
    hasCafe: [this.signupState.company.hasCafe],
    hasWaitingArea: [this.signupState.company.hasWaitingArea],
    additionalInfo: [this.signupState.company.additionalInfo, Validators.maxLength(300)],
  });

  constructor() {
    const price = this.infrastructureForm.controls.pricePerKwh;
    const isFree = this.infrastructureForm.controls.isFree;

    if (isFree.value) price.disable();
    isFree.valueChanges.subscribe((free) => (free ? price.disable() : price.enable()));
  }

  changeCount(amount: number) {
    const control = this.infrastructureForm.controls.chargerCount;
    control.setValue(Math.max(1, (control.value ?? 1) + amount));
  }

  setSpeed(label: string) {
    this.infrastructureForm.controls.chargingSpeed.setValue(label);
  }

  submit() {
    if (this.infrastructureForm.invalid) {
      this.infrastructureForm.markAllAsTouched();
      return;
    }
    Object.assign(this.signupState.company, this.infrastructureForm.getRawValue());
    this.router.navigate(['/signup/company-review']);
  }
}