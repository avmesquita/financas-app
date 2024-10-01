import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SplashScreenService } from 'src/_modules/core/services/splash-screen.service';
import { ModoDeEdicaoFormulario } from 'src/_modules/core/enums/modo-de-edicao-formulario';
import { IConta } from '../../interfaces/iconta.interface';
import { Conta } from '../../models/conta.model';
import { AplicativoService } from '../../services/aplicativo.service';
import { ContaDetalheComponent } from '../conta-detalhe/conta-detalhe.component';
import { ScreenService } from 'src/_modules/core/services/screen.service';

import { ContaService } from '../../services/conta.service';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from 'src/_modules/core/services/authentication.service';

/**
 * Componente de Contas
 */
@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContasComponent implements OnInit {

  private _contas = new BehaviorSubject<Conta[]>( [] );
  public contas$ = this._contas.asObservable();

  conta?: IConta;  
  contasSelecionados: IConta[] = [];

  sortOrder: any;
  sortField: any;  
  sortMode: any;

  /**
   * Constructor / Injeção de Dependência
   * 
   * @param {AplicativoService} aplicativoService 
   * @param {SplashScreenService} splashScreenService 
   * @param {DialogService} dialogService 
   * @param {ConfirmationService} confirmationService 
   * @param {ScreenService} screenService 
   * @param {ContaService} contaService 
   */
  constructor(public aplicativoService: AplicativoService,
              public splashScreenService: SplashScreenService,
              private dialogService: DialogService,              
              private confirmationService: ConfirmationService,
              private screenService: ScreenService,              
              public contaService: ContaService,              
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
    this.loadAccounts();
  }

  /**
   * Carregar todas as contas do utilizador
   */
  loadAccounts() {
    try {
      const id = sessionStorage.getItem('id');
      if (id) {
        this.splashScreenService.loadingOn();
        const idN = id ? Number.parseInt(id) : 0;
        this.contaService.getAllByUserId(idN.toString()).subscribe(
              (retorno: any) => {       
                if (retorno.success) {
                  this._contas.next([]);                  
                  if (retorno.data && retorno.data.length > 0) {
                    this._contas.next(retorno.data);
                  }
                  this.splashScreenService.loadingOff();                  
                }
              }
            );
      }
    } catch (error) {
      this.splashScreenService.loadingOff();
      console.log('error => ', error)
    }
  }

  /**
   * Consultar Conta
   * 
   * @param conta 
   */
  consultarConta(conta: IConta): void {
    const ref = this.dialogService.open(ContaDetalheComponent, {
      data: {
        id: conta.id,
        modo: ModoDeEdicaoFormulario.Consultar
      },
      closeOnEscape: true,
      showHeader: false,
      header: 'DETALHE DA CONTA',
      width: this.screenService.isMobile ? '100%' : '60%'
    });
  
  }

  /**
   * Incluir Conta
   */
  incluirConta(): void {
    this.conta = new Conta();

    const ref = this.dialogService.open(ContaDetalheComponent, {
      data: {
        id: 0,
        modo: ModoDeEdicaoFormulario.Incluir
      },
      closeOnEscape: true,
      showHeader: false,
      header: 'NOVA CONTA',
      width: this.screenService.isMobile ? '100%' : '60%'
    });

    ref.onClose.subscribe( (retorno: any) => {      
      debugger;
      if (retorno) {
        this.msgService.add({
          closable: true,
          summary: 'Conta incluída.',
          severity: 'success'
        });
      }  
      this.loadAccounts();
    });
  }

  /**
   * Editar Conta
   * 
   * @param conta 
   */
  editarConta(conta: IConta): void {
    const ref = this.dialogService.open(ContaDetalheComponent, {
      data: {
        id: conta.id,
        modo: ModoDeEdicaoFormulario.Editar
      },
      closeOnEscape: true,
      showHeader: false,
      header: 'EDITAR CONTA',
      width: this.screenService.isMobile ? '100%' : '60%'
    });

    ref.onClose.subscribe( (retorno: any) => {
      if (retorno) {
        this.msgService.add({
          closable: true,
          summary: 'Conta alterada.',
          severity: 'success'
        });
      }      
      this.loadAccounts();
    });  
  }

  /**
   * Excluir Conta
   * 
   * @param conta
   */
  excluirConta(conta: IConta): void {
    this.confirmationService.confirm({
      message: 'Desejas excluir a conta ' + conta.nome + '?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contaService.delete(conta).subscribe(
          (retorno: any) => {
            debugger;
            if (retorno.body.success) {
              this.msgService.add({
                closable: true,
                summary: 'Conta excluída.',
                severity: 'success'
              });
            } else {
              this.msgService.add({
                closable: true,
                summary: 'Conta não excluída.',
                severity: 'error',
                detail: 'Verifique se existem lançamentos na conta'
              });              
            }
            this.loadAccounts();            
          }
        );
      }
    });    
  }

  /**
   * Excluir contas selecionadas
   */
  excluirContasSelecionados(): void {
    this.confirmationService.confirm({
      message: 'Desejas excluires as contas selecionadas?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {        
        this.contasSelecionados?.forEach((data) => {
          this.contaService.delete(data).subscribe();
        });  
        this.contasSelecionados = [];
      }
    });
  }
}
