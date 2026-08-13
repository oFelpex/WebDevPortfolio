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
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animationFrameId!: number;

  private fogParticles: THREE.Mesh[] = [];

  private sparkParticles!: THREE.Points;
  private sparkPositions!: Float32Array;
  private sparkAlphas!: Float32Array;
  private sparkVelocities: THREE.Vector3[] = [];
  private sparkCount = 8;
  private sparkMaxHeight = 380;
  private sparkDispersalX = 2.5;
  private sparkVelocityToGoUp = 2.5;
  private sparkDispersalZ = 1.5;

  private firePosition = new THREE.Vector3(370, -120, 200); // X, Y, Z
  private fireLight!: THREE.PointLight;
  private glowMesh!: THREE.Mesh;

  private flameParticles!: THREE.Points;
  private flamePositions!: Float32Array;
  private flameAlphas!: Float32Array;
  private flameVelocities: THREE.Vector3[] = [];
  private flameCount = 5;
  private flameMaxHeight = 55;
  private flameDispersalX = 0.2;
  private flameVelocityToGoUp = 0.4;
  private flameDispersalZ = 0.2;

  public scene = new THREE.Scene();

  ngAfterViewInit(): void {
    this.initThree();
    this.create2DFog();
    this.createFireAndSparks();
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
          (Math.random() - 0.5) * 800,
          (Math.random() - 1.1) * 400 - 100,
          100 + Math.random() * 200,
        );

        particle.rotation.z = Math.random() * Math.PI * 2;

        this.fogParticles.push(particle);
        this.scene.add(particle);
      }
    });
  }

  private createFlameParticleTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 120, 0, 0.8)');
    gradient.addColorStop(0.6, 'rgba(200, 30, 0, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    return new THREE.CanvasTexture(canvas);
  }

  private createGlowTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d')!;

    const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(255, 120, 0, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 60, 0, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);

    return new THREE.CanvasTexture(canvas);
  }

  private createParticleShaderMaterial(
    colorHex: number,
    pointSize: number,
    texture?: THREE.Texture,
  ): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: texture || null },
        baseColor: { value: new THREE.Color(colorHex) },
        hasTexture: { value: texture ? 1.0 : 0.0 },
      },
      vertexShader: `
        attribute float alpha;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = ${pointSize.toFixed(1)} * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        uniform vec3 baseColor;
        uniform float hasTexture;
        varying float vAlpha;
        void main() {
          vec4 texColor = vec4(1.0);
          if (hasTexture > 0.5) {
            texColor = texture2D(pointTexture, gl_PointCoord);
          }
          gl_FragColor = vec4(baseColor, vAlpha) * texColor;
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }

  private createFireAndSparks(): void {
    this.fireLight = new THREE.PointLight(0xffff6d, 3, 400);
    this.fireLight.position.copy(this.firePosition);
    this.scene.add(this.fireLight);

    const glowGeo = new THREE.PlaneGeometry(120, 120);
    const glowMat = new THREE.MeshBasicMaterial({
      map: this.createGlowTexture(),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.glowMesh = new THREE.Mesh(glowGeo, glowMat);
    this.glowMesh.position.copy(this.firePosition);
    this.glowMesh.position.y += 10;
    this.scene.add(this.glowMesh);

    const sparkGeometry = new THREE.BufferGeometry();
    this.sparkPositions = new Float32Array(this.sparkCount * 3);
    this.sparkAlphas = new Float32Array(this.sparkCount);

    for (let i = 0; i < this.sparkCount; i++) {
      this.sparkPositions[i * 3] =
        this.firePosition.x + (Math.random() - 0.5) * 15;
      this.sparkPositions[i * 3 + 1] =
        this.firePosition.y + Math.random() * 180;
      this.sparkPositions[i * 3 + 2] =
        this.firePosition.z + (Math.random() - 0.5) * 15;

      this.sparkAlphas[i] = 0.8;

      this.sparkVelocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * this.sparkDispersalX,
          Math.random() * 2.5 + this.sparkVelocityToGoUp,
          (Math.random() - 0.5) * this.sparkDispersalZ,
        ),
      );
    }

    sparkGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(this.sparkPositions, 3),
    );
    sparkGeometry.setAttribute(
      'alpha',
      new THREE.BufferAttribute(this.sparkAlphas, 1),
    );

    const sparkMaterial = this.createParticleShaderMaterial(0xff1100, 2.5);
    this.sparkParticles = new THREE.Points(sparkGeometry, sparkMaterial);
    this.scene.add(this.sparkParticles);

    const flameGeometry = new THREE.BufferGeometry();
    this.flamePositions = new Float32Array(this.flameCount * 3);
    this.flameAlphas = new Float32Array(this.flameCount);

    for (let i = 0; i < this.flameCount; i++) {
      this.flamePositions[i * 3] =
        this.firePosition.x + (Math.random() - 0.5) * 10;
      this.flamePositions[i * 3 + 1] = this.firePosition.y + Math.random() * 20;
      this.flamePositions[i * 3 + 2] =
        this.firePosition.z + (Math.random() - 0.5) * 10;

      this.flameAlphas[i] = 0.6;

      this.flameVelocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * this.flameDispersalX,
          Math.random() * 0.4 + this.flameVelocityToGoUp,
          (Math.random() - 0.5) * this.flameDispersalZ,
        ),
      );
    }

    flameGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(this.flamePositions, 3),
    );
    flameGeometry.setAttribute(
      'alpha',
      new THREE.BufferAttribute(this.flameAlphas, 1),
    );

    const flameMaterial = this.createParticleShaderMaterial(
      0xffff6d,
      32.0,
      this.createFlameParticleTexture(),
    );

    this.flameParticles = new THREE.Points(flameGeometry, flameMaterial);
    this.scene.add(this.flameParticles);
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    this.fogParticles.forEach((particle, index) => {
      const speed = ((index % 3) + 1) * 0.1;
      particle.position.x += speed;

      if (particle.position.x > 600) {
        particle.position.x = -600;
      }
    });

    if (this.fireLight) {
      const intensity =
        2.5 + Math.sin(Date.now() * 0.01) * 0.8 + Math.random() * 0.4;
      this.fireLight.intensity = intensity;

      if (this.glowMesh) {
        this.glowMesh.scale.setScalar(
          0.9 + Math.sin(Date.now() * 0.005) * 0.15,
        );
      }
    }

    if (this.flameParticles && this.flameParticles.geometry) {
      const flamePosAttr = this.flameParticles.geometry.getAttribute(
        'position',
      ) as THREE.BufferAttribute;
      const flameAlphaAttr = this.flameParticles.geometry.getAttribute(
        'alpha',
      ) as THREE.BufferAttribute;

      const spawnWidth = 10;
      const maxFlameOpacity = 0.6;

      for (let i = 0; i < this.flameCount; i++) {
        const vel = this.flameVelocities[i];

        this.flamePositions[i * 3] += vel.x;
        this.flamePositions[i * 3 + 1] += vel.y;
        this.flamePositions[i * 3 + 2] += vel.z;

        const currentRelativeY =
          this.flamePositions[i * 3 + 1] - this.firePosition.y;
        const progress = Math.min(
          Math.max(currentRelativeY / this.flameMaxHeight, 0),
          1,
        );

        if (progress > 0.5) {
          const fadeOutFactor = (1.0 - progress) / 0.5;
          this.flameAlphas[i] = maxFlameOpacity * fadeOutFactor;
        } else {
          this.flameAlphas[i] = maxFlameOpacity;
        }

        if (progress >= 1.0) {
          this.flamePositions[i * 3] =
            this.firePosition.x + (Math.random() - 0.5) * spawnWidth;
          this.flamePositions[i * 3 + 1] = this.firePosition.y;
          this.flamePositions[i * 3 + 2] =
            this.firePosition.z + (Math.random() - 0.5) * spawnWidth;

          this.flameAlphas[i] = maxFlameOpacity;

          vel.x = (Math.random() - 0.5) * this.flameDispersalX;
          vel.y = Math.random() * 0.4 + this.flameVelocityToGoUp;
          vel.z = (Math.random() - 0.5) * this.flameDispersalZ;
        }
      }

      flamePosAttr.needsUpdate = true;
      flameAlphaAttr.needsUpdate = true;
    }

    if (this.sparkParticles && this.sparkParticles.geometry) {
      const sparkPosAttr = this.sparkParticles.geometry.getAttribute(
        'position',
      ) as THREE.BufferAttribute;
      const sparkAlphaAttr = this.sparkParticles.geometry.getAttribute(
        'alpha',
      ) as THREE.BufferAttribute;

      const maxSparkOpacity = 0.8;

      for (let i = 0; i < this.sparkCount; i++) {
        const vel = this.sparkVelocities[i];

        if (vel.y < 0.1) {
          vel.x = (Math.random() - 0.5) * this.sparkDispersalX;
          vel.y = Math.random() * 2.5 + this.sparkVelocityToGoUp;
          vel.z = (Math.random() - 0.5) * this.sparkDispersalZ;
        }

        this.sparkPositions[i * 3] += vel.x + (Math.random() - 0.5) * 0.3;
        this.sparkPositions[i * 3 + 1] += vel.y;
        this.sparkPositions[i * 3 + 2] += vel.z;

        vel.y *= 0.98;

        const currentRelativeY =
          this.sparkPositions[i * 3 + 1] - this.firePosition.y;
        const progress = Math.min(
          Math.max(currentRelativeY / this.sparkMaxHeight, 0),
          1,
        );

        if (progress > 0.6) {
          const fadeOutFactor = (1.0 - progress) / 0.4;
          this.sparkAlphas[i] = maxSparkOpacity * fadeOutFactor;
        } else {
          this.sparkAlphas[i] = maxSparkOpacity;
        }

        if (progress >= 1.0 || vel.y < 0.3) {
          this.sparkPositions[i * 3] =
            this.firePosition.x + (Math.random() - 0.5) * 15;
          this.sparkPositions[i * 3 + 1] = this.firePosition.y;
          this.sparkPositions[i * 3 + 2] =
            this.firePosition.z + (Math.random() - 0.5) * 15;

          this.sparkAlphas[i] = maxSparkOpacity;

          vel.x = (Math.random() - 0.5) * this.sparkDispersalX;
          vel.y = Math.random() * 2.5 + this.sparkVelocityToGoUp;
          vel.z = (Math.random() - 0.5) * this.sparkDispersalZ;
        }
      }

      sparkPosAttr.needsUpdate = true;
      sparkAlphaAttr.needsUpdate = true;
    }

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
