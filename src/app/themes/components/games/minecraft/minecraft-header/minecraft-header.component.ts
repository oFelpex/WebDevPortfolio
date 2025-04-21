import { Component, OnInit } from '@angular/core';
import { LogoEffectsComponent } from '../../../../../logo-effects/logo-effects.component';

@Component({
  selector: 'app-minecraft-header',
  imports: [LogoEffectsComponent],
  templateUrl: './minecraft-header.component.html',
  styleUrl: './minecraft-header.component.scss',
})
export class MinecraftHeaderComponent implements OnInit {
  // JUST A REMAINDER: CHANGE TO SOME SIMPLE PHRASES SO I CAN USE THE TRANSLATESERVICE
  private listOfPhrases: string[] = [
    'Indie games are the best!',
    'Trying to be better...',
    'Corn cake is the best!',
    'Also try Terraria!',
    'Also try Undertale!',
    'Dark Souls II is good',
    'Never stop studying!',
    'An elegant phrase!',
    `There's more than one sentence here.`,
    'Be kind',
    'Never forget your friends',
  ];
  public phrase!: string;

  ngOnInit(): void {
    this.phrase =
      this.listOfPhrases[
        Math.round(Math.random() * (this.listOfPhrases.length - 1) + 1)
      ];
  }
}
