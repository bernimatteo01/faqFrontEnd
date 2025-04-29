import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FaqService, Faq } from '../../services/faq.service';
import { AuthService } from '../../services/auth.service'; // importa AuthService

@Component({
  selector: 'app-faq-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.css']
})
export class FaqListComponent implements OnInit {
  
  faqs: (Faq & { open?: boolean })[] = []; // <-- aggiunto "open" opzionale!

  constructor(private faqService: FaqService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadFaqs();
  }

  loadFaqs(): void {
    this.faqService.getFaqs().subscribe(
      (data) => {
        this.faqs = data.map(faq => ({ ...faq, open: false })); // <-- mappo e aggiungo open: false
      },
      (error) => {
        console.error('Errore nel caricamento delle FAQ:', error);
      }
    );
  }

  toggleFaq(selectedFaq: (Faq & { open?: boolean })): void {
    this.faqs.forEach(faq => {
      faq.open = (faq === selectedFaq) ? !faq.open : false;
    });
  }  

  deleteFaq(id: number): void {
    if (confirm('Sei sicuro di voler cancellare questa FAQ?')) {
      this.faqService.deleteFaq(id).subscribe(() => {
        this.loadFaqs(); // ricarica la lista dopo la cancellazione
      });
    }
  }

  goToAddFaq(): void {
    this.router.navigate(['/faq/add']);
  }

  goToEditFaq(id: number): void {
    this.router.navigate(['/faq/edit', id]);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
