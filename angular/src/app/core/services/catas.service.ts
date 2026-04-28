import { Injectable } from '@angular/core';
import { CataasRequest } from '../../shared/interfaces/cataas.interface';

@Injectable({
  providedIn: 'root'
})
export class CataasService {
  private readonly baseUrl = 'https://cataas.com/cat';

  public gerarImagem(request: CataasRequest): string {
    const { texto, tipo } = request;
    const caminhos: string[] = [];

    // Adiciona o segmento gif
    if (tipo === 'gif')
      caminhos.push('gif');

    // Se tiver texto, adicionamos /says/texto, na qual a API suporta /cat/says/oi e /cat/gif/says/oi
    if (texto?.trim())
      caminhos.push('says', encodeURIComponent(texto.trim()));

    const pathString = caminhos.length > 0 ? `/${caminhos.join('/')}` : '';
    const finalUrl = new URL(`${this.baseUrl}${pathString}`);

    // Cache buster p/a não repetir o gato
    finalUrl.searchParams.set('t', Date.now().toString());

    return finalUrl.toString();
  }
}