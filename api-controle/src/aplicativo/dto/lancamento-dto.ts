import { ApiProperty, PartialType } from "@nestjs/swagger";

/**
 * DTO de criação de Lançamento
 */
export class CreateLancamentoDto {

    /**
     * Tipo de Lançamento
     */
    @ApiProperty()    
    tipoLancamento: string;

    /**
     * Nome do Título
     */
    @ApiProperty()    
    titulo: string;
    
    /**
     * Descrição
     */
    @ApiProperty()    
    descricao: string;

    /**
     * Data
     */
    @ApiProperty()    
    data: Date;

    /**
     * Valor
     */
    @ApiProperty()    
    valor: number;

    /**
     * Categorias (separado por vírgula)
     */
    @ApiProperty()    
    categorias: string;

    /**
     * Imagem (string base 64)
     */
    @ApiProperty()    
    image: string;

    /**
     * Identificador de Conta
     */    
    @ApiProperty()
    contaId: number;
}

/**
 * DTO de actualização de Lançamento
 */
export class UpdateLancamentoDto extends PartialType(CreateLancamentoDto) {
  
    /**
     * Identificador secundário de Lançamento
     */
    @ApiProperty()
    uuid?: string;
  
}
