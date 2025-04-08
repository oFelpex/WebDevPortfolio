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
  public CreateTnt: boolean = false;
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
    this.audioService.preloadSound(
      'Minecraft-clickSound',
      'assets/sounds/games/minecraft/sfx/button-click.ogg'
    );
    this.audioService.preloadSound(
      'Minecraft-tnt-activate',
      'assets/sounds/games/minecraft/easter-egg/tnt-activate.ogg'
    );
    this.audioService.preloadSound(
      'Minecraft-tnt-explosion',
      'assets/sounds/games/minecraft/easter-egg/tnt-explosion.ogg'
    );

    await loadFull(tsParticles);

    let options: SingleOrMultiple<RecursivePartial<IOptions>> = this.configs;
    this.particlesContainer = await tsParticles.load({ id: this.id, options });
  }

  ngOnDestroy(): void {
    this.particlesContainer?.destroy();
    this.cancelTntTimeout();
  }

  private startTntTimeout(): void {
    this.CreateTnt = true;

    this.timeOut = setTimeout(() => {
      this.CreateTnt = false;
      this.audioService.playSound('Minecraft-tnt-explosion', 'sfx');
    }, 4100);
  }

  private cancelTntTimeout(): void {
    clearTimeout(this.timeOut);
    this.CreateTnt = false;
  }

  public summonTnt(): void {
    this.cancelTntTimeout();

    setTimeout(() => {
      this.startTntTimeout();
      this.particlesContainer?.refresh();
      this.particlesContainer?.play();
      this.audioService.playSound('Minecraft-tnt-activate', 'sfx');
    });
  }
}
