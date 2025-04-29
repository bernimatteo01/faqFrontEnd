import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Questo rappresenta una singola FAQ
export interface Faq {
  id?: number;          // optional per quando crei una nuova FAQ
  domanda: string;
  risposta: string;
  dataCreazione?: string;
  dataModifica?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  private apiUrl = 'http://localhost:8080/api/faq'; // URL del backend

  constructor(private http: HttpClient) { }

  // Ottieni tutte le FAQ
  getFaqs(): Observable<Faq[]> {
    return this.http.get<Faq[]>(this.apiUrl);
  }

  // Ottieni una FAQ per ID
  getFaq(id: number): Observable<Faq> {
    return this.http.get<Faq>(`${this.apiUrl}/${id}`);
  }

  // Crea una nuova FAQ
  createFaq(faq: Faq): Observable<Faq> {
    return this.http.post<Faq>(this.apiUrl, faq);
  }

  // Aggiorna una FAQ esistente
  updateFaq(id: number, faq: Faq): Observable<Faq> {
    return this.http.put<Faq>(`${this.apiUrl}/${id}`, faq);
  }

  // Cancella una FAQ
  deleteFaq(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}