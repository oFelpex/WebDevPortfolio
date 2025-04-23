import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { loadFull } from 'tsparticles';
import {
  tsParticles,
  Container,
  RecursivePartial,
  IOptions,
  SingleOrMultiple,
} from '@tsparticles/engine';

import { NgxParticlesModule } from '@tsparticles/angular';
import { AudioService } from '../../../../services/audio-service/audio.service';
import { minecraftMusics, Musics } from '../../../../models/musics';
import { minecraftSFX, SFXs } from '../../../../models/sfxs';

@Component({
  selector: 'app-minecraft',
  imports: [NgxParticlesModule],
  templateUrl: './minecraft-effect.component.html',
  styleUrl: './minecraft-effect.component.scss',
})
export class MinecraftEffectComponent implements OnInit, OnDestroy {
  private particlesContainer!: Container | undefined;
  private audioService: AudioService;
  private timeOut: any;
  private minecraftMusics: Musics[] = minecraftMusics;
  private minecraftSFX: SFXs[] = minecraftSFX;
  private tntsContainer = document.createElement('div') as HTMLDivElement;
  private tntFront = document.createElement('img') as HTMLImageElement;
  private tntTop = document.createElement('img') as HTMLImageElement;
  private tntBottom = document.createElement('img') as HTMLImageElement;

  public id: string = 'tnt-explosion';

  constructor() {
    this.audioService = inject(AudioService);
  }

  private configs: SingleOrMultiple<RecursivePartial<IOptions>> = {
    name: 'TNT Explosion',
    autoPlay: false,
    fullScreen: {
      enable: true,
    },
    backgroundMask: {
      enable: false,
    },
    particles: {
      opacity: {
        value: 0,
      },
      life: {
        duration: { value: 4, sync: true },
        count: 1,
      },
      size: {
        value: 20,
      },
      shape: {
        type: 'square',
      },
      destroy: {
        mode: 'split',
        split: {
          count: 1,
          factor: {
            value: 0.333333,
          },
          rate: {
            value: 100,
          },
          particles: {
            stroke: {
              width: 10,
            },
            color: {
              value: ['#fff', '#dedede', '#bfbfbf', '#adadad'],
            },
            opacity: {
              value: {
                min: 0.1,
                max: 1,
              },
              animation: {
                enable: true,
                speed: 0.1,
                sync: false,
                startValue: 'max',
                destroy: 'min',
              },
            },
            shape: {
              type: 'square',
            },
            size: {
              value: { min: 1, max: 8 },
              animation: {
                enable: true,
                speed: 10,
                sync: false,
                startValue: 'min',
                destroy: 'max',
              },
            },
            life: {
              count: 1,
              duration: {
                value: {
                  min: 1,
                  max: 3.5,
                },
              },
            },
            move: {
              enable: true,
              gravity: {
                enable: true,
                acceleration: 3,
                inverse: false,
              },
              decay: 0.05,
              speed: {
                min: 5,
                max: 40,
              },
              direction: 'outside',
              outModes: 'destroy',
            },
          },
        },
      },
    },
    manualParticles: [
      {
        position: {
          x: 50,
          y: 70,
        },
      },
    ],
  };

  async ngOnInit(): Promise<void> {
    this.tntsContainer.className = 'tnts-container';

    this.tntFront.className = 'tnt-front';
    this.tntFront.src =
      '../../../../../assets/themes/games/minecraft/logo/animation/tnt-front.webp';

    this.tntTop.className = 'tnt-top';
    this.tntTop.src =
      '../../../../../assets/themes/games/minecraft/logo/animation/tnt-top.webp';

    this.tntBottom.className = 'tnt-bottom';
    this.tntBottom.src =
      '../../../../../assets/themes/games/minecraft/logo/animation/tnt-bottom.webp';

    this.tntsContainer.append(this.tntFront, this.tntTop, this.tntBottom);

    for (let SFX of this.minecraftSFX) {
      this.audioService.preloadSound(SFX.SFXName, SFX.SFXURL);
    }

    this.audioService.playPlaylist(this.minecraftMusics);

    await loadFull(tsParticles);
  }

  ngOnDestroy(): void {
    this.particlesContainer?.destroy();
    this.cancelTntTimeout();
  }

  private startTntTimeout(): void {
    this.timeOut = setTimeout(() => {
      this.audioService.playSound('Minecraft-tnt-explosion', 'sfx');
      let allTnts = document.getElementsByClassName('tnts-container');
      Array.from(allTnts).forEach((el) => el.remove());
    }, 4100);
  }

  private cancelTntTimeout(): void {
    clearTimeout(this.timeOut);
  }

  async summonTnt(): Promise<void> {
    this.cancelTntTimeout();

    let options: SingleOrMultiple<RecursivePartial<IOptions>> = this.configs;
    this.particlesContainer = await tsParticles.load({ id: this.id, options });

    setTimeout(() => {
      this.startTntTimeout();
      this.particlesContainer?.refresh();
      this.particlesContainer?.play();
      document.body.append(this.tntsContainer);
      this.audioService.playSound('Minecraft-tnt-activate', 'sfx');
    });
  }
}
