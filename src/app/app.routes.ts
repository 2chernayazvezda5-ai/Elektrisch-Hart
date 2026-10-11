import { Routes } from '@angular/router';
import { Login } from './login/login';
import { AccountType } from './signup/account-type/account-type';
import { DriverRegister } from './signup/driver-register/driver-register';
import { DriverVehicle } from './signup/driver-vehicle/driver-vehicle';
import { SignupComplete } from './signup/signup-complete/signup-complete';
import { CompanyRegister } from './signup/company-register/company-register';
import { CompanyLocation } from './signup/company-location/company-location';
import { CompanyCategory } from './signup/company-category/company-category';
import { CompanyInfrastructure } from './signup/company-infrastructure/company-infrastructure';
import { CompanyReview } from './signup/company-review/company-review';
import { MapaComponent } from './mapa/mapa.component';

import { DriverLayout } from './driver/driver-layout/driver-layout';
import { DriverHome } from './driver/driver-home/driver-home';
import { DriverMap } from './driver/driver-map/driver-map';
import { EstablishmentLayout } from './establishment/establishment-layout/establishment-layout';
import { EstablishmentDashboard } from './establishment/establishment-dashboard/establishment-dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'mapa', component: MapaComponent },
  {
    path: 'signup',
    children: [
      { path: '', redirectTo: 'account-type', pathMatch: 'full' },
      { path: 'account-type', component: AccountType },
      { path: 'register', component: DriverRegister },
      { path: 'vehicle', component: DriverVehicle },
      { path: 'complete', component: SignupComplete },
      { path: 'company-register', component: CompanyRegister },
      { path: 'company-location', component: CompanyLocation },
      { path: 'company-category', component: CompanyCategory },
      { path: 'company-infrastructure', component: CompanyInfrastructure },
      { path: 'company-review', component: CompanyReview },
    ],
  },
  {
    path: 'driver',
    component: DriverLayout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: DriverHome },
      { path: 'map', component: DriverMap },
    ],
  },
  {
    path: 'establishment',
    component: EstablishmentLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: EstablishmentDashboard },
    ],
  },
];