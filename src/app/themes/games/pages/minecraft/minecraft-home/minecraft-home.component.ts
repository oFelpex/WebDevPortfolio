import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import * as THREE from 'three';

import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { MinecraftDialogsComponent } from './dialogs/minecraft-dialogs.component';
import { LogoEffectsComponent } from '../../../../../logo-effects/logo-effects.component';
import { AudioService } from '../../../../../services/audio-service/audio.service';
import { ThemeService } from '../../../../../services/theme-service/theme.service';

@Component({
  selector: 'app-minecraft-home',
  imports: [LogoEffectsComponent, RouterModule, MatIconModule, TranslateModule],
  templateUrl: './minecraft-home.component.html',
  styleUrl: './minecraft-home.component.scss',
})
export class MinecraftHomeComponent implements OnInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  public phrase!: string;

  private dialog: MatDialog;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private skybox!: THREE.Mesh;
  private audioService: AudioService;
  private themeService: ThemeService;
  private listOfPhrases: string[] = [
    'ONE',
    'TWO',
    'THREE',
    'FOUR',
    'FIVE',
    'SIX',
    'SEVEN',
    'EIGHT',
    'NINE',
    'TEN',
    'ELEVEN',
  ];

  constructor() {
    this.themeService = inject(ThemeService);
    this.audioService = inject(AudioService);
    this.dialog = inject(MatDialog);
  }

  ngOnInit(): void {
    this.headerSetPosition();

    this.phrase = this.listOfPhrases[this.phraseNumber()];

    this.initScene();
    this.animate();
  }

  ngOnDestroy(): void {
    this.headerRestaurePosition();
  }

  private headerSetPosition() {
    const header = document.getElementById(
      'minecraft-header'
    ) as HTMLHeadingElement;
    if (header) {
      header.style.display = 'none';
      header.style.visibility = 'hidden';
      header.style.height = '0px';
      header.style.minHeight = '0px';
    }
  }
  private headerRestaurePosition() {
    const header = document.getElementById(
      'minecraft-header'
    ) as HTMLHeadingElement;

    if (header) {
      header.style.display = 'block';
      header.style.visibility = 'visible';
      header.style.height = '14vh';
      header.style.minHeight = '60px';
    }
  }

  public openThemesDialog() {
    this.dialog.open(MinecraftDialogsComponent, {
      data: {
        dialogType: 'Themes',
      },
    });
  }
  public openLangsDialog(): void {
    this.dialog.open(MinecraftDialogsComponent, {
      data: {
        dialogType: 'Langs',
      },
    });
  }
  public openSoundboardDialog(): void {
    this.dialog.open(MinecraftDialogsComponent, {
      data: {
        dialogType: 'Soundboard',
      },
    });
  }

  public quitGame(): void {
    this.themeService.changeTheme({ name: 'Light', type: 'Colors' });
  }

  public playClickSound(): void {
    this.audioService.playClickSound('Minecraft');
  }

  private phraseNumber(): number {
    return Math.round(Math.random() * (this.listOfPhrases.length - 1));
  }

  private initScene(): void {
    this.scene = new THREE.Scene();

    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(85, aspect, 0.1, 1000);
    this.camera.position.set(0, 0, 0.1);

    const loader = new THREE.TextureLoader();
    const path = 'assets/themes/games/minecraft/backgrounds/skybox/';

    const materialArray = [
      '1.20_panorama_1.webp', // px
      '1.20_panorama_3.webp', // nx
      '1.20_panorama_5.webp', // py
      '1.20_panorama_4.webp', // ny
      '1.20_panorama_0.webp', // pz
      '1.20_panorama_2.webp', // nz
    ].map((fileName) => {
      const texture = loader.load(path + fileName);
      texture.flipY = false;

      return new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide,
      });
    });

    const skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
    this.skybox = new THREE.Mesh(skyboxGeo, materialArray);
    this.skybox.rotateX(3.32);
    this.scene.add(this.skybox);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  private animate = () => {
    requestAnimationFrame(this.animate);

    this.skybox.rotation.y -= 0.0003;

    this.renderer.render(this.scene, this.camera);
  };
}
