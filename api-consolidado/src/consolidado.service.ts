import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

/**
 * Serviço do Consolidado
 **/
@Injectable()
export class ConsolidadoService {

   /**
    * Injeção de Dependencia pelo constructor
    * 
    * @param {DataSource} datasource Acesso a Dados
    */  
  constructor(    
    private dataSource: DataSource    
    ) {
  }

  /**
   * Obter os saldos em Credito e Debito de uma conta
   * 
   * @param accountId 
   * @returns 
   */
  async getAccountBalance(accountId: string) {
    let sql = ' SELECT \
                  COD_ENTRY_TYPE as tipoLancamento, \
                  SUM(NUM_VALUE) as valor \
                FROM  TB_ACCOUNTING_ENTRY \
                WHERE COD_ACCOUNT_ID = ' + accountId + ' \
                GROUP BY COD_ENTRY_TYPE ';

    return this.dataSource.query(sql);
  }

  /**
   * Obter os saldos em Credito e Debito de uma conta até a data atual
   * 
   * @param accountId 
   * @returns 
   */
  async getAccountBalanceToday(accountId: string) {
    let sql = ' SELECT \
                  COD_ENTRY_TYPE as tipoLancamento, \
                  SUM(NUM_VALUE) as valor \
                FROM  TB_ACCOUNTING_ENTRY \
                WHERE COD_ACCOUNT_ID = ' + accountId + ' \
                AND DAT_DATE <= NOW \
                GROUP BY COD_ENTRY_TYPE ';

    return this.dataSource.query(sql);
  }


  /**
   * Obter os saldos em Credito e Debito das contas de um utilizador
   * 
   * @param userId 
   * @returns 
   */
  async getUserAccountsBalance(userId: string) {
    let sql = ' SELECT \
                  ae.COD_ACCOUNT_ID as accountId,	\
                  ae.COD_ENTRY_TYPE as tipoLancamento, \
                  SUM(ae.NUM_VALUE) as valor \
                FROM  TB_ACCOUNTING_ENTRY ae \
                        inner join TB_ACCOUNT a \
                          on a.COD_ACCOUNT_ID = ae.COD_ACCOUNT_ID \
                WHERE a.COD_USER_ID = ' + userId + ' \
                GROUP BY ae.COD_ACCOUNT_ID, ae.COD_ENTRY_TYPE ';  

    return this.dataSource.query(sql);
  }

}
