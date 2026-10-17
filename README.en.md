# 🎮 Felpex — Web Dev Portfolio

Personal portfolio of **Felipe Costa (Felpex)**, built with **Angular 19 + TypeScript** and fully **themed**: besides the traditional color themes (Light, Dark and Cosmic), the site has **video game–inspired themes**, where the *Home* page is recreated as the **main menu of the referenced game**, complete with music, sound effects, animations and easter eggs.

> A study project and showcase: Angular front-end, animations, audio, WebGL (three.js), particles, interactive maps and internationalization.

**Current version:** `1.4.6`

🇧🇷 [Leia em português](./README.md)

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Themes](#-themes)
  - [Color themes](#-color-themes-done)
  - [Minecraft](#-minecraft--done)
  - [The Witcher 3](#-the-witcher-3--in-progress)
  - [Planned themes](#-planned-themes)
- [Pages](#-pages)
- [General features](#-general-features)
- [Tech stack](#-tech-stack)
- [Architecture and folder structure](#-architecture-and-folder-structure)
- [Services](#-services)
- [Running the project](#-running-the-project)
- [Creating a new game theme](#-creating-a-new-game-theme)
- [Roadmap](#-roadmap)
- [Legal notice](#-legal-notice)
- [Author](#-author)

---

## 🌟 Overview

The site works like a regular portfolio (Home, About me, Projects and Contact), but users can switch the **theme** at any time. Each theme changes:

- 🎨 **Color palette** (generated with `ng generate @angular/material:theme-color` and applied via `mat.theme`);
- 🔤 **Typography** (each game's own fonts);
- 🧭 **Header/navigation** (a different component per theme);
- 🏠 **Home page** (in game themes, it becomes the game's start menu);
- 🔊 **Audio** (soundtrack, click and hover SFX);
- ✨ **Easter egg** when clicking the logo;
- 🖱️ **Visual details** (buttons, cards, dialogs, cursor, backgrounds).

The selected theme and language are saved in `localStorage`, so your choice persists between visits.

---

## 🎨 Themes

### 🌈 Color themes (done)

| Theme | Description |
|-------|-------------|
| **Light** | Default light theme, using Angular Material's `azure` and `blue` palettes. |
| **Dark** | Dark blue-gray tones (`#222831`, `#393E46`) with cyan/blue accents. |
| **Cosmic** | Deep purple tones (`#2A004E`, `#500073`) with cream text, "space" look. |

Clicking the active theme again switches back to the default (Light) and shows a snackbar.

---

### ⛏️ Minecraft — ✅ Done

Theme inspired by the **Minecraft 1.20** start menu.

**Home (`MinecraftHomeComponent`)**
- 🌄 **3D panoramic skybox** (three.js) slowly rotating in the background, using the 6 faces of the game's panorama.
- 🟩 **Menu with Minecraft-style buttons**: *About me*, *Projects*, *Contact me*, *Quit game*, *Options*, plus side buttons for language and soundboard.
- 💬 **Random phrases** next to the logo (the famous *splash texts*), translated into pt-BR and en-US.
- 📋 Version text and copyright at the bottom.
- 📱 Responsive mobile layout.

**Header (`MinecraftHeaderComponent`)**
- Navigation bar with a block texture.
- Cascading menus: *Explore* (routes) and *Settings* (themes, languages, soundboard).
- Side menu and soundboard drawers on mobile.

**Dialogs**
- Theme options (games and colors) with expansion panels and radio buttons.
- Language selection.
- Soundboard with music controls and SFX/music volume.
- All with Minecraft "pixel art" style buttons and borders.

**Easter egg 💣**
- Click the logo to **light a TNT**: the block falls, flashes white and explodes with **particles** (`tsparticles`), along with activation and explosion sounds.

**Audio**
- Soundtrack: *Aria Math*, *Mice on Venus*, *Subwoofer Lullaby*, *Moog City* (C418) and *Pigstep* (Lena Raine).

---

### 🐺 The Witcher 3 — 🚧 In progress

Theme inspired by the start menu and UI of **The Witcher 3: Wild Hunt**.

**Home (`Tw3HomeComponent`)**
- 🌫️ **three.js effects**: animated 2D fog, a campfire with pulsing light, glow, flames and sparks as particles with custom shaders. The fire position adapts when the window is resized.
- 📜 **Side menu** in Witcher style: *Navigate*, *Options*, *Soundboard* and *Quit game*, with decorated corners and hover animation.
- 🏷️ **Expansion badges** for *Hearts of Stone* and *Blood and Wine*.
- 🖱️ **Custom cursor** on the home page.
- ©️ Copyright link.

**Home dialogs**
- 🗺️ **Navigate**: an **interactive map** (Leaflet) with in-game icons. *Fast travel points* take you to the site's routes (*home*, *about-me*, *projects*, *contact-me*), and there are decorative icons (quest, monster den, armorer, etc.) with translated tooltips. A game-style HUD legend is included.
- ⚙️ **Options**: submenu navigation (game/color themes, volume, languages), with level/XP bar, weight and money as HUD elements.
- 🃏 **Soundboard / Music Player**: songs are **Gwent cards**. Selecting a card makes it **fly to the player** with a *FLIP* animation, and the music plays with a progress bar, composer name and controls (previous, play/pause, next).

**Header (`Tw3HeaderComponent`)**
- Circular page navigation with arrows (previous/next) showing the next route's name.
- **Themes**, **Volume** and **Languages** buttons with game icons.
- Side menu and soundboard drawers on mobile.

**Easter egg 🔥**
- Click the logo to cast the **Igni** sign: a rain of fire particles (`tsparticles`), a full-screen red/gold glow and SFX.

**Audio**
- Soundtrack: *Kaer Morhen*, *Silver For Monsters...*, *... Steel For Humans*, *The Fields of Ard Skellig* and *Drink Up, There's More!*.

**Still missing in this theme**
- [ ] Polish dialog and map responsiveness on very small screens.
- [ ] Final content for inner routes with a 100% Witcher look (cards, forms, projects).
- [ ] Review translations and alt texts (accessibility) for the new assets.
- [ ] Remove debug `console.log` calls (e.g. map coordinates).

---

### 🔮 Planned themes

The base style files already exist (empty) and the names are reserved in `models/themes.ts`:

| Game | Status | Notes |
|------|--------|-------|
| Red Dead Redemption 2 | 📝 Planned | "Wild West" style, menu inspired by the game. |
| The Legend of Zelda | 📝 Planned | Still deciding between *BOTW* and *TOTK*. |
| Persona 3 | 🤔 Undecided | Might become *Persona 5*. |
| Elden Ring | 🤔 Undecided | Might become *Dark Souls*. |
| Hollow Knight | 📝 Planned | |
| Undertale | 📝 Planned | |

---

## 📄 Pages

| Route | Page | Description |
|-------|------|-------------|
| `/home` | Home | Introduction with a typing effect (*typed.js*) and navigation cards. **In the Minecraft and Witcher 3 themes it becomes the game menu** (`HomeWrapperComponent` picks the component based on the theme). |
| `/about-me` | About me | Introduction text, photo, social links and a photo gallery with a **full-screen dialog**. |
| `/projects` | Projects | Project cards with image, description, *hard skills* (chips with SVG icons), hover overlay and links. |
| `/contact-me` | Contact | Reactive form with progressive validation (fields appear as the previous ones are filled), sending via **EmailJS**, and quick alternatives (copy email/phone with snackbar). |
| `**` | 404 | "Not found" page with a button back to home. |

### 💼 Showcased projects

- **Katana Dynasty** — Angular, SCSS, TypeScript, Rest API.
- **To-Do-List** — HTML, CSS, TypeScript (course final project, OOP).
- **Caldeirão da Bruxa** — HTML, CSS (Bootstrap).

---

## ⚙️ General features

- 🌐 **Internationalization** (pt-BR and en-US) with `@ngx-translate`, detecting the browser language and saving the preference.
- 🎵 **Custom audio system** (`AudioService`) built on the **Web Audio API**: playlists, SFX, separate (music/SFX) persisted volumes, pause/resume, next/previous and progress.
- 🎚️ **Soundboard**: floating panel on desktop (game themes without their own soundboard) and a drawer on mobile.
- 📱 **Responsive**: mobile breakpoint at `820px` (`ResponsiveService`), with a side menu and bottom sheets for themes and languages.
- ⏳ **Global loading screen** between navigations, integrated with page animations.
- 🎞️ **Angular Animations** (fade, translate, list stagger, dynamic input height).
- 🔔 **Custom snackbars** for feedback (theme/language change, contact copy, email sending).
- 🏷️ **Dynamic tab title** based on route and language.
- ♿ Translated alt texts on images and `aria-label` on buttons.
- 💾 Theme, language and volume persistence in `localStorage`.

---

## 🛠️ Tech stack

| Category | Technologies |
|----------|--------------|
| **Framework** | Angular 19 (standalone components, new `@if`/`@for`/`@switch` control flow, signals) |
| **Language** | TypeScript 5.6 |
| **Styling** | SCSS, Angular Material 19 (Material 3 theming) |
| **i18n** | `@ngx-translate/core` + `http-loader` |
| **3D / Graphics** | three.js |
| **Particles** | tsParticles (`@tsparticles/angular`) |
| **Maps** | Leaflet |
| **Text animation** | typed.js |
| **Email** | emailjs-com |
| **Reactivity** | RxJS |
| **Testing** | Jasmine + Karma |

---

## 🗂️ Architecture and folder structure

```
src/
├── app/
│   ├── config/                    # ngx-translate configuration
│   ├── logo-effects/              # Dynamic logo + per-theme easter eggs
│   │   └── effects/Games/         # Minecraft (TNT) and The Witcher 3 (Igni)
│   ├── models/                    # Interfaces and data (themes, musics, SFX, projects, photos)
│   ├── pages/
│   │   ├── home/                  # home-wrapper + default home (intro-section, navigation-cards)
│   │   ├── about-me/              # first-half, second-half, photos-footer
│   │   ├── projects/              # project-card, overlay-projects
│   │   ├── contact-me/            # form + aside
│   │   └── page-not-found/
│   ├── services/                  # audio, theme, language, loading, responsive, mobile menus
│   ├── shared/
│   │   ├── animations/            # Reusable triggers
│   │   └── components/            # header, mobile-menu, soundboard, loading, snackbar, social-links
│   └── themes/
│       ├── colors/                # Color theme styles (light, dark, cosmic)
│       ├── games/
│       │   ├── pages/             # Homes: minecraft-home, tw3-home (+ dialogs)
│       │   ├── shared/components/ # Headers and dialogs for each game
│       │   └── styles/            # Each theme's SCSS + palettes + cursors
│       └── styles-variables/
├── assets/                        # Images, fonts, sounds, icons, i18n (pt-BR.json / en-US.json)
├── reset.scss
└── styles.scss                    # Imports all themes
```

### 🧠 How theme switching works

1. `ThemeService` keeps the current theme in a `BehaviorSubject` and saves it to `localStorage`.
2. On change, it adds the class `theme-name-theme` to `<body>` (e.g. `body.minecraft-theme`) and removes the other themes' classes.
3. Each `_theme-*.scss` file writes its styles inside `body.<theme>-theme` and calls `mat.theme(...)` with its palette.
4. `AppComponent` renders the theme's **header** via `NgComponentOutlet` (`themeService.getHeaderComponent()`).
5. `HomeWrapperComponent` picks the theme's **home** also via `NgComponentOutlet`.
6. `LogoEffectsComponent` loads the logo and easter egg for the current theme.

---

## 🧩 Services

| Service | Responsibility |
|---------|----------------|
| `ThemeService` | Current theme, theme lists, theme switching, header selection, feedback snackbar. |
| `AudioService` | Web Audio API: SFX, playlists, volumes, progress, play/pause/next/prev. |
| `LanguageService` | Supported languages, saved/detected language and language switching. |
| `LoadingService` | Global loading state during navigations. |
| `ResponsiveService` | `isMobile$` observable (≤ 820px) with debounce. |
| `MobileNavMenuService` / `MobileSoundboardMenuService` | Control of the mobile drawers (menu and soundboard). |

---

## 🚀 Running the project

**Prerequisites:** Node.js `^18.19`, `^20.11` or `>=22`, and npm.

```bash
# 1. Clone the repository
git clone https://github.com/oFelpex/WebDevPortfolio.git
cd WebDevPortfolio

# 2. Install dependencies
npm install

# 3. Run in development
npm start        # or: ng serve
# Open http://localhost:4200/

# 4. Production build
npm run build

# 5. Unit tests
npm test
```

### 📜 Available scripts

| Script | Description |
|--------|-------------|
| `npm start` | Development server. |
| `npm run build` | Production build in `dist/web-dev-portfolio`. |
| `npm run watch` | Build in watch mode (development). |
| `npm test` | Tests with Karma + Jasmine. |

---

## ➕ Creating a new game theme

1. **Register the theme** in `src/app/models/themes.ts` (uncomment/add it in `gamesOptions`).
2. **Create the palette** in `themes/games/styles/angular-colors-and-fonts/_theme-<game>-colors.scss` (with `ng generate @angular/material:theme-color`) and declare the fonts with `@font-face`.
3. **Create the style** `themes/games/styles/_theme-<game>.scss` with `body.<game>-theme { ... }` and `@include mat.theme(...)`; import it in `src/styles.scss`.
4. **Create the header** in `themes/games/shared/components/<game>/` and register it in `ThemeService.getHeaderComponent()`.
5. **Create the home** in `themes/games/pages/<game>/` and register it in the `switch` of `HomeWrapperComponent`.
6. **Create the easter egg** in `logo-effects/effects/Games/<Game>/` and add it to `LogoEffectsComponent` (`playEffect` and `@switch`).
7. **Add audio** in `models/musics.ts` and `models/sfxs.ts` (click, hover, easter egg and playlist).
8. **Add assets** (logo, backgrounds, buttons, cursor, fonts, sounds) in `src/assets/themes/games/<game>/`.
9. **Translate** the new keys in `assets/i18n/pt-BR.json` and `en-US.json`.
10. If the theme has its own soundboard, **exclude it from the condition** in `app.component.html` (Minecraft and Witcher 3 are already excluded from the floating soundboard).

---

## 🗺️ Roadmap

### ✅ Done
- [x] Base structure with Angular 19 and standalone components
- [x] Home, About me, Projects, Contact and 404 pages
- [x] Color themes: Light, Dark and Cosmic
- [x] pt-BR / en-US internationalization
- [x] Audio system, playlists and soundboard
- [x] Complete **Minecraft** theme (3D home, header, dialogs, TNT)
- [x] Contact form with EmailJS
- [x] Responsive layout with mobile menus

### 🚧 In progress
- [ ] **The Witcher 3** theme (home, map, cards, Igni — finishing touches and inner pages still missing)

### 🔜 Next steps
- [ ] New game themes (RDR2, Zelda, Persona, Elden Ring, Hollow Knight, Undertale)
- [ ] Write real tests (current `.spec.ts` files are just the CLI-generated ones, and some imports need fixing)
- [ ] Move EmailJS keys/IDs to environment variables
- [ ] Migrate `emailjs-com` (deprecated) to `@emailjs/browser`
- [ ] Review change detection (signals / `OnPush`) and reduce `interval` polling in the players
- [ ] Lazy loading of routes and heavy themes (three.js, Leaflet, tsParticles) to shrink the initial bundle
- [ ] Optimize images and audio (load on demand)
- [ ] Accessibility: keyboard navigation in custom menus and theme contrast
- [ ] *Hard skills* / experience section and more projects
- [ ] More languages

---

## ⚖️ Legal notice

This is a **non-profit** project made for study and portfolio purposes. All names, brands, logos, music, images and other materials from **Minecraft** (Mojang Studios / Microsoft) and **The Witcher 3** (CD PROJEKT RED) belong to their respective owners. This project is not affiliated with, sponsored by or endorsed by them.

---

## 👨‍💻 Author

**Felipe Costa — Felpex**
Programming student focused on **Front-end (Angular + TypeScript)**, aiming to also work in **game development (C# and C++)**.

- 💼 [LinkedIn](https://www.linkedin.com/in/felpex/)
- 🐙 [GitHub](https://github.com/oFelpex/)
- 🐦 [X / Twitter](https://x.com/Felpex_br)
- 💬 [WhatsApp](https://whatsa.me/5584987095902)

---

<p align="center">Made with 💜, Angular and a lot of gaming nostalgia.</p>
