import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-undertale-home-navigation',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './undertale-home-navigation.component.html',
  styleUrl: './undertale-home-navigation.component.scss',
})
export class UndertaleHomeNavigationComponent {}
