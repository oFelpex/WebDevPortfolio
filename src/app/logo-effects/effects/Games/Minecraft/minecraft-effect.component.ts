import { Component, OnDestroy, OnInit } from '@angular/core';

import { loadFull } from 'tsparticles';
import {
  tsParticles,
  Container,
  RecursivePartial,
  IOptions,
} from '@tsparticles/engine';
import { NgxParticlesModule } from '@tsparticles/angular';

@Component({
  selector: 'app-minecraft',
  imports: [NgxParticlesModule],
  templateUrl: './minecraft-effect.component.html',
  styleUrl: './minecraft-effect.component.scss',
})
export class MinecraftEffectComponent implements OnInit, OnDestroy {
  particlesContainer!: Container | undefined;
  CreateTnt: boolean = false;
  id: string = 'tnt-explosion';

  configs: RecursivePartial<IOptions> = {
    name: 'TNT Explosion',
    autoPlay: false,
    fullScreen: {
      enable: true,
      zIndex: 10,
    },
    backgroundMask: {
      enable: false,
    },
    emitters: {
      position: {
        x: 50,
        y: 50,
      },
      life: {
        count: 1,
        duration: 0.1,
      },
      rate: {
        delay: 0.1,
        quantity: 1,
      },
      size: {
        width: 0,
        height: 0,
      },
    },
    particles: {
      color: {
        value: '#fff',
      },
      life: {
        duration: { value: 5, sync: true },

        count: 1,
      },

      size: {
        value: 2,
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
  };

  async ngOnInit(): Promise<void> {
    await loadFull(tsParticles);

    let options: RecursivePartial<IOptions> = this.configs;
    this.particlesContainer = await tsParticles.load({ id: this.id, options });
  }

  ngOnDestroy(): void {
    this.particlesContainer?.destroy();
  }

  public explodeTnt(): void {
    this.CreateTnt = true;

    this.particlesContainer?.refresh();
    this.particlesContainer?.play();

    setTimeout(() => {
      this.CreateTnt = false;
    }, 5100);
  }
}
