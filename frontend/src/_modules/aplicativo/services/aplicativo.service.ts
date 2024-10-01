import { Injectable } from '@angular/core';
import { SessionService } from '../../core/services/session.service';

/**
 * Serviço do Aplicativo
 */
@Injectable({
  providedIn: 'root'
})
export class AplicativoService {

  /**
   * Conta em Uso
   */
  private contaEmUso: string;

  constructor(private sessionService: SessionService) {
    this.sessionService.setItem("credits","Andre Mesquita");
  }

  /**
   * Atribuir conta em Uso
   * 
   * @param id 
   */
  setContaInUse(id: string) {
    this.contaEmUso = id;
    this.sessionService.setItem("contaInUse", this.contaEmUso);
  } 

  /**
   * Obter conta em uso
   * 
   * @returns 
   */
  getContaInUse() {    
    return this.sessionService.getItem("contaInUse");
  }
}