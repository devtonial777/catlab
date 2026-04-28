import { Component, inject, ChangeDetectorRef  } from '@angular/core';
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
import { interval } from 'rxjs';

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
export class HomeComponent {

  // private
  private intervalId: any;
  private readonly _cataasService = inject(CataasService);

  // public 
  public form!: FormGroup;
  public cooldown: number = 0
  public imagemUrl: string | null = null;
  public estado: EstadoHome = 'inicial';
  
  constructor(private fb: FormBuilder,  private changeDetectorRef: ChangeDetectorRef) {
    this.gerarForm();
  }

  /* ========================
   * GETTERS
   * ======================== */
    get isBlocked(): boolean {
      return (this.estado === 'carregando' || this.estado === 'cooldown');
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

  public onSubmit(): void {
    if (this.form.invalid || this.isBlocked) return;

    this.estado = 'carregando';
    const payload: CataasRequest = this.form.value;
    const url = this._cataasService.gerarImagem(payload);

    // Gif nn usa preload
    if (payload.tipo === 'gif') {
      this.imagemUrl = url;
      return;
    }

    // img normal usa o preload
    const img = new Image();

    img.onload = () => {
      this.imagemUrl = url;
      this.onImageLoad();
    };

    img.onerror = () => {
      this.onImageError();
    };

    img.src = url;
  }

  public limparTexto(): void {
    this.form.get('texto')?.setValue('');
  }

  public onImageLoad(): void {
    if (this.estado !== 'carregando') return;

    this.estado = 'sucesso';
    this.iniciarCooldown();
  }

  public onImageError(): void {
    this.estado = 'erro';
    this.imagemUrl = null;
  }

  // PRIVATE METHODS
    private iniciarCooldown(): void {
      this.estado = 'cooldown';
      this.cooldown = 30;

      const sub = interval(1000).subscribe(() => {
        this.cooldown--;
        this.changeDetectorRef.detectChanges();

        if (this.cooldown <= 0) {
          sub.unsubscribe();
          this.estado = 'inicial';
        }
      });
    }

    private gerarForm(): void {
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
  //

  // Destrua o interval se o usuário sair da página
  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}