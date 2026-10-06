import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupHeader } from '../signup-header/signup-header';
import { SignupState } from '../signup-state';
import { MotoristaApi } from '../../services/motorista-api';
import { CadastroMotoristaRequest } from '../../models/cadastro-motorista.model';
import { MaskDirective } from '../../shared/mask.directive';
import { plateValidator, positiveNumberValidator } from '../../shared/validators';

@Component({
  selector: 'app-driver-vehicle',
  imports: [ReactiveFormsModule, SignupHeader, MaskDirective],
  templateUrl: './driver-vehicle.html',
  styleUrl: './driver-vehicle.scss',
})
export class DriverVehicle {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private signupState = inject(SignupState);
  private motoristaApi = inject(MotoristaApi);

  years = Array.from({ length: 15 }, (_, i) => new Date().getFullYear() + 1 - i);
  connectors = ['Tipo 2 (Mennekes)', 'CCS2', 'CHAdeMO', 'GB/T', 'Tipo 1'];

  vehicleForm = this.formBuilder.group({
    vehicleBrand: [''],
    vehicleModel: [''],
    vehicleYear: [''],
    connectorType: [''],
    batteryCapacity: ['', positiveNumberValidator],
    range: ['', positiveNumberValidator],
    color: [''],
    plate: ['', plateValidator],
  });

  enviando = false;
  mensagemErro = '';

  submit() {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      return;
    }

    Object.assign(this.signupState.driver, this.vehicleForm.getRawValue());

    this.mensagemErro = '';
    this.enviando = true;

    this.motoristaApi.cadastrar(this.montarPayload()).subscribe({
      next: () => {
        this.enviando = false;
        this.router.navigate(['/signup/complete']);
      },
      error: (err) => {
        this.enviando = false;
        this.mensagemErro = err?.error?.message ?? 'Não foi possível concluir o cadastro. Tente novamente.';
      },
    });
  }

  private montarPayload(): CadastroMotoristaRequest {
    const d = this.signupState.driver;

    const veiculoPreenchido = [
      d.vehicleBrand, d.vehicleModel, d.vehicleYear, d.connectorType,
      d.batteryCapacity, d.range, d.color, d.plate,
    ].some(valor => valor);

    return {
      nome: d.fullName,
      email: d.email,
      telefone: d.phone,
      cpf: d.cpf,
      dataNascimento: d.birthDate,
      senha: d.password,
      veiculo: veiculoPreenchido ? {
        marca: d.vehicleBrand,
        modelo: d.vehicleModel,
        ano: d.vehicleYear,
        tipoConector: d.connectorType,
        capacidadeBateria: d.batteryCapacity,
        autonomia: d.range,
        cor: d.color,
        placa: d.plate,
      } : undefined,
    };
  }
}