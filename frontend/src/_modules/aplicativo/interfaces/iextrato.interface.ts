import { ILancamento } from "./ilancamento.interface";

/**
 * Interface de Extrato
 */
export interface IExtrato {
    /**
     * mês
     */
    mes: number;

    /**
     * ano
     */
    ano: number;

    /**
     * Lançamentos
     */
    lancamentos: ILancamento[];

    /**
     * Saldo
     */
    saldo: number;    
}