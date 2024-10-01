import { IFuncionalidade } from "../interfaces/ifuncionalidade.interface";

/**
 * Funcionalidade
 */
export class Funcionalidade implements IFuncionalidade {

  /**
   * identificador único
   */
  id: string;

  /**
   * Nome descritivo
   */
  nome: string;

  /**
   * Constructor
   */
  constructor() {
    this.id = '';
    this.nome = '';
  }
  
}
