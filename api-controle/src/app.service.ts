import { Injectable } from '@nestjs/common';

/**
 * Serviço básico da API
 */
@Injectable()
export class AppService {

  /**
   * Função simples para validar o funcionamento da API
   * 
   * @returns {boolean} Verdadeiro, se estiver a funcionar correctamente
   */
  async getHealth(): Promise<boolean> {
    return true;
  }
}
