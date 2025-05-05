import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

/**
 * Componente standalone per il login admin.
 * Usa form template-driven per gestire username e password.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  username = '';        // Campo per l'input dell'username
  password = '';        // Campo per l'input della password
  loginFailed = false;  // Flag per mostrare errore di login

  constructor(
    private authService: AuthService,  // Servizio per gestire l'autenticazione
    private router: Router             // Per navigare dopo il login
  ) {}

  /**
   * Metodo eseguito al submit del form.
   * Verifica le credenziali tramite AuthService.
   * In caso di successo → reindirizza alla home.
   * In caso di errore → mostra messaggio di errore.
   */
  onSubmit(): void {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/']);           // Login riuscito → vai alla homepage
    } else {
      this.loginFailed = true;               // Login fallito → mostra errore
    }
  }
}