# CatLab

Aplicação web para geração de imagens de gatinhos, desenvolvida com foco em estudo e demonstração de habilidades em desenvolvimento front-end.

---

## Sobre o projeto

O CatLab é uma aplicação voltada à geração de imagens de gatos, criada com o objetivo de aplicar conceitos modernos de desenvolvimento front-end, organização de código e boas práticas de programação.

O projeto também serve como base para experimentação com diferentes frameworks, permitindo a comparação entre abordagens utilizando Angular e React.

---

## Estrutura do projeto

```bash
/
├── _docs/     # Documentação e análise do projeto (.pdf)
├── angular/   # Aplicação front-end em Angular
├── react/     # Aplicação front-end em React
└── README.md
```

---

## Decisões Técnicas (Angular)

Durante o desenvolvimento da aplicação em Angular, foram adotadas decisões técnicas com foco em organização, escalabilidade e manutenibilidade.

### Estilização

- Utilização do Tailwind CSS para construção de layout, incluindo flexbox, grid, espaçamentos e responsividade
- Uso de SCSS para definição de identidade visual, cores e estados visuais
- Definição de variáveis CSS globais para padronização de cores e fácil manutenção

### Padrão de CSS

- Adoção da metodologia BEM (Block, Element, Modifier) para nomeação de classes
- Organização de estilos por componente
- Uso controlado de nesting no SCSS, compatível com o Angular moderno

Exemplo:

```scss
.header {
  & .header__link {
    /* estilos */
  }
}
```

### Separação de responsabilidades

- Tailwind CSS responsável por layout e responsividade
- SCSS responsável por identidade visual e comportamento visual
- HTML mantido limpo, evitando excesso de classes utilitárias

### Layout da aplicação

- Estrutura baseada em Flexbox para manter o footer posicionado ao final da página
- Uso de `min-height: 100vh` com fallback para `100dvh`, garantindo melhor comportamento em dispositivos móveis

### Boas práticas

- Uso de `rel="noopener noreferrer"` em links externos com `target="_blank"`
- Organização de arquivos estáticos na pasta `public/`
- Separação entre componentes reutilizáveis (`shared`) e páginas (`pages`)

---

## Objetivo

- Demonstrar habilidades em desenvolvimento front-end
- Explorar diferentes frameworks (Angular e React)
- Aplicar boas práticas de organização e arquitetura
- Evoluir continuamente o projeto com novas funcionalidades

---

## Próximos passos

- Estruturação inicial da aplicação em React
- Implementação da geração de imagens de gatinhos
- Criação dos componentes principais da interface
- Evolução da versão em Angular
- Integração com APIs externas

---

## Documentação

A documentação inicial do projeto está disponível na pasta `_docs`, contendo a análise e definições iniciais.

---

## Como rodar o projeto

### Angular

Em breve.

### React

Em breve.

---

## Licença

Este projeto é destinado a fins de estudo e aprendizado.