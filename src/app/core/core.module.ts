import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import * as fr from '@angular/common/locales/fr';
import { AuthInterceptor } from 'src/app/core/interceptors/auth.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class CoreModule {
  constructor() {
    registerLocaleData(fr.default);
  }
 }
