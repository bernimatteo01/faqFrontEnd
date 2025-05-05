import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

/**
 * Configurazione principale dell'applicazione Angular.
 * Specifica i provider di routing e HTTP necessari per il funzionamento della app standalone.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Provider per gestire il routing tramite l'array appRoutes
    provideRouter(appRoutes),

    // Provider per il modulo HTTPClient con supporto a eventuali interceptor
    provideHttpClient(withInterceptorsFromDi())
  ]
};