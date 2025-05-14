import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interfaccia che rappresenta una singola FAQ.
 * È usata per tipizzare gli oggetti FAQ in Angular.
 */
export interface Faq {
  id?: number;               // ID è opzionale per le FAQ nuove (non ancora salvate)
  domanda: string;           // Testo della domanda
  risposta: string;          // Testo della risposta
  dataCreazione?: string;    // Data di creazione (opzionale)
  dataModifica?: string;     // Data di ultima modifica (opzionale)
}

/**
 * Servizio Angular per comunicare con il backend Spring Boot.
 * Gestisce tutte le chiamate HTTP per ottenere, creare, modificare e cancellare FAQ.
 */
@Injectable({
  providedIn: 'root' // Servizio disponibile in tutta l'app
})
export class FaqService {

  private apiUrl = 'http://localhost:8080/api/faq'; // URL base delle API FAQ

  constructor(private http: HttpClient) { }

  /**
   * Recupera la lista di tutte le FAQ dal backend.
   * @returns Observable con array di FAQ
   */
  getFaqs(): Observable<Faq[]> {
    return this.http.get<Faq[]>(this.apiUrl);
  }

  /**
   * Recupera una singola FAQ tramite il suo ID.
   * @param id identificativo della FAQ
   * @returns Observable con la FAQ trovata
   */
  getFaq(id: number): Observable<Faq> {
    return this.http.get<Faq>(`${this.apiUrl}/${id}`);
  }

  /**
   * Invia una nuova FAQ al backend per salvarla.
   * @param faq oggetto FAQ da creare
   * @returns Observable con la FAQ creata
   */
  createFaq(faq: Faq): Observable<Faq> {
    return this.http.post<Faq>(this.apiUrl, faq);
  }

  /**
   * Aggiorna una FAQ esistente nel backend.
   * @param id identificativo della FAQ da modificare
   * @param faq dati aggiornati
   * @returns Observable con la FAQ modificata
   */
  updateFaq(id: number, faq: Faq): Observable<Faq> {
    return this.http.put<Faq>(`${this.apiUrl}/${id}`, faq);
  }

  /**
   * Elimina una FAQ dal backend tramite ID.
   * @param id identificativo della FAQ da eliminare
   * @returns Observable void (nessun dato di ritorno)
   */
  deleteFaq(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}