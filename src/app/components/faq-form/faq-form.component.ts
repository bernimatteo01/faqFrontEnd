import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FaqService, Faq } from '../../services/faq.service';
import { CommonModule } from '@angular/common';

/**
 * Componente Angular standalone per il form di creazione/modifica FAQ.
 * Usa Reactive Forms per gestire l'input e interagisce con il servizio FAQ.
 */
@Component({
  selector: 'app-faq-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './faq-form.component.html',
  styleUrls: ['./faq-form.component.css']
})
export class FaqFormComponent implements OnInit {

  faqForm!: FormGroup;           // Form group reattivo
  faqId?: number;                // ID della FAQ (se in modalità modifica)
  isEditMode = false;           // Flag per capire se siamo in modifica

  constructor(
    private fb: FormBuilder,          // Per costruire il form
    private faqService: FaqService,   // Per chiamare API backend
    private router: Router,           // Per navigare
    private route: ActivatedRoute     // Per leggere parametri dalla route
  ) {}

  /**
   * Metodo eseguito all'inizializzazione del componente.
   * Costruisce il form e verifica se siamo in modalità modifica.
   */
  ngOnInit(): void {
    // Crea il form con validazione richiesta
    this.faqForm = this.fb.group({
      domanda: ['', Validators.required],
      risposta: ['', Validators.required]
    });

    // Controlla se nella route è presente un ID → modalità modifica
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.faqId = +idParam;
        this.loadFaq(this.faqId);
      }
    });
  }

  /**
   * Carica la FAQ da modificare e precompila il form.
   * @param id ID della FAQ
   */
  loadFaq(id: number): void {
    this.faqService.getFaq(id).subscribe(
      (faq) => {
        this.faqForm.patchValue({
          domanda: faq.domanda,
          risposta: faq.risposta
        });
      },
      (error) => {
        console.error('Errore nel caricamento della FAQ:', error);
      }
    );
  }

  /**
   * Metodo chiamato al submit del form.
   * Chiama il metodo corretto a seconda della modalità (creazione o modifica).
   */
  onSubmit(): void {
    if (this.faqForm.invalid) {
      return;
    }

    const faqData: Faq = this.faqForm.value;

    if (this.isEditMode && this.faqId !== undefined) {
      this.faqService.updateFaq(this.faqId, faqData).subscribe(() => {
        this.router.navigate(['/']); // Torna alla home dopo modifica
      });
    } else {
      this.faqService.createFaq(faqData).subscribe(() => {
        this.router.navigate(['/']); // Torna alla home dopo creazione
      });
    }
  }

  /**
   * Annulla la modifica e torna alla lista FAQ.
   */
  onCancel(): void {
    this.router.navigate(['/']);
  }
}