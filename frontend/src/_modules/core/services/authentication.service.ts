import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserContextService } from "src/_modules/core/services/user-context.service";
import { map } from 'rxjs/operators';

import { Utilizador } from 'src/_modules/core/models/utilizador.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

/**
 * Serviço de Autenticação
 */
@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentUserSubject = new BehaviorSubject<Utilizador>( new Utilizador() );
    public currentUser?: Observable<Utilizador>;

    /**
     * Injeção de Dependência
     * 
     * @param {HttpClient} http 
     * @param {UserContextService} userContextService 
     * @param {Router} router 
     */
    constructor(private http: HttpClient, 
                private userContextService: UserContextService,
                private router: Router) {
        const utilizadorLogado = sessionStorage.getItem('currentUser');
        if (utilizadorLogado) {
            this.currentUserSubject = new BehaviorSubject<Utilizador>(JSON.parse(utilizadorLogado));
            this.currentUser = this.currentUserSubject.asObservable();
        }
    }

    /**
     * Obtem o Utilizador logado
     */
    public get currentUserValue(): Utilizador | null {
        if (this.currentUserSubject)
            return this.currentUserSubject.value;
        else
            return null;
    } 

    /**
     * Autenticar Utilizador
     * 
     * @param {string} email Email
     * @param {string} senha Senha
     * @returns {boolean}
     */
    autenticarUtilizador(email: string, senha: string): Observable<any> {
        let body = { username: email, password: senha };
        let options = { params: new HttpParams() };
        let url = environment.apiControle + '/api/auth/login';

        return this.http.post<any>(url, body, options)
            .pipe(map(response => {
                debugger;
                if (response.token) {
                    var utilizador: Utilizador = response.user;
                    utilizador.jwtToken = response.token;

                    this.userContextService.setUtilizador(utilizador);
                    sessionStorage.setItem('currentUser', JSON.stringify(utilizador));
                    sessionStorage.setItem('me', utilizador.jwtToken);
                    sessionStorage.setItem('id', utilizador.id);                    
                                        
                    this.currentUserSubject.next(utilizador);

                    return true;
                } else {
                    return false;
                }
            }));
    }

    /**
     * Deslogar Utilizador
     */
    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('me');        
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('contaInUse');
        this.currentUserSubject.next(new Utilizador());
        this.router.navigate(['/']).then( ()=> {
            window.location.href = window.location.href;
        });
    }
}
