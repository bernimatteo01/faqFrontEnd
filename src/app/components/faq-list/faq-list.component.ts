import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FaqService, Faq } from '../../services/faq.service';
import { AuthService } from '../../services/auth.service'; // Servizio per verificare autenticazione

/**
 * Componente Angular standalone che mostra la lista delle FAQ.
 * Consente la visualizzazione espandibile e, se autenticati, anche modifica/cancellazione.
 */
@Component({
  selector: 'app-faq-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.css']
})
export class FaqListComponent implements OnInit {
  
  // Array di FAQ con proprietà "open" opzionale (per espandere/chiudere)
  faqs: (Faq & { open?: boolean })[] = [];

  constructor(
    private faqService: FaqService,
    private router: Router,
    private authService: AuthService
  ) {}

  /**
   * Al caricamento del componente, recupera tutte le FAQ dal backend.
   */
  ngOnInit(): void {
    this.loadFaqs();
  }

  /**
   * Carica le FAQ dal servizio e inizializza "open" a false.
   */
  loadFaqs(): void {
    this.faqService.getFaqs().subscribe(
      (data) => {
        // Mappo ogni FAQ aggiungendo una proprietà "open" per gestire l'espansione
        this.faqs = data.map(faq => ({ ...faq, open: false }));
      },
      (error) => {
        console.error('Errore nel caricamento delle FAQ:', error);
      }
    );
  }

  /**
   * Espande o comprime la FAQ selezionata.
   * Chiude tutte le altre.
   * @param selectedFaq La FAQ su cui l'utente ha cliccato
   */
  toggleFaq(selectedFaq: (Faq & { open?: boolean })): void {
    this.faqs.forEach(faq => {
      faq.open = (faq === selectedFaq) ? !faq.open : false;
    });
  }  

  /**
   * Elimina una FAQ dopo conferma.
   * @param id ID della FAQ da eliminare
   */
  deleteFaq(id: number): void {
    if (confirm('Sei sicuro di voler cancellare questa FAQ?')) {
      this.faqService.deleteFaq(id).subscribe(() => {
        this.loadFaqs(); // Aggiorna la lista dopo eliminazione
      });
    }
  }

  /**
   * Naviga al form di creazione di una nuova FAQ.
   */
  goToAddFaq(): void {
    this.router.navigate(['/faq/add']);
  }

  /**
   * Naviga al form di modifica di una FAQ esistente.
   * @param id ID della FAQ da modificare
   */
  goToEditFaq(id: number): void {
    this.router.navigate(['/faq/edit', id]);
  }

  /**
   * Verifica se l'utente è autenticato.
   * @returns true se loggato, false altrimenti
   */
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}