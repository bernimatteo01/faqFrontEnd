import { Injectable } from '@angular/core';

/**
 * Servizio di autenticazione base.
 * Gestisce lo stato di login admin simulato usando localStorage.
 */
@Injectable({
  providedIn: 'root' // Servizio disponibile globalmente nell'app
})
export class AuthService {

  private loggedInKey = 'loggedIn'; // Chiave usata nel localStorage

  constructor() {}

  /**
   * Metodo per effettuare il login.
   * Verifica username e password e salva lo stato nel localStorage.
   * 
   * @param username - nome utente inserito
   * @param password - password inserita
   * @returns true se le credenziali sono corrette, false altrimenti
   */
  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem(this.loggedInKey, 'true'); // Salva stato di login
      return true;
    }
    return false;
  }

  /**
   * Effettua il logout rimuovendo lo stato dal localStorage.
   */
  logout(): void {
    localStorage.removeItem(this.loggedInKey);
  }

  /**
   * Verifica se l'utente è attualmente loggato.
   * @returns true se lo stato di login è presente e valido
   */
  isLoggedIn(): boolean {
    return localStorage.getItem(this.loggedInKey) === 'true';
  }
}