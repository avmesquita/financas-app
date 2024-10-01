import { IConta } from "./iconta.interface";

/**
 * Interface de Lançamento
 */
export interface ILancamento {
    /**
     * identificador principal
     */
    id?: string;

    /**
     * identificador secundário
     */
    uuid?:string;

    /**
     * Tipo de Lançamento
     */
    tipoLancamento: string;

    /**
     * Nome do Título
     */
    titulo: string;

    /**
     * Descritivo
     */
    descricao: string;

    /**
     * Data
     */
    data: Date;
    
    /**
     * Valor
     */
    valor: number;

    /**
     * Categorias (separado por virgula)
     */
    categorias: string;

    /**
     * Imagem do comprovativo (string base64)
     */
    image: string;

    /**
     * Conta
     */
    conta: IConta;

    /**
     * identificador principal de conta
     */
    contaId: number;    
}