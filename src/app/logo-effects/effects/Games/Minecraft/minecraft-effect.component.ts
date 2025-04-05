import { Component, OnInit } from '@angular/core';

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
export class MinecraftEffectComponent implements OnInit {
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
        duration: { value: 0.01 },
        count: 1,
      },
      size: {
        value: 2, //CHANGE TO: 0 WHEN AND ANIMATION OF TNT FALLING
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
  }

  public explodeTnt(): void {
    setTimeout(() => {
      this.loadParticles();
    }, 5000);
  }

  async loadParticles(): Promise<void> {
    let options: RecursivePartial<IOptions> = this.configs;
    await tsParticles.load({ id: this.id, options });
  }

  public particlesLoaded(container: Container): void {
    this.particlesContainer = container;
  }
}
