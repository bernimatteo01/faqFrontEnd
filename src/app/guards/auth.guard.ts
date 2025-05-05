import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * AuthGuard è un servizio che implementa una protezione (guardia) sulle rotte.
 * Impedisce l'accesso a rotte riservate se l'utente non è autenticato.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private authService: AuthService, // Servizio per controllare lo stato di login
    private router: Router            // Per reindirizzare l'utente se non autenticato
  ) {}

  /**
   * Metodo che determina se una rotta può essere attivata.
   * Se l'utente è loggato → consente l'accesso.
   * Altrimenti → reindirizza al login e blocca l'accesso.
   * 
   * @returns true se l'utente è autenticato, false altrimenti
   */
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Reindirizza al login
      return false;
    }
  }
}