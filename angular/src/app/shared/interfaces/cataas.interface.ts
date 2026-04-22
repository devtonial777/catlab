import { TipoImagem } from '../../shared/interfaces/home.interface';

export interface CataasRequest {
  texto?: string;
  tipo: TipoImagem;
}

export interface ResponseRequest {
  url: string;
}