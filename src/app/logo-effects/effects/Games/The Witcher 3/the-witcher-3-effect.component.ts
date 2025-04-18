import { Component, inject, OnInit } from '@angular/core';
import { AudioService } from '../../../../services/audio-service/audio.service';
import { Musics, TW3Musics } from '../../../../models/musics';
import { NgxParticlesModule } from '@tsparticles/angular';
import {
  Container,
  IOptions,
  RecursivePartial,
  SingleOrMultiple,
  tsParticles,
} from '@tsparticles/engine';
import { loadFull } from 'tsparticles';
import { SFXs, TW3SFX } from '../../../../models/sfxs';

@Component({
  selector: 'app-the-witcher-3',
  imports: [NgxParticlesModule],
  templateUrl: './the-witcher-3-effect.component.html',
  styleUrl: './the-witcher-3-effect.component.scss',
})
export class TheWitcher3EffectComponent implements OnInit {
  private TW3Musics: Musics[] = TW3Musics;
  private TW3SFX: SFXs[] = TW3SFX;
  private audioService: AudioService;
  private particlesContainer!: Container | undefined;
  private timeOut: any;
  public igniEffect: boolean = false;
  public id: string = 'igni';

  private igniConfigs: SingleOrMultiple<RecursivePartial<IOptions>> = {
    name: 'Igne',
    autoPlay: false,
    fpsLimit: 60,
    fullScreen: {
      enable: true,
    },
    particles: {
      color: {
        value: [
          '#7D0A0A',
          '#A62C2C',
          '#E83F25',
          '#FF9B17',
          '#FABC3F',
          '#E4003A',
        ],
      },
      opacity: {
        value: { min: 0, max: 1 },
        animation: {
          enable: true,
          speed: 4,
          decay: 0,
          delay: { min: 1, max: 2 },
          sync: true,
          startValue: 'max',
          destroy: 'min',
        },
      },
      move: {
        enable: true,
        angle: {
          offset: 0,
          value: 45,
        },
        decay: {
          min: 0.05,
          max: 0.15,
        },
        direction: 'top',
        gravity: {
          acceleration: 1.5 * 9.81,
          enable: true,
          inverse: false,
          maxSpeed: 100,
        },
        outModes: {
          default: 'destroy',
          bottom: 'destroy',
          left: 'destroy',
          right: 'destroy',
          top: 'none',
        },
        speed: {
          min: 100,
          max: 150,
        },
      },
      shadow: {
        enable: true,
        color: {
          value: 'random',
        },
        blur: 25,
        offset: {
          x: 0,
          y: 0,
        },
      },
      shape: {
        close: true,
        fill: true,
        options: {
          polygon: [
            {
              sides: 5,
            },
            {
              sides: 6,
            },
          ],
        },
        type: ['circle', 'polygon'],
      },
      size: {
        value: { min: 1, max: 3 },
      },
      roll: {
        darken: {
          enable: true,
          value: 30,
        },
        enable: true,
        enlighten: {
          enable: true,
          value: 30,
        },
        mode: 'both',
        speed: {
          min: 15,
          max: 25,
        },
      },
      tilt: {
        value: {
          min: 0,
          max: 360,
        },
        animation: {
          enable: true,
          speed: 60,
          decay: 0,
          sync: false,
        },
        direction: 'random',
        enable: true,
      },
    },
    emitters: {
      autoPlay: true,
      fill: true,
      life: {
        duration: 4,
        count: 1,
      },
      rate: {
        quantity: 5,
        delay: 0.05,
      },
      size: 0,
      position: {
        x: 50,
        y: 110,
      },
    },
  };

  constructor() {
    this.audioService = inject(AudioService);
  }

  async ngOnInit(): Promise<void> {
    for (let SFX of this.TW3SFX) {
      this.audioService.preloadSound(SFX.SFXName, SFX.SFXURL);
    }

    this.audioService.playPlaylist(this.TW3Musics);

    await loadFull(tsParticles);
  }

  ngOnDestroy(): void {
    this.particlesContainer?.destroy();
    this.clearIgniTimeOut();
  }

  private startIgniTimeOut(): void {
    this.igniEffect = true;

    this.timeOut = setTimeout(() => {
      this.igniEffect = false;
    }, 6500);
  }

  private clearIgniTimeOut(): void {
    this.igniEffect = false;
    clearTimeout(this.timeOut);
  }

  public async igni(): Promise<void> {
    this.clearIgniTimeOut();

    let options: SingleOrMultiple<RecursivePartial<IOptions>> =
      this.igniConfigs;
    this.particlesContainer = await tsParticles.load({ id: this.id, options });

    setTimeout(() => {
      this.startIgniTimeOut();
      this.audioService.playSound('TW3-igni');
      this.particlesContainer?.refresh();
      this.particlesContainer?.play();
    });
  }
}
