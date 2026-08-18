import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { AudioService } from '../../../../../../../../../services/audio-service/audio.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

interface FastTravel {
  id: string;
  title: string;
  description: string;
  coords: [number, number]; // [Y, X]
}

@Component({
  selector: 'app-tw3-dialog-navigate',
  imports: [],
  templateUrl: './tw3-dialog-navigate.component.html',
  styleUrl: './tw3-dialog-navigate.component.scss',
})
export class Tw3DialogNavigateComponent implements AfterViewInit, OnDestroy {
  private audioService: AudioService;
  private router: Router;
  private dialog: MatDialog;

  private resizeObserver?: ResizeObserver;
  private map!: L.Map;
  private fastTravelPoints: FastTravel[] = [
    {
      id: 'home',
      title: 'Página inicial',
      description: 'Você já está aqui!',
      coords: [585, 675], // [Y, X]
    },
    {
      id: 'contact-me',
      title: 'Contatos',
      description: 'Entre em contato comigo.',
      coords: [480, 475],
    },
    {
      id: 'projects',
      title: 'Meus projetos',
      description: 'Conheça todos os meus projetos.',
      coords: [355, 640],
    },
    {
      id: 'about-me',
      title: 'Sobre mim',
      description: 'Falo um pouco sobre minha pessoa.',
      coords: [420, 750],
    },
  ];

  constructor() {
    this.audioService = inject(AudioService);
    this.router = inject(Router);
    this.dialog = inject(MatDialog);
  }

  ngAfterViewInit(): void {
    this.initMap();
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
      const fastTravelIcon = L.divIcon({
        className: 'tw3-custom-marker-wrapper',
        html: `
        <div class="tw3-marker-content">
          <img 
            src="../../../../../../../../assets/themes/games/the witcher 3/buttons/icons/map/tw3-fast-travel-icon.webp" 
            class="tw3-marker-icon" 
            alt="${FastTravelPoints.title}"
          />
          <span class="tw3-marker-label">${FastTravelPoints.title}</span>
        </div>
      `,
        iconSize: [27, 34],
        iconAnchor: [12, 41],
      });

      const fastTravelMarker = L.marker(FastTravelPoints.coords, {
        icon: fastTravelIcon,
        autoPanOnFocus: false,
      }).addTo(this.map);

      fastTravelMarker.bindTooltip(FastTravelPoints.description, {
        direction: 'right',
        offset: [25, -10], // [X, Y]
        className: 'tw3-marker-tooltip',
      });

      fastTravelMarker.on('click', () => {
        this.onFastTravelPointSelected(FastTravelPoints);
        this.dialog.closeAll();
      });
    });

    const missionIcon = L.divIcon({
      className: 'tw3-custom-marker-wrapper',
      html: `
        <div class="tw3-marker-content">
          <img 
            src="../../../../../../../../assets/themes/games/the witcher 3/buttons/icons/map/tw3-mission-icon.webp" 
            class="tw3-marker-icon" 
            alt="Icone de missão"
          />
        </div>
      `,
      iconSize: [27, 34],
      iconAnchor: [12, 41],
    });

    const missionMarker = L.marker(
      [355, 525], // [Y, X]
      {
        icon: missionIcon,
        autoPanOnFocus: false,
      },
    ).addTo(this.map);

    missionMarker.bindTooltip('TURN AND FACE THE STRANGE', {
      direction: 'right',
      offset: [25, -20], // [X, Y] for some reason
      className: 'tw3-marker-tooltip',
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
