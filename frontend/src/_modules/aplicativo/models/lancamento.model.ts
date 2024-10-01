import { IConta } from "../interfaces/iconta.interface";
import { ILancamento } from "../interfaces/ilancamento.interface";

/**
 * Entidade Lançamento
 */
export class Lancamento implements ILancamento {

    /**
     * Identificador principal
     */
    id?: string;

    /**
     * Identificador secundário
     */
    uuid?: string;

    /**
     * Data
     */
    data: Date;    

    /**
     * Nome do Título a Receber/Pagar
     */
    titulo: string;

    /**
     * Descrição do Título
     */
    descricao: string;

    /**
     * Valor
     */
    valor: number;

    /**
     * Categorias (separado por vírgula)
     */
    categorias: string;

    /**
     * Imagem do Comprovativo (string base64)
     */
    image: string;

    /**
     * Tipo de Lançamento
     */
    tipoLancamento: string;

    /**
     * Conta do Lançamento
     */
    conta: IConta;

    /**
     * Identificador primário de conta
     */
    contaId: number;

    /**
     * Data de Criação
     */
    createdAt: Date;

    /**
     * Data de Actualização
     */
    updatedAt: Date;

    /**
     * Data de Exclusão
     */
    deletedAt: Date;

    /**
     * Constructor
     */
    constructor() {        
        this.data = new Date();
        this.tipoLancamento = "D";
        this.titulo = "";
        this.descricao = "";
        //this.valor = 0;
        this.categorias = '';
        this.image = '';        
    }
}