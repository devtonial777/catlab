import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { EstadoHome } from '../../shared/interfaces/home.interface';
import { CataasRequest } from '../../shared/interfaces/cataas.interface';

@Component({
  selector: 'app-home.component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  /* ========================
   * ESTADO
   * ======================== */
  estado: EstadoHome = 'inicial';

  /* ========================
   * FORM
   * ======================== */
  form!: FormGroup;

  /* ========================
   * RESULTADO
   * ======================== */
  imagemUrl: string | null = null;

  /* ========================
   * CONTROLE
   * ======================== */
  cooldown = 0;
  private intervalId: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      texto: [
        '',
        [Validators.maxLength(30)]
      ],
      tipo: [
        'aleatorio',
        [Validators.required]
      ]
    });
  }

  /* ========================
   * GETTERS
   * ======================== */
  get isBlocked(): boolean {
    return this.estado === 'carregando' || this.estado === 'cooldown';
  }

  get botaoLabel(): string {
    switch (this.estado) {
      case 'carregando':
        return 'Gerando ...';
      case 'cooldown':
        return `${this.cooldown}s`;
      default:
        return 'GERAR';
    }
  }

  /* ========================
   * AÇÕES
   * ======================== */
  onSubmit(): void {
    if (this.form.invalid || this.isBlocked) return;

    const payload: CataasRequest = this.form.value;

    this.estado = 'carregando';

    // MOCK (depois entra service)
    setTimeout(() => {
      this.imagemUrl = 'https://placekitten.com/400/300';
      this.estado = 'sucesso';

      this.iniciarCooldown();
    }, 1500);
  }

  limparTexto(): void {
    this.form.get('texto')?.setValue('');
  }

  private iniciarCooldown(): void {
    this.estado = 'cooldown';
    this.cooldown = 30;

    this.intervalId = setInterval(() => {
      this.cooldown--;

      if (this.cooldown <= 0) {
        clearInterval(this.intervalId);
        this.estado = 'inicial';
      }
    }, 1000);
  }
}