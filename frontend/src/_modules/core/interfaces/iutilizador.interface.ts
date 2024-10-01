import { IPerfil } from "./iperfil.interface";

/**
 * Inteface de Utilizador
 */
export interface IUtilizador {

    /**
     * Nome
     */
    nome: string;

    /**
     * Telemóvel
     */
    telemovel: string;

    /**
     * Email
     */
    email: string;

    /**
     * Identificador primario
     */
    id: string;

    /**
     * Senha
     */
    senha: string;

    /**
     * Perfil do Utilizador
     */
    perfil: IPerfil;    
}
