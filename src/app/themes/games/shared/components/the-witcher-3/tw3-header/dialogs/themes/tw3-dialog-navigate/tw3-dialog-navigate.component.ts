import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { AudioService } from '../../../../../../../../../services/audio-service/audio.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../../../../../../services/language-service/language.service';

interface FastTravel {
  id: string;
  title: {
    'en-US': string;
    'pt-BR': string;
  };
  description: {
    'en-US': string;
    'pt-BR': string;
  };
  coords: [number, number]; // [Y, X]
}
interface OtherIcons {
  id: string;
  url: string;
  description: {
    'en-US': string;
    'pt-BR': string;
  };
  coords: [number, number]; // [Y, X]
}

@Component({
  selector: 'app-tw3-dialog-navigate',
  imports: [TranslateModule],
  templateUrl: './tw3-dialog-navigate.component.html',
  styleUrl: './tw3-dialog-navigate.component.scss',
})
export class Tw3DialogNavigateComponent implements AfterViewInit, OnDestroy {
  private audioService: AudioService;
  private languageService: LanguageService;

  private router: Router;
  private dialog: MatDialog;

  private resizeObserver?: ResizeObserver;
  private map!: L.Map;
  private fastTravelPoints: FastTravel[] = [
    {
      id: 'home',
      title: { 'en-US': 'Home page', 'pt-BR': 'Página inicial' },
      description: {
        'en-US': "You're already here!",
        'pt-BR': 'Você já está aqui!',
      },
      coords: [585, 675], // [Y, X]
    },
    {
      id: 'contact-me',
      title: { 'en-US': 'Contacts', 'pt-BR': 'Contatos' },
      description: {
        'en-US': 'Get in touch with me.',
        'pt-BR': 'Entre em contato comigo.',
      },
      coords: [480, 475],
    },
    {
      id: 'projects',
      title: { 'en-US': 'My projects', 'pt-BR': 'Meus projetos' },
      description: {
        'en-US': 'Check out all my projects.',
        'pt-BR': 'Conheça todos os meus projetos.',
      },
      coords: [355, 640],
    },
    {
      id: 'about-me',
      title: { 'en-US': 'About me', 'pt-BR': 'Sobre mim' },
      description: {
        'en-US': 'I’ll tell you a little about myself.',
        'pt-BR': 'Falo um pouco sobre minha pessoa.',
      },
      coords: [420, 750],
    },
  ];

  public someOtherIcons: OtherIcons[] = [
    {
      id: 'mission',
      url: '../../../../../../../../assets/themes/games/the witcher 3/buttons/icons/map/tw3-mission-icon.webp',
      description: {
        'en-US': 'Play this wonderful game.',
        'pt-BR': 'Jogar este jogo maravilhoso.',
      },
      coords: [355, 525], // [Y, X]
    },
    {
      id: 'abandoned-site',
      url: '../../../../../../../../assets/themes/games/the witcher 3/buttons/icons/map/tw3-abandoned-site-icon.webp',
      description: {
        'en-US': 'Abandoned Site',
        'pt-BR': 'Local Abandonado',
      },
      coords: [440, 1065], // [Y, X]
    },
    {
      id: 'armourer',
      url: '../../../../../../../../assets/themes/games/the witcher 3/buttons/icons/map/tw3-armourer-icon.webp',
      description: {
        'en-US': 'Journeyman Armorer',
        'pt-BR': 'Armeiro Qualificado',
      },
      coords: [155, 855], // [Y, X]
    },
    {
      id: 'bandit-camp',
      url: '../../../../../../../../assets/themes/games/the witcher 3/buttons/icons/map/tw3-bandit-camp-icon.webp',
      description: {
        'en-US': 'Bandit Camp',
        'pt-BR': 'Acampamento de Bandidos',
      },
      coords: [110, 425], // [Y, X]
    },
    {
      id: 'hidden',
      url: '../../../../../../../../assets/themes/games/the witcher 3/buttons/icons/map/tw3-hidden-icon.webp',
      description: { 'en-US': 'Hidden Treasure', 'pt-BR': 'Tesouro Escondido' },
      coords: [525, 855], // [Y, X]
    },
    {
      id: 'monster-den',
      url: '../../../../../../../../assets/themes/games/the witcher 3/buttons/icons/map/tw3-monster-den-icon.webp',
      description: { 'en-US': 'Monster Den', 'pt-BR': 'Covil dos Monstros' },
      coords: [525, 260], // [Y, X]
    },
    {
      id: 'roach',
      url: '../../../../../../../../assets/themes/games/the witcher 3/buttons/icons/map/tw3-roach-icon.webp',
      description: { 'en-US': 'Roach', 'pt-BR': 'Carpeado' },
      coords: [585, 675], // [Y, X]
    },
  ];

