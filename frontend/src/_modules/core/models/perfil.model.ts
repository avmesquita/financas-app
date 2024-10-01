import { IPerfil } from "../interfaces/iperfil.interface";
import { IPermissao } from "../interfaces/ipermissao.interface";

/**
 * Perfil de Acesso
 */
export class Perfil implements IPerfil {

    /**
     * identificador primário
     */
    id: string;

    /**
     * Nome descritivo
     */
    nome: string;

    /**
     * Permissões
     */
    permissoes: IPermissao[];

  /**
   * Constructor
   */
  constructor() {
    this.id = '';
    this.nome = '';
    this.permissoes = [];
  }
}
