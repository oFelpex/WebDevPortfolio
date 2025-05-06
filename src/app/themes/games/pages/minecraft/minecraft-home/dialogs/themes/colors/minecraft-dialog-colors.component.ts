import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';

import { Themes } from '../../../../../../../../models/themes';
import { AudioService } from '../../../../../../../../services/audio-service/audio.service';
import { ThemeService } from '../../../../../../../../services/theme-service/theme.service';
import { MinecraftDialogsComponent } from '../../minecraft-dialogs.component';

@Component({
  selector: 'app-minecraft-dialog-colors',
  imports: [MatListModule, FormsModule, MatRadioModule],
  templateUrl: './minecraft-dialog-colors.component.html',
  styleUrls: [
    './minecraft-dialog-colors.component.scss',
    '../../minecraft-dialog.scss',
  ],
})
export class MinecraftDialogColorsComponent {
  public currentTheme: Themes = { name: 'Minecraft', type: 'Games' };
  public allColorsThemes!: Themes[];

  private audioService: AudioService;
  private themeService: ThemeService;
  private dialogRef: MatDialogRef<MinecraftDialogsComponent>;

  constructor() {
    this.dialogRef = inject(MatDialogRef<MinecraftDialogsComponent>);
    this.themeService = inject(ThemeService);
    this.audioService = inject(AudioService);
  }

  ngOnInit(): void {
    this.allColorsThemes = this.getAllColorsThemes;
  }

  private get getAllColorsThemes(): Themes[] {
    return this.themeService.getColorsNames();
  }
  public changeTheme(theme: Themes) {
    this.dialogRef.close();
    this.themeService.changeTheme(theme);
  }

  public playClickSound() {
    this.audioService.playClickSound('Minecraft');
  }
}
