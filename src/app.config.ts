import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { APP_ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES, withHashLocation(), withComponentInputBinding()), 
    provideHttpClient()
  ],
};
