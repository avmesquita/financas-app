import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { BehaviorSubject } from 'rxjs';
import { SplashScreenService } from 'src/_modules/core/services/splash-screen.service';
import { ModoDeEdicaoFormulario } from 'src/_modules/core/enums/modo-de-edicao-formulario';
import { IConta } from '../../interfaces/iconta.interface';
import { ILancamento } from '../../interfaces/ilancamento.interface';
import { Lancamento } from '../../models/lancamento.model';
import { AplicativoService } from '../../services/aplicativo.service';
import { LancamentoDetalheComponent } from '../lancamento-detalhe/lancamento-detalhe.component';
import { ScreenService } from 'src/_modules/core/services/screen.service';
import { LancamentoService } from '../../services/lancamento.service';
import { ContaService } from '../../services/conta.service';
import { IResponse } from 'src/_modules/core/interfaces/iresponse.interface';
import { AuthenticationService } from 'src/_modules/core/services/authentication.service';

/**
 * Componente de Lançamentos
 */
@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LancamentosComponent implements OnInit {
  private _lancamentos = new BehaviorSubject<Lancamento[]>( [] );
  public lancamentos$ = this._lancamentos.asObservable();

  contas: IConta[] = [];

  lancamento?: ILancamento;  
  
  lancamentosSelecionados: ILancamento[] = [];

  contaSelectedId?: string = this.aplicativoService.getContaInUse();
  contaSelected?: IConta;

  sortOrder: number = -1;
  sortField: string = "data";  

  /**
   * Constructor / Injeção de Dependência
   * 
   * @param {AplicativoService} aplicativoService 
   * @param {SplashScreenService} splashScreenService 
   * @param {DialogService} dialogService 
   * @param {ConfirmationService} confirmationService 
   * @param {ScreenService} screenService 
   * @param {LancamentoService} lancamentoService 
   * @param {ContaService} contaService 
   */
  constructor(public aplicativoService: AplicativoService,
              public splashScreenService: SplashScreenService,
              private dialogService: DialogService,              
              private confirmationService: ConfirmationService,
              private screenService: ScreenService,
              private lancamentoService: LancamentoService,
              private contaService: ContaService,
              private msgService: MessageService,
              private authService: AuthenticationService) { 
      const token = sessionStorage.getItem('me');
      if (!token)
        this.authService.logout();      
    }

    /**
     * Função OnInit
     */
    ngOnInit(): void {
      this.sortOrder = -1;
      this.contaSelectedId = this.aplicativoService.getContaInUse();
      this.loadEntries(this.contaSelectedId || '');
      this.loadAccounts();      
    }
            
    /**
     * Carregar todos os lançamentos da Conta
     * 
     * @param accountId 
     */
    loadEntries(accountId: string) {
      try {   
        if (accountId) {
          this.splashScreenService.loadingOn();
          this.lancamentoService.getByAccount(accountId).subscribe(
            (retorno: IResponse) => {    
              if (retorno) {
                if (retorno.success) {
                  this._lancamentos.next([]);
                  this._lancamentos.next(retorno.data);                    
                }
              }
              this.splashScreenService.loadingOff();
            },
            (error: any) => {
              throw error;
            }
          );  
        }
      } catch (error: any) {
        this.splashScreenService.loadingOff();
        this.msgService.add({
          closable: true,
          summary: 'Falha ao carregar lançamentos',
          severity: 'error',
          detail: error?.message || ''
        });
      }
    }

    /**
     * Carregar todas as Contas do Utilizador
     */
    loadAccounts() {
      try {
        const id = sessionStorage.getItem('id');
        if (id) {                    
          const idN = id ? Number.parseInt(id) : 0;
          this.contaService.getAllByUserId(idN.toString()).subscribe(                
            (retorno: any) => {                                    
              if (retorno.success) {
                this.contas = [];                
                if (retorno.data && retorno.data.length > 0) {                  
                  retorno.data.forEach(
                    (conta: IConta) => {
                      this.contas.push(conta);    
                    }
                  );
                }                
              }              
            },
            (error: any) => {
              throw error;
            }
          )
        }
      } catch (error: any) {        
        this.msgService.add({
          closable: true,
          summary: 'Falha ao tentar carregar contas',
          severity: 'error',
          detail: error?.message || ''
        });             
      }
    }  

  /**
   * Evento OnChangeContaSelect
   * @param event 
   */
  onChangeContaSelect(event: any): void {
    this.aplicativoService.setContaInUse(event.value);
    this.loadEntries(event.value);
  }

  /**
   * Consultar Lançamento
   * 
   * @param lancamento 
   */
  consultarLancamento(lancamento: ILancamento): void {
    debugger;
    const ref = this.dialogService.open(LancamentoDetalheComponent, {
      data: {        
        id: lancamento.id,
        idConta: this.contaSelectedId,
        modo: ModoDeEdicaoFormulario.Consultar
      },
      closeOnEscape: true,
      showHeader: false,
      width: this.screenService.isMobile ? '100%' : '60%',      
    });    
  }

  /**
   * Incluir Lançamento
   */
  incluirLancamento(): void {
    this.lancamento = new Lancamento();
    const ref = this.dialogService.open(LancamentoDetalheComponent, {
      data: {
        id: 0,
        idConta: this.contaSelectedId,
        modo: ModoDeEdicaoFormulario.Incluir
      },
      closeOnEscape: true,
      showHeader: false,
      width: this.screenService.isMobile ? '100%' : '60%'
    });

    ref.onClose.subscribe( (retorno: any) => {
      try {
        this.splashScreenService.loadingOn();
        this.loadEntries(this.contaSelectedId || '');
        if (retorno) {
          this.msgService.add({
            closable: true,
            summary: 'Lançamento incluído',
            severity: 'success'
          });        
        }          
      } catch (error: any) {
        this.msgService.add({
          closable: true,
          summary: 'Falha ao incluir',
          severity: 'error',
          detail: error?.message || ''
        });             
      }
    });
  }

  /**
   * Editar Lançamento
   * 
   * @param lancamento 
   */
  editarLancamento(lancamento: ILancamento): void {
    const ref = this.dialogService.open(LancamentoDetalheComponent, {
      data: {
        id: lancamento.id,
        idConta: this.contaSelectedId,
        modo: ModoDeEdicaoFormulario.Editar
      },
      closeOnEscape: true,
      showHeader: false,
      width: this.screenService.isMobile ? '100%' : '60%'
    });

    ref.onClose.subscribe( (retorno: any) => {
      try {        
        this.loadEntries(this.contaSelectedId || '');
        if (retorno.success) {
          this.msgService.add({
            closable: true,
            summary: 'Lançamento alterado',
            severity: 'success'
          });        
        } else {
          this.msgService.add({
            closable: true,
            summary: 'Falha ao alterar',
            severity: 'error'
          });        
        }                
      } catch (error: any) {
        this.msgService.add({
          closable: true,
          summary: 'Falha ao alterar',
          severity: 'error',
          detail: error?.message || ''
        });
      }
    });
  }

  /**
   * Excluir Lançamento
   * 
   * @param lancamento 
   */
  excluirLancamento(lancamento: ILancamento): void {
    this.confirmationService.confirm({
      message: 'Desejas excluir o título ' + lancamento.titulo + '?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {        
        this.lancamentoService.delete(lancamento).subscribe(
          (retorno: any) => {
            try {
              this.loadEntries(this.contaSelectedId || '');
              if (retorno.body.success) {
                this.msgService.add({
                  closable: true,
                  summary: 'Lançamento excluído',
                  severity: 'success'
                });              
              } else {
                this.msgService.add({
                  closable: true,
                  summary: 'Falha na exclusão',
                  severity: 'error'
                });
              }                
            } catch (error: any) {
              this.msgService.add({
                closable: true,
                summary: 'Falha na exclusão',
                severity: 'error',
                detail: error?.message || ''
              });            
            }
          }
        );
      }
    });    

  }

  /**
   * Excluir lançamentos selecionados
   */
  excluirLancamentosSelecionados(): void {
    this.confirmationService.confirm({
      message: 'Desejas excluires os títulos selecionados?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {        
        this.lancamentosSelecionados?.forEach((data) => {
          this.excluirLancamento(data);
        });  
        this.lancamentosSelecionados = [];
      }
    });
  }
}
