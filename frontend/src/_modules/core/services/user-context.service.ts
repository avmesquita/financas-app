import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SessionService } from "./session.service";
import { Utilizador } from "../models/utilizador.model";

/**
 * Utilizador Nulo
 */
const defaultUser = null;

/**
 * Serviço de Contexto de Utilizador
 */
@Injectable({
    providedIn: 'root',
})
export class UserContextService {

    /**
     * Utilizador
     */
    public user$ = new BehaviorSubject(defaultUser);

    /**
     * Construtor
     * 
     * @param {SessionService} sessionService Serviço de Sessão do Navegador
     */
    constructor(private sessionService: SessionService) {
        var data = this.sessionService.getItem("currentUser");
        if (data != null) {
            this.user$.next(data);
        }
    }

    /**
     * Obtém o utilizador logado
     * 
     * @returns {Utilizador}
     */
    public getUtilizador(): Utilizador {
        var data = this.sessionService.getItem("currentUser");
        return data as Utilizador;
    }

    /**
     * Regista o utilizador logado
     * @param user 
     */
    public setUtilizador(user: any) {
        this.sessionService.setItem("currentUser", user);
        this.user$.next(user);
    }

    /**
     * Limpar o utilizador logado
     */
    public logout() {
        this.sessionService.removeItem("currentUser");
        this.user$.next(defaultUser);
    }

}