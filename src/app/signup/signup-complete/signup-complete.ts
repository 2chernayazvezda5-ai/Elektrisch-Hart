import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SignupHeader } from '../signup-header/signup-header';
import { SignupState } from '../signup-state';

@Component({
  selector: 'app-signup-complete',
  imports: [SignupHeader],
  templateUrl: './signup-complete.html',
  styleUrl: './signup-complete.scss',
})
export class SignupComplete {
  private router = inject(Router);
  private signupState = inject(SignupState);

  driver = this.signupState.driver;

  get vehicle() {
    return `${this.driver.vehicleBrand} ${this.driver.vehicleModel}`.trim() || '—';
  }

  goToDashboard() {
    // TODO: create the dashboard route
    this.router.navigate(['/dashboard']);
  }
}