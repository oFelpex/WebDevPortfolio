import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { IntroSectionComponent } from './intro-section/intro-section.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, IntroSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
