import { IPermissao } from "./ipermissao.interface";

/**
 * Interface de Perfil
 */
export interface IPerfil {
  /**
   * identificador principal
   */
  id: string;

  /**
   * Nome identificativo
   */
  nome: string;

  /**
   * Permissões
   */
  permissoes: IPermissao[];
}
