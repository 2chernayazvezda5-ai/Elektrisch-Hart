import { Routes } from '@angular/router';
import { Login } from './login/login';
import { AccountType } from './signup/account-type/account-type';
import { DriverRegister } from './signup/driver-register/driver-register';
import { DriverVehicle } from './signup/driver-vehicle/driver-vehicle';
import { EmailVerification } from './signup/email-verification/email-verification';
import { SignupComplete } from './signup/signup-complete/signup-complete';
import { CompanyRegister } from './signup/company-register/company-register';
import { CompanyLocation } from './signup/company-location/company-location';
import { CompanyCategory } from './signup/company-category/company-category';
import { CompanyInfrastructure } from './signup/company-infrastructure/company-infrastructure';
import { CompanyReview } from './signup/company-review/company-review';
import { MapaComponent } from './mapa/mapa.component'

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'mapa' , component: MapaComponent},
  {

    path: 'signup',
    children: [
      { path: '', redirectTo: 'account-type', pathMatch: 'full' },
      { path: 'account-type', component: AccountType },
      { path: 'register', component: DriverRegister },
      { path: 'vehicle', component: DriverVehicle },
      { path: 'verification', component: EmailVerification },
      { path: 'complete', component: SignupComplete },
      { path: 'company-register', component: CompanyRegister },
{ path: 'company-location', component: CompanyLocation },
{ path: 'company-category', component: CompanyCategory },
{ path: 'company-infrastructure', component: CompanyInfrastructure },
{ path: 'company-review', component: CompanyReview },
    ],
  },
];