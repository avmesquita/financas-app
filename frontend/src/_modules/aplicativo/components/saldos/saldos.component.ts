import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AplicativoService } from '../../services/aplicativo.service';
import { ConsolidadoService } from '../../services/consolidado.service';
import { BehaviorSubject } from 'rxjs';
import { SplashScreenService } from 'src/_modules/core/services/splash-screen.service';

/**
 * Componente de Saldos
 */
@Component({
  selector: 'app-saldos',
  templateUrl: './saldos.component.html',
  styleUrls: ['./saldos.component.scss']
})
export class SaldosComponent implements AfterViewInit {

  private saldoCredito: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public saldoCredito$ = this.saldoCredito.asObservable();

  private saldoDebito: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public saldoDebito$ = this.saldoDebito.asObservable();

  /**
   * identificador primário de conta
   */
  @Input() idConta?: string = "";

  /**
   * Saldo de Lançamentos de Crédito
   */
  _saldoCredito: number = 0;

  /**
   * Saldo de Lançamentos de Débito
   */
  _saldoDebito: number = 0;

  /**
   * Saldo no dia de hoje (Creditos - Debitos)
   */
  getSaldoActual(): number {
    try
    {
      return Math.abs(this._saldoCredito) - Math.abs(this._saldoDebito);
    }
    catch {
      return 0;
    }
  }

  /**
   * Constructor
   * 
   * @param aplicativoService 
   * @param contaService 
   */
  constructor(public aplicativoService: AplicativoService,
              public service: ConsolidadoService) { }

  /**
   * Função de Inicio da Exibição
   */              
  ngAfterViewInit(): void {       
    if (this.idConta !== "") {      
      this.service.getAccountBalance(this.idConta || '').subscribe( 
        (retorno: any) => {
            if (retorno && retorno.length > 0) {
              retorno.forEach( 
                (linha: any) => {
                  if (linha.tipoLancamento == 'C') {
                    this.saldoCredito.next(linha.valor);
                    this._saldoCredito = linha.valor
                  }
                  if (linha.tipoLancamento == 'D') {
                    if (linha.valor > 0) linha.valor = linha.valor * -1;
                    this.saldoDebito.next(linha.valor);
                    this._saldoDebito = linha.valor
                  }
                }
              );
            }
       });
    } 
  }

}
