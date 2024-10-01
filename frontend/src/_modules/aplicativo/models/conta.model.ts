import { IConta } from "../interfaces/iconta.interface";
import { ILancamento } from "../interfaces/ilancamento.interface";

/**
 * Entidade Conta
 */
export class Conta implements IConta {
    /**
     * identificador principal
     */
    id?: string;    

    /**
     * identificador secundário
     */
    uuid?: string;

    /**
     * Nome da Conta
     */
    nome: string;

    /**
     * Descritivo da Conta
     */
    descricao: string;

    /**
     * Lançamentos da Conta
     */
    lancamentos: ILancamento[];    

    /**
     * Saldo de Lançamentos de Credito
     */
    saldoCredito: number;

    /**
     * Saldo de Lançamentos de Débito
     */
    saldoDebito: number;

    /**
     * Saldo Consolidado (Créditos - Débitos +- Futuro)
     */
    saldoConsolidado: number;

    /**
     * identificador de utilizador
     */
    userId: number;

    /**
     * Identifica se conta esta activa
     */
    active: boolean;
    
    /**
     * Data de Criação
     */
    createdAt: Date;

    /**
     * Data de Actualização
     */
    updatedAt: Date;

    /**
     * Data de exclusão
     */
    deletedAt: Date;

    /**
     * Constructor
     */
    constructor() {        
        this.nome = "Conta Padrão";
        this.descricao = "Uma conta padrão é um conjunto de lançamentos de débitos e de créditos.";
        this.lancamentos = [];        
        this.saldoCredito = 0;
        this.saldoDebito = 0;        
        this.saldoConsolidado = 0;
    }    

}