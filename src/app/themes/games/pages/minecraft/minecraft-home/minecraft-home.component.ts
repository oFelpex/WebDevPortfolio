import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { LogoEffectsComponent } from '../../../../../logo-effects/logo-effects.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-minecraft-home',
  imports: [LogoEffectsComponent, RouterModule, TranslateModule],
  templateUrl: './minecraft-home.component.html',
  styleUrl: './minecraft-home.component.scss',
})
export class MinecraftHomeComponent implements OnInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  public phrase!: string;
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

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private skybox!: THREE.Mesh;

  ngOnInit(): void {
    const header = document.getElementById(
      'minecraft-header'
    ) as HTMLHeadingElement;
    header.style.display = 'none';
    header.style.visibility = 'hidden';
    header.style.height = '0px';
    header.style.minHeight = '0px';

    this.phrase = this.listOfPhrases[this.phraseNumber()];

    this.initScene();
    this.animate();
  }

  ngOnDestroy(): void {
    const header = document.getElementById(
      'minecraft-header'
    ) as HTMLHeadingElement;

    header.style.display = 'block';
    header.style.visibility = 'visible';
    header.style.height = '14vh';
    header.style.minHeight = '60px';
  }

  private phraseNumber(): number {
    return Math.round(Math.random() * (this.listOfPhrases.length - 1));
  }

  private initScene(): void {
    this.scene = new THREE.Scene();

    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(85, aspect, 0.1, 1000);
    this.camera.position.set(0, 0, 0.1); // ligeiramente afastado do centro

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
      texture.flipY = false; // previne espelhamento vertical
      // texture.wrapS = THREE.RepeatWrapping;
      // texture.repeat.x = -1;

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
