import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SignupHeader } from '../signup-header/signup-header';
import { SignupState } from '../signup-state';

@Component({
  selector: 'app-company-review',
  imports: [SignupHeader],
  templateUrl: './company-review.html',
  styleUrl: './company-review.scss',
})
export class CompanyReview {
  private router = inject(Router);
  private signupState = inject(SignupState);

  company = this.signupState.company;

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
    // TODO: send this.signupState.company to the Spring Boot backend
    this.router.navigate(['/login']);
  }
}