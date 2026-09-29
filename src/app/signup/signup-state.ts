import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SignupState {
  accountType: 'driver' | 'establishment' = 'driver';

  driver = {
    fullName: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: '',
    password: '',
    vehicleBrand: '',
    vehicleModel: '',
    vehicleYear: '',
    connectorType: '',
    batteryCapacity: '',
    range: '',
    color: '',
    plate: '',
  };

  company = {
    // step 1
    name: '',
    cnpj: '',
    email: '',
    phone: '',
    password: '',
    // step 2
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    district: '',
    city: '',
    state: '',
    // step 3
    category: '',
    categoryHint: '',
    description: '',
    // step 4
    chargerCount: 1,
    chargerPower: '',
    connectorType: '',
    chargingSpeed: '',
    openingHours: '',
    pricePerKwh: '',
    isFree: false,
    idleFee: '',
    hasWifi: false,
    hasBathroom: false,
    hasCafe: false,
    hasWaitingArea: false,
    additionalInfo: '',
  };
}