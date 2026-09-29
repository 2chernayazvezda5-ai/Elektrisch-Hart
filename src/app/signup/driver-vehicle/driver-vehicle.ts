import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupHeader } from '../signup-header/signup-header';
import { SignupState } from '../signup-state';

@Component({
  selector: 'app-driver-vehicle',
  imports: [ReactiveFormsModule, SignupHeader],
  templateUrl: './driver-vehicle.html',
  styleUrl: './driver-vehicle.scss',
})
export class DriverVehicle {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private signupState = inject(SignupState);

  years = Array.from({ length: 15 }, (_, i) => new Date().getFullYear() + 1 - i);
  connectors = ['Tipo 2 (Mennekes)', 'CCS2', 'CHAdeMO', 'GB/T', 'Tipo 1'];

  vehicleForm = this.formBuilder.group({
    vehicleBrand: [''],
    vehicleModel: [''],
    vehicleYear: [''],
    connectorType: [''],
    batteryCapacity: [''],
    range: [''],
    color: [''],
    plate: [''],
  });

  submit() {
    Object.assign(this.signupState.driver, this.vehicleForm.getRawValue());
    this.router.navigate(['/signup/verification']);
  }
}