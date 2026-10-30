import { computed, inject, Injectable, NgZone, signal } from '@angular/core';
import { Musics } from '../../models/musics';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private ngZone = inject(NgZone);

  private audioContext: AudioContext;
  private sounds: { [key: string]: AudioBuffer } = {};
  private musicGainNode: GainNode;
  private sfxGainNode: GainNode;

  private currentMusicSource: AudioBufferSourceNode | null = null;

  private musicStartTime: number = 0;
  private musicDuration: number = 0;
  private pauseTime: number = 0;

  private playlist!: Musics[];
  private currentIndex: number = 0;

  public musicVolume: number = 0.5;
  public sfxVolume: number = 0.5;

  private _currentMusic = signal<Musics | null>(null);
  private _isPaused = signal(false);
  private _isCurrentTrackFromPlaylist = signal(false);
  private _progress = signal(0);

  public readonly currentMusic = this._currentMusic.asReadonly();
  public readonly currentMusicName = computed(
    () => this._currentMusic()?.musicName ?? null,
  );
  public readonly currentMusicComposer = computed(
    () => this._currentMusic()?.musicComposer,
  );

  public readonly progress = this._progress.asReadonly();
  public readonly isPaused = this._isPaused.asReadonly();

  public readonly isPlaying = computed(
    () => this._currentMusic() !== null && !this._isPaused(),
  );
  public readonly isPlayingFromThePlaylist = computed(
    () => this._isCurrentTrackFromPlaylist() && this._currentMusic() !== null,
  );

  private progressTimer: ReturnType<typeof setInterval> | null = null;

  private showSoundboardSubject = new BehaviorSubject<boolean>(false);
  public showSoundboard$ = this.showSoundboardSubject.asObservable();

  constructor() {
    this.audioContext = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();

    this.musicGainNode = this.audioContext.createGain();
    this.musicGainNode.connect(this.audioContext.destination);

    this.sfxGainNode = this.audioContext.createGain();
    this.sfxGainNode.connect(this.audioContext.destination);

    this.initVolumes();
  }

  private startProgressLoop(): void {
    this.stopProgressLoop();

    this.ngZone.runOutsideAngular(() => {
      this.progressTimer = setInterval(() => {
        this._progress.set(this.getMusicProgress());
      }, 100);
    });
  }

  private stopProgressLoop(): void {
    if (this.progressTimer !== null) {
      clearInterval(this.progressTimer);
      this.progressTimer = null;
    }
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

  public async playPlaylist(playlist: Musics[]): Promise<void> {
    await this.loadPlaylist(playlist);
    this.playFromIndex(0);
  }

  public async loadPlaylist(playlist: Musics[]): Promise<void> {
    const isSamePlaylist =
      this.playlist && this.playlist[0]?.gameName === playlist[0]?.gameName;

    if (isSamePlaylist) return;

    this.unloadCurrentPlaylist();

    this.playlist = playlist;
    this.currentIndex = 0;

    for (const music of playlist) {
      await this.preloadSound(music.musicName, music.musicURL);
    }
  }

  public unloadCurrentPlaylist(): void {
    this.stopSound();

    if (this.playlist) {
      for (const music of this.playlist) {
        delete this.sounds[music.musicName];
      }
    }

    this.playlist = undefined as any;
    this.currentIndex = 0;
  }

  public unloadOneSound(music: Musics): void {
    this.stopSound();
    delete this.sounds[music.musicName];
  }

  public playFromIndex(index: number): void {
    if (!this.playlist || index < 0 || index >= this.playlist.length) return;

    this.currentIndex = index;
    this.playCurrentTrack();
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
    this.musicDuration = buffer.duration;
    this.musicStartTime = this.audioContext.currentTime - offset;

    this._currentMusic.set(track);
    this._isCurrentTrackFromPlaylist.set(true);
    this._isPaused.set(false);
    this.startProgressLoop();

    source.onended = () => {
      if (!this._isPaused() && this.currentMusicSource === source) {
        this.nextMusic();
      }
    };
  }

  public pauseMusic() {
    if (this.currentMusicSource) {
      this.pauseTime = this.audioContext.currentTime - this.musicStartTime;
      this._isPaused.set(true);
      this.currentMusicSource.stop();
      this.stopProgressLoop();
      this._progress.set(this.getMusicProgress());
    }
  }

  public resumeMusic() {
    if (this._isPaused() && this._isCurrentTrackFromPlaylist()) {
      this.playCurrentTrack(true);
    }
  }

  public stopMusic() {
    this.stopProgressLoop();
    if (this.currentMusicSource) {
      this.currentMusicSource.onended = null;
      this.currentMusicSource.stop();
      this.currentMusicSource.disconnect();
      this.currentMusicSource = null;
    }
  }

  public stopSound() {
    this.stopMusic();
    this.musicDuration = 0;
    this.pauseTime = 0;

    this._currentMusic.set(null);
    this._isPaused.set(false);
    this._isCurrentTrackFromPlaylist.set(false);
    this._progress.set(0);
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
      this.audioContext.currentTime,
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
    composer?: string | undefined,
  ): AudioBufferSourceNode | null {
    const audioBuffer = this.sounds[audioName];
    if (!audioBuffer) return null;

    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;

    const destination =
      type === 'music' ? this.musicGainNode : this.sfxGainNode;
    source.connect(destination);
    source.start(0);

    // Retorna o som para quem precisar interrompê-lo antes do fim
    return source;
  }

  public playSingleTrack(music: Musics, loop: boolean = false): void {
    this.stopMusic();

    const buffer = this.sounds[music.musicName];
    if (!buffer) return;

    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = loop;

    source.connect(this.musicGainNode);
    source.start(0);

    this.currentMusicSource = source;
    this.musicDuration = buffer.duration;
    this.musicStartTime = this.audioContext.currentTime;

    this._currentMusic.set(music);
    this._isCurrentTrackFromPlaylist.set(false);
    this._isPaused.set(false);
    this.startProgressLoop();

    source.onended = () => {
      if (
        !this._isPaused() &&
        this.currentMusicSource === source &&
        !source.loop
      ) {
        this.currentMusicSource = null;
        this.stopProgressLoop();
        this._currentMusic.set(null);
        this._progress.set(0);
      }
    };
  }

  public getMusicVolume(): number {
    return this.musicVolume;
  }

  public getSfxVolume(): number {
    return this.sfxVolume;
  }

  public getMusicProgress(): number {
    if (!this.currentMusicSource || this.musicDuration === 0) return 0;

    const elapsed = this._isPaused()
      ? this.pauseTime
      : this.audioContext.currentTime - this.musicStartTime;

    if (this.currentMusicSource.loop) {
      return (elapsed % this.musicDuration) / this.musicDuration;
    }

    return Math.min(elapsed / this.musicDuration, 1);
  }

  // ---------- old API (compatibility) ----------
  public hasCurrentTrack(): boolean {
    return this._currentMusic() !== null;
  }
  public getCurrentMusic(): Musics | null {
    return this._currentMusic();
  }
  public getCurrentMusicName(): string | null {
    return this.currentMusicName();
  }
  public getCurrentMusicComposer(): string | undefined {
    return this.currentMusicComposer();
  }

  public getMusicDuration(): number {
    return this.musicDuration;
  }

  public getElapsedTime(): number {
    return this._isPaused()
      ? this.pauseTime
      : this.audioContext.currentTime - this.musicStartTime;
  }
}