  constructor() {
    this.audioService = inject(AudioService);
    this.languageService = inject(LanguageService);
    this.router = inject(Router);
    this.dialog = inject(MatDialog);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private get currentLang(): string {
    return this.languageService.getCurrentLanguage();
  }

  private initMap(): void {
    const width = 1447;
    const height = 850;
    const bounds: L.LatLngBoundsExpression = [
      [0, 0],
      [-height, width],
    ];

    this.map = L.map('map', {
      crs: L.CRS.Simple,
      doubleClickZoom: false,
      zoom: 0.25,
      minZoom: 0,
      maxZoom: 1,
      zoomSnap: 0.25,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
    });
    this.map.fitBounds(bounds);

    const imageUrl =
      '../../../../../../../../assets/themes/games/the witcher 3/backgrounds/tw3-map.webp';
    L.imageOverlay(imageUrl, bounds).addTo(this.map);

    this.addMarkers();

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      console.log(e.latlng.lat.toFixed(1), e.latlng.lng.toFixed(1));
    });

    const mapEl = document.getElementById('map')!;
    this.resizeObserver = new ResizeObserver(() => {
      this.map.invalidateSize();
      this.applyCoverFit(width, height);
    });
    this.resizeObserver.observe(mapEl);
  }

  private addMarkers(): void {
    this.fastTravelPoints.forEach((FastTravelPoints) => {
      const langKey = this.currentLang as 'en-US' | 'pt-BR';
      const title =
        FastTravelPoints.title[langKey] || FastTravelPoints.title['en-US'];
      const description =
        FastTravelPoints.description[langKey] ||
        FastTravelPoints.description['pt-BR'];

      const fastTravelIcon = L.divIcon({
        className: 'tw3-custom-marker-wrapper',
        html: `
        <div class="tw3-marker-content">
          <img 
            src="../../../../../../../../assets/themes/games/the witcher 3/buttons/icons/map/tw3-fast-travel-icon.webp" 
            class="tw3-marker-icon" 
            alt="${FastTravelPoints.title}"
          />
          <span class="tw3-marker-label">${title}</span>
        </div>
      `,
        iconSize: [27, 34],
        iconAnchor: [12, 41],
      });

      const fastTravelMarker = L.marker(FastTravelPoints.coords, {
        icon: fastTravelIcon,
        autoPanOnFocus: false,
      }).addTo(this.map);

      fastTravelMarker.bindTooltip(description, {
        direction: 'right',
        offset: [25, -10],
        className: 'tw3-marker-tooltip',
      });

      fastTravelMarker.on('click', () => {
        this.onFastTravelPointSelected(FastTravelPoints);
        this.dialog.closeAll();
      });
    });

    this.someOtherIcons.forEach((otherIconPoints) => {
      const otherIcon = L.divIcon({
        className: 'tw3-custom-marker-wrapper',
        html: `
        <div class="tw3-marker-content">
          <img 
            src="${otherIconPoints.url}" 
            class="tw3-marker-icon" 
            alt="${otherIconPoints.description}"
          />
        </div>
      `,
        iconSize: [27, 34],
        iconAnchor: [12, 41],
      });

      const otherIconMarker = L.marker(otherIconPoints.coords, {
        icon: otherIcon,
        autoPanOnFocus: false,
      }).addTo(this.map);

      const langKey = this.currentLang as 'en-US' | 'pt-BR';
      const description =
        otherIconPoints.description[langKey] ||
        otherIconPoints.description['en-US'];

      otherIconMarker.bindTooltip(description, {
        direction: 'right',
        offset: [25, -10],
        className: 'tw3-marker-tooltip',
      });
    });
  }

  private applyCoverFit(imgWidth: number, imgHeight: number): void {
    const container = this.map.getContainer();
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    if (cw === 0 || ch === 0) return;

    const scale = Math.max(cw / imgWidth, ch / imgHeight);
    const zoom = Math.log2(scale);

    const bounds: L.LatLngBoundsExpression = [
      [0, 0],
      [-imgHeight, imgWidth],
    ];

    this.map.setMaxBounds(bounds);
    this.map.setMinZoom(zoom);
    this.map.setView([-imgHeight / 2, imgWidth / 2], zoom);
  }

  private onFastTravelPointSelected(FastTrackPoints: FastTravel): void {
    this.playClickSound();
    this.router.navigate(['', FastTrackPoints.id]);
  }

  public playClickSound() {
    this.audioService.playClickSound('The Witcher 3');
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    if (this.map) {
      this.map.remove();
    }
  }
}
