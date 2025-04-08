import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audioContext: AudioContext;
  private sounds: { [key: string]: AudioBuffer } = {};
  private musicGainNode: GainNode;
  private sfxGainNode: GainNode;
  public musicVolume: number = 0.5;
  public sfxVolume: number = 0.5;

  constructor() {
    this.audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();

    this.musicGainNode = this.audioContext.createGain();
    this.musicGainNode.connect(this.audioContext.destination);

    this.sfxGainNode = this.audioContext.createGain();
    this.sfxGainNode.connect(this.audioContext.destination);

    this.initVolumes();
  }

  private initVolumes(): void {
    const music = localStorage.getItem('musicVolume');
    const sfx = localStorage.getItem('sfxVolume');

    if (music) this.setMusicVolume(JSON.parse(music));
    if (sfx) this.setSfxVolume(JSON.parse(sfx));
  }

  public async preloadSound(name: string, url: string): Promise<void> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    this.sounds[name] = audioBuffer;
  }

  public setMusicVolume(value: number): void {
    this.musicGainNode.gain.setValueAtTime(
      value,
      this.audioContext.currentTime
    );
    this.musicVolume = value;
    localStorage.setItem('musicVolume', JSON.stringify(value));
  }

  public setSfxVolume(value: number): void {
    this.sfxGainNode.gain.setValueAtTime(value, this.audioContext.currentTime);
    this.sfxVolume = value;
    localStorage.setItem('sfxVolume', JSON.stringify(value));
  }

  public getMusicVolume(): number {
    return this.musicVolume;
  }
  public getSfxVolume(): number {
    return this.sfxVolume;
  }

  public playSound(audioName: string, type: 'music' | 'sfx' = 'sfx'): void {
    const audioBuffer = this.sounds[audioName];

    if (audioBuffer) {
      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;

      const destination =
        type === 'music' ? this.musicGainNode : this.sfxGainNode;
      source.connect(destination);
      source.start(0);
    }
  }

  public playClickSound(themeName: string) {
    let audioName = themeName + '-clickSound';

    this.playSound(audioName);
  }
}
