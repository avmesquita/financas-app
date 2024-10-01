import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

/**
 * DTO de criação de Notificação
 */
export class CreateNotificationDto {

    /**
     * Mensagem
     */
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    message: string;

    /**
     * Identificador primário de Utilizador, caso exista
     */
    @ApiProperty()
    userId?: number | null;
}

/**
 * DTO de actualização de Notificação
 */
export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {

    /**
     * Identificador secundário de Notificação
     */    
    @ApiProperty()
    uuid?: string;
    
}
