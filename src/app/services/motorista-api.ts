import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CadastroMotoristaRequest, MotoristaResponse } from '../models/cadastro-motorista.model';

@Injectable({ providedIn: 'root' })
export class MotoristaApi {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/motoristas';

  cadastrar(request: CadastroMotoristaRequest): Observable<MotoristaResponse> {
    return this.http.post<MotoristaResponse>(this.apiUrl, request);
  }
}