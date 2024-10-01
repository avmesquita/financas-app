import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AplicativoRoutingModule } from './aplicativo.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from 'src/_modules/core/modules/primeng.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../core/factory/http-loader-factory';
import { HttpClient } from '@angular/common/http';
import { LancamentoDetalheComponent } from './components/lancamento-detalhe/lancamento-detalhe.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LancamentosComponent } from './components/lancamentos/lancamentos.component';
import { SaldosComponent } from './components/saldos/saldos.component';
import { ContasComponent } from './components/contas/contas.component';
import { ContaDetalheComponent } from './components/conta-detalhe/conta-detalhe.component';

import { CoreModule } from '../core/core.module';
import { EntrarComponent } from './components/entrar/entrar.component';

/**
 * Módulo do Aplicativo
 */
@NgModule({
  declarations: [    
    LancamentoDetalheComponent,
    LancamentosComponent,
    SaldosComponent,    
    ContasComponent,
    ContaDetalheComponent,    
    EntrarComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AplicativoRoutingModule,    
    FormsModule,
    ReactiveFormsModule,
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
  providers: [MessageService, 
    ConfirmationService,
    DialogService,
    DynamicDialogRef,    
  ]
})
export class AplicativoModule { }
