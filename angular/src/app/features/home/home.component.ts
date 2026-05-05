import { Component, inject, ChangeDetectorRef, OnInit  } from '@angular/core';
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
export class HomeComponent implements OnInit {

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

  ngOnInit(): void {

    if(this.cooldownRestante != null)
      this.controlStateCooldown();
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

    get cooldownRestante(): string | null {
      return localStorage.getItem('cooldownFim');
    }
  // -- FIM, GETTERS
  
  // PRIVATE METHODS
    private iniciarCooldown(): void {
      const tempoFinal = Date.now() + (30 * 1000);

      localStorage.setItem('cooldownFim', tempoFinal.toString());

      this.iniciarRetomarCooldown(tempoFinal);
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
      localStorage.removeItem('cooldownFim');

      this.changeDetectorRef.detectChanges();
    }
    
    private controlStateCooldown(): void {
      const tempoFinal = Number(this.cooldownRestante);

      if (tempoFinal > Date.now()) 
        this.iniciarRetomarCooldown(tempoFinal);
      else 
        localStorage.removeItem('cooldownFim');
    }

    private iniciarRetomarCooldown(tempoFinal: number): void {
      this.estado = 'cooldown';

      console.log('iniciarRetomarCooldown | tempoFinal', tempoFinal);

      const sub = interval(1000).subscribe(() => {
        const agora = Date.now();
        const tempoRestante = Math.floor((tempoFinal - agora) / 1000);
        
        console.log('iniciarRetomarCooldown | tempoRestante', tempoRestante);

        this.cooldown = tempoRestante > 0 ? tempoRestante : 0;

        this.changeDetectorRef.detectChanges();

        if (tempoRestante <= 0) {
          localStorage.removeItem('cooldownFim');
          this.resetState();
          sub.unsubscribe();
        }
      });
    }
  // -- FIM, PRIVATE METHODS

  // PUBLIC
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

      // GIF direto (DOM controla load)
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

      img.onerror = () => {
        this.onImageError();
      };

      img.src = url;
    }

    public limparTexto(): void {
      this.form.get('texto')?.setValue('');
    }

    public onImageError(): void {
      this.estado = 'erro';
      this.imagemUrl = null;
    }
  // -- FIM, PUBLIC

  // Destroi o interval se o usuário sair da página
  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}