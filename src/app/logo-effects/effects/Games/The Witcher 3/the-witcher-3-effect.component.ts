import { Component, inject, OnInit } from '@angular/core';
import { AudioService } from '../../../../services/audio-service/audio.service';
import { Musics, TW3Musics } from '../../../../models/musics';

@Component({
  selector: 'app-the-witcher-3',
  imports: [],
  templateUrl: './the-witcher-3-effect.component.html',
  styleUrl: './the-witcher-3-effect.component.scss',
})
export class TheWitcher3EffectComponent implements OnInit {
  private TW3Musics: Musics[] = TW3Musics;
  private audioService: AudioService;

  constructor() {
    this.audioService = inject(AudioService);
  }

  ngOnInit(): void {
    this.audioService.playPlaylist(this.TW3Musics);
  }
}
