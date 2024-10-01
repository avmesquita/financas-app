import { ApiProperty } from "@nestjs/swagger";
import { IResponse } from "../interfaces/iresponse.interface";

/**
 * Objeto de Resposta da API
 * 
 * Havendo sempre resposta evita que erros sejam emitidos para fora do aplicativo, 
 * maximizando o tempo de resposta.
 */
export class ResponseDto implements IResponse {

    /**
     * Sucesso/Falha
     */
    @ApiProperty()
    success: boolean;

    /**
     * Mensagem de resposta, caso exista
     */    
    @ApiProperty()
    message: string;

    /**
     * Dados de resposta :: Array ou Objeto
     */
    @ApiProperty()
    data: any;

    /**
     * Objeto de erro
     */
    @ApiProperty()
    error: any;        

    /**
     * Inicializa os atributos
     */
    constructor() {
        this.success = false;
        this.message = '';
        this.data = null;
        this.error = null;
    }    
}
