import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupHeader } from '../signup-header/signup-header';
import { SignupState } from '../signup-state';

@Component({
  selector: 'app-account-type',
  imports: [SignupHeader],
  templateUrl: './account-type.html',
  styleUrl: './account-type.scss',
})
export class AccountType {
  constructor(
    private router: Router,
    private signupState: SignupState,
  ) {}

  choose(type: 'driver' | 'establishment') {
  this.signupState.accountType = type;
  this.router.navigate([type === 'driver' ? '/signup/register' : '/signup/company-register']);
}
}