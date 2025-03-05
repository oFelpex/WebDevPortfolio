import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactMeComponent } from './pages/contact-me/contact-me.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { ProjectsComponent } from './pages/projects/projects.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contact-me', component: ContactMeComponent },
  { path: 'about-me', component: AboutMeComponent },
  { path: 'projects', component: ProjectsComponent },
];
