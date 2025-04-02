import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audioContext: AudioContext;
  private sounds: { [key: string]: AudioBuffer } = {};
  private gainNode: GainNode;

  constructor() {
    this.audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
    this.setVolume(0.1);

    this.preloadSound(
      'Minecraft-clickSound',
      'assets/sounds/games/minecraft/button-click.ogg'
    );
  }

  private async preloadSound(name: string, url: string): Promise<void> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    this.sounds[name] = audioBuffer;
  }

  private setVolume(value: number): void {
    this.gainNode.gain.setValueAtTime(value, this.audioContext.currentTime);
  }

  public playSound(audioName: string): void {
    const audioBuffer = this.sounds[audioName];
    if (audioBuffer) {
      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.gainNode); // Conecta a fonte ao nó de ganho
      source.start(0);
    }
  }

  public playClickSound(themeName: string) {
    let audioName = themeName + '-clickSound';

    this.playSound(audioName);
  }
}
