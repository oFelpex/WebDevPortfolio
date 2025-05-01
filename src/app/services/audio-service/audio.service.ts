import { Injectable } from '@angular/core';
import { Musics } from '../../models/musics';
import { BehaviorSubject } from 'rxjs';

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

  private pauseTime: number = 0;
  private isPaused: boolean = false;

  private playlist: Musics[] = [];
  private currentIndex: number = 0;

  public musicVolume: number = 0.5;
  public sfxVolume: number = 0.5;

  private showSoundboardSubject = new BehaviorSubject<boolean>(false);
  public showSoundboard$ = this.showSoundboardSubject.asObservable();

  constructor() {
    this.audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();

    this.musicGainNode = this.audioContext.createGain();
    this.musicGainNode.connect(this.audioContext.destination);

    this.sfxGainNode = this.audioContext.createGain();
    this.sfxGainNode.connect(this.audioContext.destination);

    this.initVolumes();
  }

  public toggleSoundboard(): void {
    const current = this.showSoundboardSubject.value;
    this.showSoundboardSubject.next(!current);
  }
  public setShowSoundboard(value: boolean): void {
    this.showSoundboardSubject.next(value);
  }

  private initVolumes(): void {
    const music = localStorage.getItem('musicVolume');
    const sfx = localStorage.getItem('sfxVolume');

    if (music) this.setMusicVolume(JSON.parse(music));
    if (sfx) this.setSfxVolume(JSON.parse(sfx));
  }

  public async preloadSound(name: string, url: string): Promise<void> {
    if (this.sounds[name]) return;
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    this.sounds[name] = audioBuffer;
  }

  public async playPlaylist(playlist: Musics[]) {
    this.playlist = playlist;
    this.currentIndex = 0;

    for (const music of playlist) {
      await this.preloadSound(music.musicName, music.musicURL);
    }

    this.playCurrentTrack();
    this.pauseMusic();
  }

  private playCurrentTrack(resume: boolean = false) {
    this.stopMusic();

    const track = this.playlist[this.currentIndex];
    const buffer = this.sounds[track.musicName];
    if (!buffer) return;

    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.musicGainNode);

    const offset = resume ? this.pauseTime : 0;
    source.start(0, offset);

    this.currentMusicSource = source;
    this.currentMusicName = track.musicName;
    this.currentMusicComposer = track.musicComposer;
    this.musicDuration = buffer.duration;
    this.musicStartTime = this.audioContext.currentTime - offset;
    this.isPaused = false;

    source.onended = () => {
      if (!this.isPaused && this.currentMusicSource === source) {
        this.nextMusic();
      }
    };
  }

  public pauseMusic() {
    if (this.currentMusicSource) {
      this.pauseTime = this.audioContext.currentTime - this.musicStartTime;
      this.currentMusicSource.stop();
      this.isPaused = true;
    }
  }

  public resumeMusic() {
    if (this.isPaused) {
      this.playCurrentTrack(true);
    }
  }

  public stopMusic() {
    if (this.currentMusicSource) {
      this.currentMusicSource.onended = null;
      this.currentMusicSource.stop();
      this.currentMusicSource.disconnect();
      this.currentMusicSource = null;
    }
  }

  public nextMusic() {
    this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
    this.playCurrentTrack();
  }

  public previousMusic() {
    this.currentIndex =
      (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
    this.playCurrentTrack();
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

  public playClickSound(themeName: string) {
    let audioName = themeName + '-clickSound';
    this.playSound(audioName);
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
    }
  }

  public getMusicVolume(): number {
    return this.musicVolume;
  }

  public getSfxVolume(): number {
    return this.sfxVolume;
  }

  public getMusicProgress(): number {
    if (!this.currentMusicSource || this.musicDuration === 0) return 0;

    const elapsed = this.isPaused
      ? this.pauseTime
      : this.audioContext.currentTime - this.musicStartTime;

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
    return this.isPaused
      ? this.pauseTime
      : this.audioContext.currentTime - this.musicStartTime;
  }

  public isPlaying(): boolean {
    return !this.isPaused && this.currentMusicSource !== null;
  }
}
