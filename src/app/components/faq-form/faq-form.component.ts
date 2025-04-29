import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FaqService, Faq } from '../../services/faq.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './faq-form.component.html',
  styleUrls: ['./faq-form.component.css']
})
export class FaqFormComponent implements OnInit {

  faqForm!: FormGroup;
  faqId?: number;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private faqService: FaqService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Costruzione iniziale del form
    this.faqForm = this.fb.group({
      domanda: ['', Validators.required],
      risposta: ['', Validators.required]
    });

    // Controlla se stiamo modificando una FAQ esistente
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.faqId = +idParam;
        this.loadFaq(this.faqId);
      }
    });
  }

  // Carica i dati della FAQ da modificare
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

  // Salva il form
  onSubmit(): void {
    if (this.faqForm.invalid) {
      return;
    }

    const faqData: Faq = this.faqForm.value;

    if (this.isEditMode && this.faqId !== undefined) {
      this.faqService.updateFaq(this.faqId, faqData).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.faqService.createFaq(faqData).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  // Annulla e torna alla lista
  onCancel(): void {
    this.router.navigate(['/']);
  }
}