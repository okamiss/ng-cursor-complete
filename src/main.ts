import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { calculatorReducer } from './app/store/calculator/calculator.reducer';
import { CalculatorEffects } from './app/store/calculator/calculator.effects';
import { apiInterceptor } from './app/interceptors/api.interceptor';



bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(
      withInterceptors([apiInterceptor])
    ),
    provideRouter(routes),
    provideStore({
      calculator: calculatorReducer
    }),
    provideEffects([CalculatorEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    
   
  ]
}).catch(err => console.error(err)); 