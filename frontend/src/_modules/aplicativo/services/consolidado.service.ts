import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

/**
 * Serviço do Consolidado
 */
@Injectable({
  providedIn: 'root'
})
export class ConsolidadoService {

    /**
     * 
     * @param http Constructor
     */
    constructor(private http: HttpClient) {
    }

    /**
     * Obter os saldos de credito e debito de uma conta
     * 
     * @param id 
     * @returns {Conta}
     */
    getAccountBalance(accountId: string) {        
        return this.http.get<any[]>(environment.apiConsolidado + '/api/consolidated/getAccountBalance/' + accountId);        
    }

    /**
     * Obter os saldos de credito e debito das contas de um utilizador
     * 
     * @param userId 
     * @returns 
     */
    getUserAccountsBalance(userId: string) {
        return this.http.get<any[]>(environment.apiConsolidado + '/api/consolidated/getUserAccountsBalance/' + userId);
    }
}