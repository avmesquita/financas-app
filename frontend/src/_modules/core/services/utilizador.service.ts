import { Injectable } from '@angular/core';
import { IUtilizador } from '../interfaces/iutilizador.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';

/**
 * Serviço de Utilizador
 */
@Injectable({
  providedIn: 'root'
})
export class UtilizadorService {

  /**
   * Injeção de Dependência
   * 
   * @param {HttpClient} http Serviço de Acesso HTTP
   * @param {AuthenticationService} authService Serviço de Autenticação
   */
  constructor(private http: HttpClient,
              private authService: AuthenticationService,
              private msgService: MessageService) {
    
  }

  /**
   * Obtem todos os Utilizadores
   * 
   * @returns {Utilizador[]}
   */
  getAll() {

  }

  /**
   * Obtém Utilizador por identificador primário
   * 
   * @param {string} id Identificador primário de Utilizador
   * @returns {Utilizador} Utilizador
   */
  get(id: string) {
  }


  /**
   * Criar Utilizador
   * 
   * @param {IUtilizador} obj DTO de criação de Utilizador
   * @returns {boolean}
   */
  create(obj: IUtilizador): Observable<any> {
    let body = { name: obj.nome, email: obj.email, password: obj.senha, role: 2 };
    let options = { params: new HttpParams() };
    let url = environment.apiControle + '/api/user';

    return this.http.post<any>(url, body, options)
        .pipe(map(response => {
            debugger;
            if (response.success) {
              
                /*
                this.authService.autenticarUtilizador(obj.email, obj.senha).subscribe(
                  (o: any) => {
                    console.log('autenticado',o);
                  }
                );*/              
                return true;
            } else {
                return false;
            }
        }));
  }  

  /**
   * Actualizar Utilizador
   * 
   * @param {IUtilizador} obj DTO de actualização de Utilizador
   * @returns {boolean}
   */  
  update(obj: IUtilizador) {

  }

  /**
   * Excluir Utilizador
   * 
   * @param {string} id Identificador primário de Utilizador
   * @returns {boolean}
   */  
  delete(id: string) {
  }  
}
