import { IFuncionalidade } from "../interfaces/ifuncionalidade.interface";
import { IPermissao } from "../interfaces/ipermissao.interface";

/**
 * Permissão
 */
export class Permissao implements IPermissao {

  /**
   * identificador primário
   */
  id: string;

  /**
   * Funcionalidade associada
   */
  funcionalidade?: IFuncionalidade;

  /**
   * Pode Consultar?
   */
  consulta: boolean;

  /**
   * Pode Editar
   */
  edicao: boolean;

  /**
   * Pode Incluir
   */
  inclusao: boolean;

  /**
   * Pode Excluir
   */
  exclusao: boolean;

  /**
   * Constructor
   */
  constructor() {
    this.id = '';
    this.consulta = false;
    this.edicao = false;
    this.inclusao = false;
    this.exclusao = false;
  }
}
