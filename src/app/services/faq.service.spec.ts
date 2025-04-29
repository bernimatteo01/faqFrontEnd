import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FaqService, Faq } from './faq.service';

describe('FaqService', () => {
  let service: FaqService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FaqService]
    });

    service = TestBed.inject(FaqService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch FAQs', () => {
    const dummyFaqs: Faq[] = [
      { id: 1, domanda: 'Come faccio il login?', risposta: 'Vai sulla homepage.' }
    ];

    service.getFaqs().subscribe(faqs => {
      expect(faqs.length).toBe(1);
      expect(faqs[0].domanda).toBe('Come faccio il login?');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/faq');
    expect(req.request.method).toBe('GET');
    req.flush(dummyFaqs);
  });
});
