import { Component } from '@angular/core';

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
export class MinecraftEffectComponent {
  particlesContainer!: Container;
  id = 'tnt-explosion';

  configs: RecursivePartial<IOptions> = {
    name: 'TNT Explosion',
    fullScreen: {
      enable: true,
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
        duration: 0.01,
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
      destroy: {
        bounds: {
          top: 0,
        },
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
                speed: 0.7,
                sync: false,
                startValue: 'max',
                destroy: 'min',
              },
            },
            shape: {
              type: 'square',
            },
            size: {
              value: 2,
              animation: {
                enable: false,
              },
            },
            life: {
              count: 1,
              duration: {
                value: {
                  min: 1,
                  max: 4,
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
      life: {
        duration: { value: 0.01 },
        count: 1,
      },
      rotate: {
        path: true,
      },
      shape: {
        type: 'square',
      },
      size: {
        value: 1,
      },
      // move: {
      //   enable: true,
      //   gravity: {
      //     acceleration: 15,
      //     enable: true,
      //     inverse: true,
      //     maxSpeed: 100,
      //   },
      //   speed: {
      //     min: 10,
      //     max: 20,
      //   },
      //   outModes: {
      //     default: 'destroy',
      //     top: 'none',
      //   },
      // },
    },
  };

  async loadParticles() {
    await loadFull(tsParticles);

    let options: RecursivePartial<IOptions> = this.configs;
    await tsParticles.load({ id: this.id, options });
  }

  public particlesLoaded(container: Container): void {
    this.particlesContainer = container;
    console.log(container);
  }
}
