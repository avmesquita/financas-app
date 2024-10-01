import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './main-routing.module';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServiceWorkerModule } from '@angular/service-worker';

import { JwtInterceptor } from '../core/interceptors/jwt.interceptor';
import { MainComponent } from './components/_main/main.component';
import { CoreModule } from '../core/core.module';
import { PrimeNgModule } from '../core/modules/primeng.module';
import { HttpLoaderFactory } from '../core/factory/http-loader-factory';
import { environment } from 'src/environments/environment';

/**
 * Módulo principal do Software
 */
@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    PrimeNgModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,    
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),    
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true, //environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      // 'registerWhenStable:30000'
      registrationStrategy: 'registerImmediately'
    })
  ],
  exports: [TranslateModule, PrimeNgModule],
  providers: [    
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },    
  ],  
  bootstrap: [MainComponent]
})
export class MainModule { }
