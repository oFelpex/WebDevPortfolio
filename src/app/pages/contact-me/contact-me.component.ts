import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { ContactMeFormComponent } from './contact-me-form/contact-me-form.component';

@Component({
  selector: 'app-contact-me',
  imports: [HeaderComponent, ContactMeFormComponent],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss',
})
export class ContactMeComponent {}
