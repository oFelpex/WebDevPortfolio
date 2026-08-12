import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-tw3-home-effects',
  imports: [],
  templateUrl: './tw3-home-effects.component.html',
  styleUrl: './tw3-home-effects.component.scss',
})
export class Tw3HomeEffectsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('rendererCanvas', { static: true })
  private canvasRef!: ElementRef<HTMLCanvasElement>;

  public scene = new THREE.Scene();
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animationFrameId!: number;

  private fogParticles: THREE.Mesh[] = [];

  ngAfterViewInit(): void {
    this.initThree();
    this.create2DFog();
    this.animate();
  }

  private initThree(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    this.camera.position.z = 500;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  private create2DFog(): void {
    const textureLoader = new THREE.TextureLoader();

    const fogUrl =
      '../../../../../../../assets/themes/games/the witcher 3/backgrounds/tw3-fog-texture.png';

    textureLoader.load(fogUrl, (fogTexture) => {
      const fogGeo = new THREE.PlaneGeometry(512, 512);

      const fogMaterial = new THREE.MeshLambertMaterial({
        map: fogTexture,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
      });

      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(0, 0, 1);
      this.scene.add(light);

      const ambientLight = new THREE.AmbientLight(0x555555);
      this.scene.add(ambientLight);

      for (let i = 0; i < 15; i++) {
        const particle = new THREE.Mesh(fogGeo, fogMaterial);

        particle.position.set(
          (Math.random() - 0.5) * 800, // X
          (Math.random() - 1.1) * 400 - 100, // Y
          100 + Math.random() * 200, // Z
        );

        particle.rotation.z = Math.random() * Math.PI * 2;

        this.fogParticles.push(particle);
        this.scene.add(particle);
      }
    });
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    this.fogParticles.forEach((particle, index) => {
      const speed = ((index % 3) + 1) * 0.15;
      particle.position.x += speed;

      if (particle.position.x > 600) {
        particle.position.x = -600;
      }
    });

    this.renderer.render(this.scene, this.camera);
  };

  @HostListener('window:resize')
  onWindowResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.renderer.dispose();
  }
}
