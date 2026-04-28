// Interface usada para tipar algumas informações na tela inicial

export type TipoImagem = | 'aleatorio' | 'gif' | 'img';
export type EstadoHome = | 'inicial' | 'carregando' | 'sucesso' | 'cooldown' | 'erro';