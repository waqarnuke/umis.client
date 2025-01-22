import { APP_BOOTSTRAP_LISTENER, APP_INITIALIZER, ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { InitService } from './core/services/init.service';
import { lastValueFrom } from 'rxjs';

function initializeApp(){
  const initService = inject(InitService);
  return () =>
    lastValueFrom(initService.init()).finally(() => {
      const splash = document.getElementById('initial-splash');
      if (splash) {
        splash.remove();
      }
    });
  // return () => lastValueFrom(initService.init()).finally( () => {
  //   const splash = document.getElementById('initial-splash');
  //   if(splash){
  //     splash.remove();
  //   }
  // })
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      errorInterceptor,
      loadingInterceptor,
      authInterceptor
    ])), 
    provideAnimationsAsync(),
    {
      provide:APP_INITIALIZER,
      useFactory : initializeApp,
      multi:true,
      deps:[InitService]
    }
    //provideAppInitializer(initializeApp()),
    //provideAppInitializer(() => initializeApp(inject(InitService)))
  ]
};
