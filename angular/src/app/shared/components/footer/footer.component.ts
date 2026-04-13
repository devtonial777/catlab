import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  standalone: true,
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  public anoAtual: number = new Date().getFullYear();
}
