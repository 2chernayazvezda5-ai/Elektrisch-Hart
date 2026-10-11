import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, UsuarioLogado } from '../models/auth.model';

const CHAVE_SESSAO = 'fychar.usuario';

@Injectable({ providedIn: 'root' })
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/auth';

  // le do sessionStorage para o F5 não deslogar a pessoa
  private usuario: UsuarioLogado | null = this.lerDaSessao();

  login(request: LoginRequest): Observable<UsuarioLogado> {
    return this.http.post<UsuarioLogado>(`${this.apiUrl}/login`, request).pipe(
      tap((usuario) => {
        this.usuario = usuario;
        this.salvarNaSessao(usuario);
      }),
    );
  }

  logout(): void {
    this.usuario = null;
    try {
      sessionStorage.removeItem(CHAVE_SESSAO);
    } catch {
      // sessionStorage indisponível
    }
  }

  get usuarioLogado(): UsuarioLogado | null {
    return this.usuario;
  }

  estaLogado(): boolean {
    return this.usuario !== null;
  }

  private lerDaSessao(): UsuarioLogado | null {
    try {
      const texto = sessionStorage.getItem(CHAVE_SESSAO);
      return texto ? JSON.parse(texto) : null;
    } catch {
      return null;
    }
  }

  private salvarNaSessao(usuario: UsuarioLogado): void {
    try {
      sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify(usuario));
    } catch {
      // sem sessionStorage
    }
  }
}