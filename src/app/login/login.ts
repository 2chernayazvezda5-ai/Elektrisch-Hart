import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';
import { Localizacao } from '../services/localizacao';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(Auth);
  private localizacao = inject(Localizacao);

  // nonNullable: os valores são sempre string o que o TypeScript exige no envio
  loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  enviando = false;
  mensagemErro = '';

  submit() {
    if (this.loginForm.invalid) {
      this.mensagemErro = 'Informe um e-mail válido e a senha.';
      return;
    }

    this.mensagemErro = '';
    this.enviando = true;

    const { email, password } = this.loginForm.getRawValue();

    this.auth.login({ email, senha: password }).subscribe({
      next: (usuario) => {
        this.enviando = false;

        if (usuario.tipo === 'MOTORISTA') {
          this.localizacao.solicitar(); // abre o pedido de permissão do navegador
        }

        this.router.navigate([usuario.tipo === 'EMPRESA' ? '/establishment' : '/driver']);
      },
      error: (err) => {
        this.enviando = false;
        this.mensagemErro =
          err.status === 401
            ? 'E-mail ou senha incorretos.'
            : 'Não foi possível entrar. Tente novamente em instantes.';
      },
    });
  }
}