import { IFuncionalidade } from "./ifuncionalidade.interface";

/**
 * Interface de Permissão
 */
export interface IPermissao {

  /**
   * identificador principal
   */
  id: string;

  /**
   * Funcionalidade
   */
  funcionalidade?: IFuncionalidade;

  /**
   * Pode Consultar
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
   * Pode excluir
   */
  exclusao: boolean;
}
