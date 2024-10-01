/**
 * Interface de Conta
 */
export interface IConta {
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
     * Saldo de Lançamentos de Crédito
     */
    saldoCredito: number;

    /**
     * Saldo de Lançamentos de Débito
     */
    saldoDebito: number;

    /**
     * Saldo de Lançamentos Consolidados (Créditos - Débito +- Futuro)
     */
    saldoConsolidado: number;

    /**
     * Identificador de Utilizador
     */
    userId: number;

    /**
     * Identifica se conta está activa
     */
    active: boolean;

    /**
     * Data de criação
     */
    createdAt: Date;

    /**
     * Data de actualização
     */
    updatedAt: Date;

    /**
     * Data de exclusão
     */
    deletedAt: Date;
}