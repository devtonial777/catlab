import { Component, inject, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

// material
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Forms
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// Service
import { CataasService } from '../../core/services/catas.service';

// Interfaces
import { EstadoHome } from '../../shared/interfaces/home.interface';
import { CataasRequest } from '../../shared/interfaces/cataas.interface';

// rxjs
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home.component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {

  // private
  private cooldownSub?: Subscription;
  private readonly _cataasService = inject(CataasService);

  // public 
  public form!: FormGroup;
  public cooldown: number = 0;
  public imagemUrl: string | null = null;
  public estado: EstadoHome = 'inicial';

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.gerarForm();
  }

  ngOnInit(): void {
    const saved = localStorage.getItem('cooldownFim');
    if (saved) this.controlStateCooldown(Number(saved));
  }

  ngOnDestroy(): void {
    this.cooldownSub?.unsubscribe();
  }

  // ========================
  // GETTERS
  // ========================
  get isBlocked(): boolean {
    return this.estado === 'carregando' || this.estado === 'cooldown';
  }

  get botaoLabel(): string {
    switch (this.estado) {
      case 'carregando':
        return 'Gerando ...';
      case 'cooldown':
        return `Gerar Novamente Em: ${this.cooldown}s`;
      default:
        return 'GERAR';
    }
  }

  // ========================
  // PUBLIC
  // ========================
  public onSubmit(): void {
    if (this.form.invalid || this.isBlocked) return;

    this.estado = 'carregando';

    let payload: CataasRequest = this.form.value;

    // aleatório
    if (payload.tipo === 'aleatorio') {
      payload = {
        ...payload,
        tipo: Math.random() > 0.5 ? 'img' : 'gif'
      };
    }

    const url = this._cataasService.gerarImagem(payload);

    // GIF direto
    if (payload.tipo === 'gif') {
      this.imagemUrl = url;
      this.iniciarCooldown();
      return;
    }

    // IMG preload
    const img = new Image();

    img.onload = () => {
      this.imagemUrl = url;
      this.estado = 'sucesso';
      this.iniciarCooldown();
    };

    img.onerror = () => this.onImageError();

    img.src = url;
  }

  public limparTexto(): void {
    this.form.get('texto')?.setValue('');
  }

  public onImageError(): void {
    this.estado = 'erro';
    this.imagemUrl = null;
  }

  // ========================
  // PRIVATE
  // ========================
  private gerarForm(): void {
    this.form = this.fb.group({
      texto: ['', [Validators.maxLength(30)]],
      tipo: ['aleatorio', [Validators.required]]
    });
  }

  private iniciarCooldown(): void {
    const tempoFinal = Date.now() + 30000;

    localStorage.setItem('cooldownFim', tempoFinal.toString());

    this.startCooldownTimer(tempoFinal);
  }

  private controlStateCooldown(tempoFinal: number): void {
    if (tempoFinal > Date.now()) {
      this.startCooldownTimer(tempoFinal);
    } else {
      localStorage.removeItem('cooldownFim');
    }
  }

  private startCooldownTimer(tempoFinal: number): void {
    this.estado = 'cooldown';

    this.updateCooldown(tempoFinal);

    this.cooldownSub?.unsubscribe();

    this.cooldownSub = interval(1000).subscribe(() => {
      this.updateCooldown(tempoFinal);

      if(this.cooldown <= 0) this.resetState();
      
    });
  }

  private updateCooldown(tempoFinal: number): void {
    const diff = tempoFinal - Date.now();
    this.cooldown = diff > 0 ? Math.ceil(diff / 1000) : 0;

    this.cdr.detectChanges();
  }

  private resetState(): void {
    this.cooldownSub?.unsubscribe();
    localStorage.removeItem('cooldownFim');

    this.cooldown = 0;
    this.imagemUrl = null;
    this.estado = 'inicial';

    this.cdr.detectChanges();
  }
}