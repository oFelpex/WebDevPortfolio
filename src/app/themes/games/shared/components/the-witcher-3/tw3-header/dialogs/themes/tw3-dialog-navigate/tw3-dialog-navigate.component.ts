import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { AudioService } from '../../../../../../../../../services/audio-service/audio.service';

interface FastTravel {
  id: string;
  title: string;
  description: string;
  coords: [number, number]; // [y, x]
}

@Component({
  selector: 'app-tw3-dialog-navigate',
  imports: [],
  templateUrl: './tw3-dialog-navigate.component.html',
  styleUrl: './tw3-dialog-navigate.component.scss',
})
export class Tw3DialogNavigateComponent implements AfterViewInit, OnDestroy {
  private audioService: AudioService;

  private resizeObserver?: ResizeObserver;
  private map!: L.Map;
  private fastTravelPoints: FastTravel[] = [
    {
      id: 'novigrad-port',
      title: 'Porto de Novigrad',
      description: 'Ponto de viagem rápida perto das docas.',
      coords: [420, 1050], // [Y, X]
    },
    {
      id: 'temerian-castle',
      title: 'Castelo/Fortaleza',
      description: 'Área com guarda fortemente armada.',
      coords: [500, 750],
    },
  ];

  constructor() {
    this.audioService = inject(AudioService);
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
      zoom: 0,
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
      console.log(
        `Coordenada clicada: [${e.latlng.lat.toFixed(1)}, ${e.latlng.lng.toFixed(1)}]`,
      );
    });

    const mapEl = document.getElementById('map')!;
    this.resizeObserver = new ResizeObserver(() => {
      this.map.invalidateSize();
      this.applyCoverFit(width, height);
    });
    this.resizeObserver.observe(mapEl);
  }

  private addMarkers(): void {
    this.fastTravelPoints.forEach((FastTrackPoints) => {
      // Cria o popup com o conteúdo do marcador
      const popupContent = `
        <div style="color: #222;">
          <h3 style="margin: 0 0 5px 0;">${FastTrackPoints.title}</h3>
          <p style="margin: 0;">${FastTrackPoints.description}</p>
        </div>
      `;

      const defaultIcon = L.icon({
        iconUrl:
          '../../../../../../../../assets/themes/games/the witcher 3/buttons/icons/tw3-fasttravel-icon.webp',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });
      L.Marker.prototype.options.icon = defaultIcon;

      // Adiciona o marcador no mapa
      const marker = L.marker(FastTrackPoints.coords).addTo(this.map);
      marker.bindPopup(popupContent);

      // Evento de clique opcional para disparar ações no Angular
      marker.on('click', () => {
        this.onFastTravelPointSelected(FastTrackPoints);
      });
    });
  }

  private applyCoverFit(imgWidth: number, imgHeight: number): void {
    const container = this.map.getContainer();
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    if (cw === 0 || ch === 0) return; // ainda não tem tamanho real

    const scale = Math.max(cw / imgWidth, ch / imgHeight);
    const zoom = Math.log2(scale);

    const bounds: L.LatLngBoundsExpression = [
      [0, 0],
      [-imgHeight, imgWidth],
    ];

    this.map.setMaxBounds(bounds);
    this.map.setMinZoom(zoom); // nunca deixa dar zoom out além do "cover"
    this.map.setView([-imgHeight / 2, imgWidth / 2], zoom);
  }

  private onFastTravelPointSelected(FastTrackPoints: FastTravel): void {
    console.log('POI Selecionado:', FastTrackPoints);
    this.playClickSound();
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
