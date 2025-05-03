import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { Themes } from '../../../../../../../../models/themes';
import { ThemeService } from '../../../../../../../../services/theme-service/theme.service';
import { AudioService } from '../../../../../../../../services/audio-service/audio.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MinecraftDialogsComponent } from '../../minecraft-dialogs.component';

@Component({
  selector: 'app-minecraft-dialog-games',
  imports: [MatListModule, MatButtonModule, FormsModule, MatRadioModule],
  templateUrl: './minecraft-dialog-games.component.html',
  styleUrls: [
    './minecraft-dialog-games.component.scss',
    '../../minecraft-dialog.scss',
  ],
})
export class MinecraftDialogGamesComponent {
  public currentTheme: Themes = { name: 'Minecraft', type: 'Games' };
  public allGamesThemes!: Themes[];

  private audioService: AudioService;
  private themeService: ThemeService;
  private dialogRef: MatDialogRef<MinecraftDialogsComponent>;

  constructor() {
    this.dialogRef = inject(MatDialogRef<MinecraftDialogsComponent>);
    this.themeService = inject(ThemeService);
    this.audioService = inject(AudioService);
  }

  ngOnInit(): void {
    this.allGamesThemes = this.getAllThemes;
  }

  private get getAllThemes(): Themes[] {
    return this.themeService.getGamesNames();
  }
  public changeTheme(theme: Themes) {
    this.dialogRef.close();
    this.themeService.changeTheme(theme);
  }

  public playClickSound() {
    this.audioService.playClickSound('Minecraft');
  }
}
