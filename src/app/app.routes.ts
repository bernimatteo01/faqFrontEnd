import { Routes } from '@angular/router';
import { FaqListComponent } from './components/faq-list/faq-list.component';
import { FaqFormComponent } from './components/faq-form/faq-form.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

/**
 * Definizione delle rotte principali dell'applicazione.
 * Ogni rotta specifica un percorso e il componente da visualizzare.
 * Alcune rotte sono protette da AuthGuard (solo admin loggato).
 */
export const appRoutes: Routes = [
  // Homepage → lista pubblica delle FAQ
  { path: '', component: FaqListComponent },

  // Pagina di login per lo staff
  { path: 'login', component: LoginComponent },

  // Aggiunta di una nuova FAQ (protetta da AuthGuard)
  { path: 'faq/add', component: FaqFormComponent, canActivate: [AuthGuard] },

  // Modifica di una FAQ esistente (protetta da AuthGuard)
  { path: 'faq/edit/:id', component: FaqFormComponent, canActivate: [AuthGuard] },

  // Qualsiasi altra rotta sconosciuta → redirect alla home
  { path: '**', redirectTo: '' }
];