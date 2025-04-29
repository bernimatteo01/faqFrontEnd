import { Routes } from '@angular/router';
import { FaqListComponent } from './components/faq-list/faq-list.component';
import { FaqFormComponent } from './components/faq-form/faq-form.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', component: FaqListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'faq/add', component: FaqFormComponent, canActivate: [AuthGuard] },
  { path: 'faq/edit/:id', component: FaqFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
