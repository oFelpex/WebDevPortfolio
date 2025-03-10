import { Component, OnInit } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import Typed from 'typed.js';

@Component({
  selector: 'app-intro-section',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './intro-section.component.html',
  styleUrl: './intro-section.component.scss',
})
export class IntroSectionComponent implements OnInit {
  ngOnInit(): void {
    new Typed('.auto-type', {
      strings: [
        'Front End Developer^2500',
        'Web Developer^2500',
        'student^4000',
      ],
      typeSpeed: 150,
      backSpeed: 30,
      loop: true,
    });
  }
}
