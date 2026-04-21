import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: '',
  //   loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  // },
  {
    path: 'sobre',
    loadComponent: () => import('./features/sobre/sobre.component').then(m => m.SobreComponent)
  },
  {
    path: 'tecnologias',
    loadComponent: () => import('./features/tecnologia/tecnologia.component').then(m => m.TecnologiaComponent)
  },
];
