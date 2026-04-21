import { Component } from '@angular/core';

// Interfaces 
import { TecnologiaInterface } from '../../shared/interfaces/tecnologia.interface';

@Component({
  selector: 'app-tecnologia',
  standalone: true,
  imports: [],
  templateUrl: './tecnologia.component.html',
  styleUrl: './tecnologia.component.scss',
})
export class TecnologiaComponent {
  techs: TecnologiaInterface[] = [
    {
      title: 'Angular',
      description: 'Construção da aplicação com arquitetura baseada em componentes.',
      icon: 'angular'
    },
    {
      title: 'React',
      description: 'Exploração de uma segunda abordagem de componentização.',
      icon: 'react'
    },
    {
      title: 'SCSS',
      description: 'Organização de estilos com reutilização e padronização.',
      icon: 'scss'
    },
    {
      title: 'Tailwind CSS',
      description: 'Utilizado para estrutura e agilidade na construção do layout.',
      icon: 'tailwind'
    },
    {
      title: 'BEM',
      description: 'Padronização de nomenclatura CSS para escalabilidade.',
      icon: 'bem'
    },
    {
      title: 'Componentização',
      description: 'Separação de responsabilidades em componentes reutilizáveis.',
      icon: 'component'
    }
  ];
}
