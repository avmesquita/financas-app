import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Conta } from '../models/conta.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IConta } from '../interfaces/iconta.interface';
import { environment } from 'src/environments/environment';

/**
 * Serviço de Contas
 */
@Injectable({
  providedIn: 'root'
})
export class ContaService {

    /**
     * Contas
     */
    private contas = new BehaviorSubject<Conta[]>( [] );

    /**
     * Contas (somente leitura)
     */
    public contas$ = this.contas.asObservable();

    /**
     * 
     * @param http Constructor
     */
    constructor(private http: HttpClient) {
    }

    /**
     * Obter Conta por identificador primário
     * 
     * @param id 
     * @returns {Conta}
     */
    getById(id: string) {        
        return this.http.get<Conta[]>(environment.apiControle + '/api/account/getById/' + id);        
    }

    /**
     * Obter todas as Contas por identificador de utilizador
     * 
     * @param id 
     * @returns {Conta[]}
     */
    getAllByUserId(id: string) {
        return this.http.get<Conta[]>(environment.apiControle + '/api/account/getAllByUserId/' + id);
    }    

    /**
     * Criar Conta
     * 
     * @param obj 
     * @returns 
     */
    create(obj: IConta): Observable<any> {
        const id = sessionStorage.getItem('id');
        let body = { 
            nome: obj.nome, 
            descricao: obj.descricao, 
            saldoCredito: obj.saldoCredito, 
            saldoDebito: obj.saldoDebito, 
            saldoConsolidado: obj.saldoConsolidado,            
            userId: id 
        };
        let options = { params: new HttpParams() };
        let url = environment.apiControle + '/api/account';
    
        return this.http.post<any>(url, body, options)
            .pipe(map(response => {
                if (response.success) {                    
                    return response;
                } else {
                    return response;
                }
            }));
    }
    
    /**
     * Alterar conta
     * 
     * @param {IConta} obj 
     * @returns {IConta} Lançamento actualizado
     */
    update(obj: IConta): Observable<any> {
        const params = new HttpParams().set('uuid', obj.uuid ? obj.uuid : '');
        const url = environment.apiControle + '/api/account';
    
        return this.http.put<any>(url, obj, { params: params, observe: 'response' });
    }

    /**
     * Excluir conta
     * 
     * @param {IConta} obj 
     * @returns 
     */
    delete(obj: IConta): Observable<any> {
        const url = environment.apiControle + '/api/account/' + obj.uuid;
        return this.http.delete(url, { observe: 'response' });
    }    
}