import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audioContext: AudioContext;
  private sounds: { [key: string]: AudioBuffer } = {};
  private musicGainNode: GainNode;
  private sfxGainNode: GainNode;
  private currentMusicSource: AudioBufferSourceNode | null = null;
  private currentMusicName: string | null = null;
  private currentMusicComposer: string | undefined;
  private musicStartTime: number = 0;
  private musicDuration: number = 0;

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

  public playSound(
    audioName: string,
    type: 'music' | 'sfx' = 'sfx',
    composer?: string | undefined
  ): void {
    const audioBuffer = this.sounds[audioName];

    if (audioBuffer) {
      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;

      const destination =
        type === 'music' ? this.musicGainNode : this.sfxGainNode;
      source.connect(destination);
      source.start(0);

      if (type === 'music') {
        this.currentMusicSource = source;
        this.currentMusicName = audioName;
        this.currentMusicComposer = composer;
        this.musicStartTime = this.audioContext.currentTime;
        this.musicDuration = audioBuffer.duration;

        // (Opcional) Listener para saber quando acabou
        source.onended = () => {
          this.currentMusicSource = null;
          this.currentMusicName = null;
          this.currentMusicComposer = undefined;
          this.musicStartTime = 0;
          this.musicDuration = 0;
        };
      }
    }
  }

  public playClickSound(themeName: string) {
    let audioName = themeName + '-clickSound';
    this.playSound(audioName);
  }

  public getMusicProgress(): number {
    if (!this.currentMusicSource || this.musicDuration === 0) return 0;

    const elapsed = this.audioContext.currentTime - this.musicStartTime;
    return Math.min(elapsed / this.musicDuration, 1);
  }

  public getCurrentMusicName(): string | null {
    return this.currentMusicName;
  }
  public getCurrentMusicComposer(): string | undefined {
    return this.currentMusicComposer;
  }

  public getMusicDuration(): number {
    return this.musicDuration;
  }

  public getElapsedTime(): number {
    return this.audioContext.currentTime - this.musicStartTime;
  }
}
