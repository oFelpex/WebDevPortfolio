import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ContactMeFormComponent } from './contact-me-form/contact-me-form.component';
import { ContactMeAsideComponent } from './contact-me-aside/contact-me-aside.component';

import { TranslateModule } from '@ngx-translate/core';

import { MatDividerModule } from '@angular/material/divider';

import { LoadingService } from '../../services/loading-service/loading.service';

import { fadeIn_opacity_loading } from '../../shared/animations/fade-animations';
import { fadeInDownToUp_loading } from '../../shared/animations/fadeAndTranslate-animations';

@Component({
  selector: 'app-contact-me',
  imports: [
    ContactMeFormComponent,
    TranslateModule,
    ContactMeAsideComponent,
    MatDividerModule,
  ],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss',
  animations: [fadeInDownToUp_loading, fadeIn_opacity_loading],
})
export class ContactMeComponent implements OnInit, OnDestroy {
  private loadingService: LoadingService;
  private loadingSubscription!: Subscription;
  public isLoading!: boolean;

  constructor() {
    this.loadingService = inject(LoadingService);
  }

  ngOnInit() {
    this.loadingSubscription = this.loadingService.loading$.subscribe(
      (loading) => {
        this.isLoading = loading;
      }
    );
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
