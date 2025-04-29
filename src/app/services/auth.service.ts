import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInKey = 'loggedIn'; // chiave localStorage

  constructor() {}

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem(this.loggedInKey, 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.loggedInKey);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.loggedInKey) === 'true';
  }
}
