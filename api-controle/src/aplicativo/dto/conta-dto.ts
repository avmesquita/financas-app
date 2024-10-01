import { ApiProperty, PartialType } from "@nestjs/swagger";

/**
 * DTO de criação de Conta
 */
export class CreateContaDto {

    /**
     * Nome da Conta
     */
    @ApiProperty()
    nome: string;

    /**
     * Descrição
     */
    @ApiProperty()    
    descricao: string;

    /**
     * Saldo de Créditos da Conta
     */
    @ApiProperty()    
    saldoCredito: number;

    /**
     * Saldo de Débitos da Conta
     */    
    @ApiProperty()    
    saldoDebito: number;

    /**
     * Saldo de Lançamentos maior que data actual
     */    
    @ApiProperty()    
    saldoFuturo: number;

    /**
     * Saldo consolidado de Crédito - Débitos +- Futuro
     */
    @ApiProperty()    
    saldoConsolidado: number;

    /**
     * Identificador primário do Utilizador
     */    
    @ApiProperty()
    userId: number

}

/**
 * DTO de actualização de Conta
 */
export class UpdateContaDto extends PartialType(CreateContaDto) {

    /**
     * Identificador secundário de Conta
     */    
    @ApiProperty()
    uuid?: string;

}
