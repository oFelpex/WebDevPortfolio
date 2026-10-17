# 🎮 Felpex — Web Dev Portfolio

Portfólio pessoal de **Felipe Costa (Felpex)**, desenvolvido com **Angular 19 + TypeScript**, totalmente **tematizado**: além dos temas de cores tradicionais (Light, Dark e Cosmic), o site possui **temas inspirados em jogos de videogame**, onde a página *Home* é recriada como o **menu inicial do jogo** referido, com música, efeitos sonoros, animações e easter eggs.

> Projeto feito como estudo e vitrine: front-end com Angular, animações, áudio, WebGL (three.js), partículas, mapas interativos e internacionalização.

**Versão atual:** `1.4.6`

---

## 📑 Sumário

- [Visão geral](#-visão-geral)
- [Temas](#-temas)
  - [Temas de cores](#-temas-de-cores-concluídos)
  - [Minecraft](#-minecraft--concluído)
  - [The Witcher 3](#-the-witcher-3--em-desenvolvimento)
  - [Temas planejados](#-temas-planejados)
- [Páginas](#-páginas)
- [Funcionalidades gerais](#-funcionalidades-gerais)
- [Tecnologias](#-tecnologias)
- [Arquitetura e estrutura de pastas](#-arquitetura-e-estrutura-de-pastas)
- [Serviços](#-serviços)
- [Como rodar o projeto](#-como-rodar-o-projeto)
- [Como criar um novo tema de jogo](#-como-criar-um-novo-tema-de-jogo)
- [Roadmap](#-roadmap)
- [Aviso legal](#-aviso-legal)
- [Autor](#-autor)

---

## 🌟 Visão geral

O site funciona como um portfólio comum (Home, Sobre mim, Projetos e Contato), mas o usuário pode trocar o **tema** a qualquer momento. Cada tema altera:

- 🎨 **Paleta de cores** (gerada via `ng generate @angular/material:theme-color` e aplicada com `mat.theme`);
- 🔤 **Tipografia** (fontes próprias de cada jogo);
- 🧭 **Header/navegação** (componente diferente por tema);
- 🏠 **Página Home** (nos temas de jogo, vira o menu inicial do jogo);
- 🔊 **Áudio** (trilha sonora, SFX de clique e de hover);
- ✨ **Easter egg** ao clicar no logo;
- 🖱️ **Detalhes visuais** (botões, cards, diálogos, cursor, fundos).

O tema escolhido e o idioma ficam salvos no `localStorage`, então a escolha é mantida entre visitas.

---

## 🎨 Temas

### 🌈 Temas de cores (concluídos)

| Tema | Descrição |
|------|-----------|
| **Light** | Tema padrão, claro, usando as paletas `azure` e `blue` do Angular Material. |
| **Dark** | Tons de cinza-azulado escuro (`#222831`, `#393E46`) com destaque em ciano/azul. |
| **Cosmic** | Tons de roxo profundo (`#2A004E`, `#500073`) com texto em creme, visual "espacial". |

Ao clicar novamente no tema ativo, o site volta para o tema padrão (Light) e exibe um snackbar informando.

---

### ⛏️ Minecraft — ✅ Concluído

Tema inspirado no menu inicial do **Minecraft 1.20**.

**Home (`MinecraftHomeComponent`)**
- 🌄 **Skybox panorâmico 3D** (three.js) girando lentamente ao fundo, com as 6 faces do panorama oficial do jogo.
- 🟩 **Menu com botões estilo Minecraft**: *About me*, *Projects*, *Contact me*, *Quit game*, *Options* e botões laterais de idioma e soundboard.
- 💬 **Frases aleatórias** ao lado do logo (as famosas *splash texts*), traduzidas em pt-BR e en-US.
- 📋 Texto de versão e copyright no rodapé.
- 📱 Versão responsiva para mobile.

**Header (`MinecraftHeaderComponent`)**
- Barra de navegação com textura de bloco.
- Menus em cascata: *Explore* (rotas) e *Settings* (temas, idiomas, soundboard).
- Menu lateral e soundboard em *drawer* no mobile.

**Diálogos**
- Opções de tema (jogos e cores) com expansion panels e radio buttons.
- Seleção de idioma.
- Soundboard com controle de música, volume de SFX e música.
- Todos com botões e bordas em estilo "pixel art" do Minecraft.

**Easter egg 💣**
- Clique no logo para **ativar um TNT**: o bloco cai, pisca em branco, e explode com **partículas** (`tsparticles`), acompanhado dos sons de ativação e explosão.

**Áudio**
- Trilha: *Aria Math*, *Mice on Venus*, *Subwoofer Lullaby*, *Moog City* (C418) e *Pigstep* (Lena Raine).

---

### 🐺 The Witcher 3 — 🚧 Em desenvolvimento

Tema inspirado no menu inicial e na interface do **The Witcher 3: Wild Hunt**.

**Home (`Tw3HomeComponent`)**
- 🌫️ **Efeitos com three.js**: neblina animada (fog 2D), fogueira com luz pulsante, brilho (*glow*), chamas e fagulhas em partículas com shaders customizados. A posição da fogueira se adapta ao redimensionar a tela.
- 📜 **Menu lateral** estilo Witcher: *Navigate*, *Options*, *Soundboard* e *Quit game*, com cantos decorados e animação de hover.
- 🏷️ **Badges das expansões** *Hearts of Stone* e *Blood and Wine*.
- 🖱️ **Cursor personalizado** na home.
- ©️ Link de copyright.

**Diálogos da Home**
- 🗺️ **Navigate**: um **mapa interativo** (Leaflet) com ícones do jogo. Os *fast travel points* levam às rotas do site (*home*, *about-me*, *projects*, *contact-me*), e há ícones decorativos (missão, monster den, armeiro, etc.) com tooltips traduzidos. HUD com legenda no estilo do jogo.
- ⚙️ **Options**: navegação por submenus (temas de jogos/cores, volume, idiomas), com barra de nível/XP, peso e dinheiro como elementos de HUD.
- 🃏 **Soundboard / Music Player**: as músicas são **cartas de Gwent**. Ao selecionar uma carta, ela **voa até o player** com animação *FLIP*, e a música toca com barra de progresso, compositor e controles (anterior, play/pause, próxima).

**Header (`Tw3HeaderComponent`)**
- Navegação circular entre páginas com setas (anterior/próxima) mostrando o nome da próxima rota.
- Botões de **Temas**, **Volume** e **Idiomas** com ícones do jogo.
- Menu lateral e soundboard em *drawer* no mobile.

**Easter egg 🔥**
- Clique no logo para lançar o sinal **Igni**: chuva de partículas de fogo (`tsparticles`), brilho vermelho/dourado em tela cheia e SFX.

**Áudio**
- Trilha: *Kaer Morhen*, *Silver For Monsters...*, *... Steel For Humans*, *The Fields of Ard Skellig* e *Drink Up, There's More!*.

**O que ainda falta neste tema**
- [ ] Polir responsividade dos diálogos e do mapa em telas muito pequenas.
- [ ] Conteúdo final para as rotas internas com visual 100% Witcher (cards, formulários, projetos).
- [ ] Revisar traduções e textos alternativos (acessibilidade) dos novos assets.
- [ ] Remover `console.log` de debug (ex.: coordenadas do mapa).

---

### 🔮 Temas planejados

Os arquivos de estilo base já existem (vazios) e os nomes estão previstos em `models/themes.ts`:

| Jogo | Status | Observação |
|------|--------|------------|
| Red Dead Redemption 2 | 📝 Planejado | Estilo "Velho Oeste", menu inspirado no jogo. |
| The Legend of Zelda | 📝 Planejado | Ainda decidindo entre *BOTW* e *TOTK*. |
| Persona 3 | 🤔 Em dúvida | Pode virar *Persona 5*. |
| Elden Ring | 🤔 Em dúvida | Pode virar *Dark Souls*. |
| Hollow Knight | 📝 Planejado | |
| Undertale | 📝 Planejado | |

---

## 📄 Páginas

| Rota | Página | Descrição |
|------|--------|-----------|
| `/home` | Home | Apresentação com efeito de digitação (*typed.js*) e cards de navegação. **Nos temas Minecraft e Witcher 3, vira o menu do jogo** (`HomeWrapperComponent` escolhe o componente conforme o tema). |
| `/about-me` | Sobre mim | Texto de apresentação, foto, links sociais e galeria de fotos com **diálogo de tela cheia**. |
| `/projects` | Projetos | Cards de projetos com imagem, descrição, *hard skills* (chips com ícones SVG), overlay de hover e links. |
| `/contact-me` | Contato | Formulário reativo com validação progressiva (os campos aparecem conforme os anteriores são preenchidos), envio por **EmailJS**, e alternativas rápidas (copiar e-mail/telefone com snackbar). |
| `**` | 404 | Página "não encontrada" com botão para voltar à home. |

### 💼 Projetos exibidos

- **Katana Dynasty** — Angular, SCSS, TypeScript, Rest API.
- **To-Do-List** — HTML, CSS, TypeScript (projeto final de curso, POO).
- **Caldeirão da Bruxa** — HTML, CSS (Bootstrap).

---

## ⚙️ Funcionalidades gerais

- 🌐 **Internacionalização** (pt-BR e en-US) com `@ngx-translate`, detectando o idioma do navegador e salvando a preferência.
- 🎵 **Sistema de áudio próprio** (`AudioService`) com **Web Audio API**: playlists, SFX, volumes separados (música/SFX) persistidos, pausar/retomar, próxima/anterior e progresso.
- 🎚️ **Soundboard**: painel flutuante no desktop (temas de jogo sem soundboard próprio) e *drawer* no mobile.
- 📱 **Responsivo**: ponto de quebra mobile em `820px` (`ResponsiveService`), com menu lateral e bottom sheets para temas e idiomas.
- ⏳ **Tela de loading** global entre navegações, integrada com as animações das páginas.
- 🎞️ **Animações** do Angular Animations (fade, translate, stagger em listas, altura dinâmica nos inputs).
- 🔔 **Snackbars personalizados** para feedback (troca de tema/idioma, cópia de contato, envio de e-mail).
- 🏷️ **Título da aba dinâmico** conforme rota e idioma.
- ♿ Textos alternativos traduzidos nas imagens e `aria-label` nos botões.
- 💾 Persistência de tema, idioma e volumes no `localStorage`.

---

## 🛠️ Tecnologias

| Categoria | Tecnologias |
|-----------|-------------|
| **Framework** | Angular 19 (standalone components, novo *control flow* `@if`/`@for`/`@switch`, signals) |
| **Linguagem** | TypeScript 5.6 |
| **Estilo** | SCSS, Angular Material 19 (Material 3 theming) |
| **i18n** | `@ngx-translate/core` + `http-loader` |
| **3D / Gráficos** | three.js |
| **Partículas** | tsParticles (`@tsparticles/angular`) |
| **Mapas** | Leaflet |
| **Animações de texto** | typed.js |
| **E-mail** | emailjs-com |
| **Reatividade** | RxJS |
| **Testes** | Jasmine + Karma |

---

## 🗂️ Arquitetura e estrutura de pastas

```
src/
├── app/
│   ├── config/                    # Configuração do ngx-translate
│   ├── logo-effects/              # Logo dinâmico + easter eggs por tema
│   │   └── effects/Games/         # Minecraft (TNT) e The Witcher 3 (Igni)
│   ├── models/                    # Interfaces e dados (temas, músicas, SFX, projetos, fotos)
│   ├── pages/
│   │   ├── home/                  # home-wrapper + home padrão (intro-section, navigation-cards)
│   │   ├── about-me/              # first-half, second-half, photos-footer
│   │   ├── projects/              # project-card, overlay-projects
│   │   ├── contact-me/            # form + aside
│   │   └── page-not-found/
│   ├── services/                  # audio, theme, language, loading, responsive, menus mobile
│   ├── shared/
│   │   ├── animations/            # Triggers reutilizáveis
│   │   └── components/            # header, mobile-menu, soundboard, loading, snackbar, social-links
│   └── themes/
│       ├── colors/                # Estilos dos temas de cores (light, dark, cosmic)
│       ├── games/
│       │   ├── pages/             # Homes: minecraft-home, tw3-home (+ diálogos)
│       │   ├── shared/components/ # Headers e diálogos de cada jogo
│       │   └── styles/            # SCSS de cada tema + paletas + cursores
│       └── styles-variables/
├── assets/                        # Imagens, fontes, sons, ícones, i18n (pt-BR.json / en-US.json)
├── reset.scss
└── styles.scss                    # Importa todos os temas
```

### 🧠 Como a troca de tema funciona

1. `ThemeService` guarda o tema atual em um `BehaviorSubject` e salva no `localStorage`.
2. Ao trocar, ele adiciona a classe `nome-do-tema-theme` no `<body>` (ex.: `body.minecraft-theme`) e remove as dos outros temas.
3. Cada arquivo `_theme-*.scss` escreve seus estilos dentro de `body.<tema>-theme` e chama `mat.theme(...)` com sua paleta.
4. `AppComponent` renderiza o **header** do tema via `NgComponentOutlet` (`themeService.getHeaderComponent()`).
5. `HomeWrapperComponent` escolhe a **home** do tema também via `NgComponentOutlet`.
6. `LogoEffectsComponent` carrega o logo e o easter egg do tema atual.

---

## 🧩 Serviços

| Serviço | Responsabilidade |
|---------|------------------|
| `ThemeService` | Tema atual, listas de temas, troca de tema, escolha do header, snackbar de feedback. |
| `AudioService` | Web Audio API: SFX, playlists, volumes, progresso, play/pause/next/prev. |
| `LanguageService` | Idiomas suportados, idioma salvo/detectado e troca de idioma. |
| `LoadingService` | Estado global de loading durante navegações. |
| `ResponsiveService` | Observable `isMobile$` (≤ 820px) com `debounce`. |
| `MobileNavMenuService` / `MobileSoundboardMenuService` | Controle dos *drawers* mobile (menu e soundboard). |

---

## 🚀 Como rodar o projeto

**Pré-requisitos:** Node.js `^18.19`, `^20.11` ou `>=22` e npm.

```bash
# 1. Clonar o repositório
git clone https://github.com/oFelpex/WebDevPortfolio.git
cd WebDevPortfolio

# 2. Instalar as dependências
npm install

# 3. Rodar em desenvolvimento
npm start        # ou: ng serve
# Acesse http://localhost:4200/

# 4. Build de produção
npm run build

# 5. Testes unitários
npm test
```

### 📜 Scripts disponíveis

| Script | Descrição |
|--------|-----------|
| `npm start` | Servidor de desenvolvimento. |
| `npm run build` | Build de produção em `dist/web-dev-portfolio`. |
| `npm run watch` | Build em modo *watch* (development). |
| `npm test` | Testes com Karma + Jasmine. |

---

## ➕ Como criar um novo tema de jogo

1. **Registrar o tema** em `src/app/models/themes.ts` (descomente/adicione em `gamesOptions`).
2. **Criar a paleta** em `themes/games/styles/angular-colors-and-fonts/_theme-<jogo>-colors.scss` (com `ng generate @angular/material:theme-color`) e declarar as fontes com `@font-face`.
3. **Criar o estilo** `themes/games/styles/_theme-<jogo>.scss` com `body.<jogo>-theme { ... }` e `@include mat.theme(...)`; importar em `src/styles.scss`.
4. **Criar o header** em `themes/games/shared/components/<jogo>/` e registrá-lo no `getHeaderComponent()` do `ThemeService`.
5. **Criar a home** em `themes/games/pages/<jogo>/` e registrá-la no `switch` do `HomeWrapperComponent`.
6. **Criar o easter egg** em `logo-effects/effects/Games/<Jogo>/` e adicioná-lo no `LogoEffectsComponent` (`playEffect` e `@switch`).
7. **Adicionar áudio** em `models/musics.ts` e `models/sfxs.ts` (clique, hover, easter egg e playlist).
8. **Adicionar assets** (logo, fundos, botões, cursor, fontes, sons) em `src/assets/themes/games/<jogo>/`.
9. **Traduzir** as chaves novas em `assets/i18n/pt-BR.json` e `en-US.json`.
10. Se o tema tiver soundboard próprio, **excluí-lo da condição** em `app.component.html` (hoje, Minecraft e Witcher 3 já são excluídos do soundboard flutuante).

---

## 🗺️ Roadmap

### ✅ Concluído
- [x] Estrutura base com Angular 19 e componentes standalone
- [x] Páginas Home, Sobre mim, Projetos, Contato e 404
- [x] Temas de cores: Light, Dark e Cosmic
- [x] Internacionalização pt-BR / en-US
- [x] Sistema de áudio, playlists e soundboard
- [x] Tema **Minecraft** completo (home 3D, header, diálogos, TNT)
- [x] Formulário de contato com EmailJS
- [x] Layout responsivo com menus mobile

### 🚧 Em andamento
- [ ] Tema **The Witcher 3** (home, mapa, cartas, Igni — faltam acabamentos e as páginas internas)

### 🔜 Próximos passos
- [ ] Novos temas de jogos (RDR2, Zelda, Persona, Elden Ring, Hollow Knight, Undertale)
- [ ] Escrever testes reais (os `.spec.ts` atuais são apenas os gerados pelo CLI e alguns imports precisam ser corrigidos)
- [ ] Mover chaves/IDs do EmailJS para variáveis de ambiente
- [ ] Migrar `emailjs-com` (descontinuado) para `@emailjs/browser`
- [ ] Revisar *change detection* (signals / `OnPush`) e reduzir `interval` de polling nos players
- [ ] Lazy loading de rotas e dos temas pesados (three.js, Leaflet, tsParticles) para reduzir o bundle inicial
- [ ] Otimizar imagens e áudios (carregar sob demanda)
- [ ] Acessibilidade: navegação por teclado nos menus customizados e contraste dos temas
- [ ] Seção de *hard skills* / experiências e mais projetos
- [ ] Mais idiomas

---

## ⚖️ Aviso legal

Este é um projeto **sem fins lucrativos**, feito para estudo e portfólio. Todos os nomes, marcas, logos, músicas, imagens e demais materiais de **Minecraft** (Mojang Studios / Microsoft) e de **The Witcher 3** (CD PROJEKT RED) pertencem aos seus respectivos donos. Este projeto não é afiliado, patrocinado ou endossado por eles.

---

## 👨‍💻 Autor

**Felipe Costa — Felpex**
Estudante de programação, focado em **Front-end (Angular + TypeScript)** e com o objetivo de atuar também em **desenvolvimento de jogos (C# e C++)**.

- 💼 [LinkedIn](https://www.linkedin.com/in/felpex/)
- 🐙 [GitHub](https://github.com/oFelpex/)
- 🐦 [X / Twitter](https://x.com/Felpex_br)
- 💬 [WhatsApp](https://whatsa.me/5584987095902)

---

<p align="center">Feito com 💜, Angular e muita nostalgia de videogame.</p>
