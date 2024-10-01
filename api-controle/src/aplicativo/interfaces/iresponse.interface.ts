/**
 * Interface de Resposta da API
 */
export interface IResponse {

    /**
     * Sucesso/Falha
     */
    success: boolean;

    /**
     * Mensagem de resposta, caso exista
     */
    message: string;

    /**
     * Dados de resposta :: Array ou Objeto
     */
    data: any | any[];

    /**
     * Objeto de erro
     */
    error: any;
}