import { Component, inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { AudioService } from '../../../../../../services/audio-service/audio.service';
import { ThemeService } from '../../../../../../services/theme-service/theme.service';
import { Themes } from '../../../../../../models/themes';
import { Subscription } from 'rxjs';
import { MinecraftDialogLangsComponent } from './langs/minecraft-dialog-langs.component';
import { MinecraftDialogGamesComponent } from './themes/games/minecraft-dialog-games.component';
import { MinecraftDialogColorsComponent } from './themes/colors/minecraft-dialog-colors.component';
import { MinecraftDialogSoundboardComponent } from './soundboard/minecraft-dialog-soundboard.component';

@Component({
  selector: 'app-minecraft-dialogs',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatExpansionModule,
    MinecraftDialogLangsComponent,
    MinecraftDialogGamesComponent,
    MinecraftDialogColorsComponent,
    MinecraftDialogSoundboardComponent,
  ],
  templateUrl: './minecraft-dialogs.component.html',
  styleUrl: './minecraft-dialogs.component.scss',
})
export class MinecraftDialogsComponent {
  private audioService: AudioService;
  private themeService: ThemeService;
  private themeServiceSubscription!: Subscription;
  public actualTheme!: Themes;
  public data = inject(MAT_DIALOG_DATA);

  constructor() {
    this.audioService = inject(AudioService);
    this.themeService = inject(ThemeService);
  }

  ngOnInit(): void {
    this.themeServiceSubscription = this.themeService.actualTheme$.subscribe(
      (theme) => {
        this.actualTheme = theme;
      }
    );
  }

  ngOnDestroy(): void {
    this.themeServiceSubscription.unsubscribe();
  }

  public playClickSound(): void {
    this.audioService.playClickSound('Minecraft');
  }
}
