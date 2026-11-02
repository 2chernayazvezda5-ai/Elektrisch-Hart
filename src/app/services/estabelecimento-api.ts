import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstabelecimentoProximo } from '../models/estabelecimento.model';

@Injectable({ providedIn: 'root' })
export class EstabelecimentoApi {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/estabelecimentos';

  buscarProximos(
  latitude: number,
  longitude: number,
  raioKm: number,
  conector?: string | null,
): Observable<EstabelecimentoProximo[]> {
  let params = new HttpParams()
    .set('latitude', latitude)
    .set('longitude', longitude)
    .set('raio', raioKm);

  if (conector) {
    params = params.set('conector', conector);
  }

  return this.http.get<EstabelecimentoProximo[]>(`${this.apiUrl}/proximos`, { params });
}
}