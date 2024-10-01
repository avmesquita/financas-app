import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from './services/session.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './factory/http-loader-factory';
import { HttpClient, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { PrimeNgModule } from 'src/_modules/core/modules/primeng.module';
import { CreditosComponent } from './components/creditos/creditos.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { MenuComponent } from './components/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { coreInterceptorProviders } from './interceptors';
import { MainContentComponent } from './components/main-content/main-content.component';
import { LoginComponent } from './components/login/login.component';
import { RegistoComponent } from './components/registo/registo.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { AutenticacaoComponent } from '../core/components/autenticacao/autenticacao.component';
import { AngularMaterialModule } from './modules/angular-material.module';
import { AuthenticationService } from './services/authentication.service';

/**
 * Módulo Core
 */
@NgModule({
  declarations: [
    CreditosComponent,
    SplashScreenComponent,
    MenuComponent,
    MainContentComponent,
    LoginComponent,
    RegistoComponent,
    RecuperarComponent,
    AutenticacaoComponent    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions(),
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    PrimeNgModule,    
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    })
  ],
  exports: [
    CreditosComponent,
    SplashScreenComponent,
    MenuComponent,
    MainContentComponent,
    LoginComponent,
    RegistoComponent,
    RecuperarComponent,
    AutenticacaoComponent,

    TranslateModule,     
    PrimeNgModule,
  ],
  providers: [
    SessionService,
    ConfirmationService,
    DialogService,
    DynamicDialogRef,
    AuthenticationService,
    coreInterceptorProviders,
    { provide: DEFAULT_CURRENCY_CODE, useValue: '' },
  ]
})
export class CoreModule { }
