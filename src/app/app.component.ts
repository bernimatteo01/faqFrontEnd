import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

/**
 * Componente principale dell'app Angular (root).
 * Gestisce layout generale e funzionalità di autenticazione visiva (login/logout).
 */
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterOutlet, RouterModule]
})
export class AppComponent {

  constructor(
    private authService: AuthService, // Servizio di autenticazione
    private router: Router            // Per controllare e cambiare la rotta attuale
  ) { }

  /**
   * Verifica se l'utente è loggato, per mostrare o nascondere bottoni.
   * @returns true se autenticato, false altrimenti
   */
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  /**
   * Esegue il logout e reindirizza l'utente alla homepage.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  /**
   * Verifica se ci si trova nella pagina di login.
   * Utile per nascondere la barra superiore mentre si è nella schermata di login.
   * @returns true se la rotta corrente è /login
   */
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}