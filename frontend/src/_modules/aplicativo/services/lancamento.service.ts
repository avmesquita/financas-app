import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Lancamento } from '../models/lancamento.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ILancamento } from '../interfaces/ilancamento.interface';
import { environment } from 'src/environments/environment';

/**
 * Serviço de Lançamento
 */
@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

    /**
     * Lançamentos
     */
    private lancamentos = new BehaviorSubject<Lancamento[]>( [] );

    /**
     * Lançamentos (somente leitura)
     */
    public lancamentos$ = this.lancamentos.asObservable();

    /**
     * Constructor
     * 
     * @param http 
     */
    constructor(private http: HttpClient) {}

    /**
     * Obter Lançamento por ID
     * 
     * @param id 
     * @returns {Lancamento}
     */
    getById(id: string): Observable<any> {        
        return this.http.get<Lancamento[]>(environment.apiControle +'/api/entry/getById/' + id);        
    }

    /**
     * Obter Lançamentos por Conta
     * 
     * @param accountId identificador principal de conta
     * @returns {Lancamento[]} Lançamentos
     */
    getByAccount(accountId: string): Observable<any> {
        return this.http.get<Lancamento[]>(environment.apiControle + '/api/entry/getByAccount/' + accountId);
    }

    /**
     * Criar Lançamento
     * 
     * @param obj 
     * @returns {Lancamento}
     */
    create(obj: ILancamento): Observable<any> {
        //const id = sessionStorage.getItem('id');
        const body = {             
            data: obj.data,
            titulo: obj.titulo,
            descricao: obj.descricao,
            valor: obj.valor,
            categorias: obj.categorias,
            image: obj.image,
            tipoLancamento: obj.tipoLancamento,
            contaId: obj.contaId
        };
        const url = environment.apiControle + '/api/entry';    
        return this.http.post<any>(url, body, { observe: 'response'});
    }

    /**
     * Alterar lançamento
     * 
     * @param {ILancamento} obj 
     * @returns {ILancamento} Lançamento actualizado
     */
    update(obj: ILancamento): Observable<any> {
        const params = new HttpParams().set('uuid', obj.uuid ? obj.uuid : '');
        const url = environment.apiControle + '/api/entry';
    
        return this.http.put<any>(url, obj, { params: params, observe: 'response' });
    }

    /**
     * Excluir lançamento
     * 
     * @param {ILancamento} obj 
     * @returns 
     */
    delete(obj: ILancamento): Observable<any> {
        const url = environment.apiControle + '/api/entry/' + obj.uuid;
        return this.http.delete(url, { observe: 'response' });
    }
}