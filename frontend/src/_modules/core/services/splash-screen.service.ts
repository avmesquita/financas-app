import { Injectable } from '@angular/core';

/**
 * Serviço de Actualização de Estados de exibição do SplashScreen de indicação de carga
 */
@Injectable({
  providedIn: 'root'
})
export class SplashScreenService {

  /**
   * Visível
   */
  public visible: boolean = false;

  /**
   * Grava novo Estado para o atributo
   * 
   * @param state 
   */
  setState(state: boolean): void {
    this.visible = state;
  }

  /**
   * Atruibui o Estado como Falso
   */
  loadingOff(): void {
    this.visible = false;
  }

  /**
   * Atrbui o Estado como True
   */
  loadingOn(): void {
    this.visible = true;
  }

}
