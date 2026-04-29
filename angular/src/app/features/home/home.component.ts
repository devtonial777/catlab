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

  // GETTERS
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
  // -- FIM, GETTERS

  // PUBLIC
    public onSubmit(): void {
      if (this.form.invalid || this.isBlocked) return;

      this.estado = 'carregando';

      const img = new Image();
      const payload: CataasRequest = this.form.value;

      if(payload.tipo === 'aleatorio') payload.tipo = Math.random() > 0.5 ? 'img' : 'gif';

      const url = this._cataasService.gerarImagem(payload);

      // Gif nn usa preload
      if (payload.tipo === 'gif') {
        this.imagemUrl = url;
        return;
      }
      else {
        img.onload = () => { this.imagemUrl = url; };
        img.src = url;
      }

      img.onerror = () => {
        this.onImageError();
      };

      this.iniciarCooldown();
    }

    public limparTexto(): void {
      this.form.get('texto')?.setValue('');
    }

    public onImageError(): void {
      this.estado = 'erro';
      this.imagemUrl = null;
    }
  // -- FIM, PUBLIC

  // PRIVATE METHODS
    private iniciarCooldown(): void {
      
      this.cooldown = 30;
      this.estado = 'cooldown';
      
      const sub = interval(1000).subscribe(
        () => {

          this.cooldown--;
          this.changeDetectorRef.detectChanges();

          if (this.cooldown <= 0) {
          
            this.resetState();
            sub.unsubscribe();
          }
        }
      );
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

    private resetState(): void {
      this.isBlocked;
      this.cooldown = 0;
      this.imagemUrl = null;
      this.estado = 'inicial';

      this.changeDetectorRef.detectChanges();
    }
  // -- FIM, PRIVATE METHODS

  // Destrua o interval se o usuário sair da página
  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}