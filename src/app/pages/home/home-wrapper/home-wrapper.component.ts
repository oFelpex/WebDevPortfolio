import { Component, inject, OnDestroy, OnInit, Type } from '@angular/core';
import { ThemeService } from '../../../services/theme-service/theme.service';
import { Subscription } from 'rxjs';
import { Themes } from '../../../models/themes';
import { HomeComponent } from '../default/home.component';
import { MinecraftHomeComponent } from '../../../themes/pages/minecraft/minecraft-home/minecraft-home.component';
import { Tw3HomeComponent } from '../../../themes/pages/the-witcher-3/tw3-home/tw3-home.component';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-home-wrapper',
  imports: [NgComponentOutlet],
  templateUrl: './home-wrapper.component.html',
  styleUrl: './home-wrapper.component.scss',
})
export class HomeWrapperComponent implements OnInit, OnDestroy {
  private themeService: ThemeService;
  private themeSubscription!: Subscription;

  public componentToRender!: Type<any>;

  constructor() {
    this.themeService = inject(ThemeService);
  }

  ngOnInit() {
    this.themeSubscription = this.themeService.actualTheme$.subscribe(
      (theme) => {
        switch (theme.name) {
          case 'The Witcher 3':
            this.componentToRender = Tw3HomeComponent;
            break;
          case 'Minecraft':
            this.componentToRender = MinecraftHomeComponent;
            break;
          default:
            this.componentToRender = HomeComponent;
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
