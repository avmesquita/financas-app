import { ApiProperty, PartialType } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

/**
 * DTO de criação de Autenticação
 */
export class CreateAuthenticationDto {

    /**
     * Identificador secundário de autenticação
     */
    @ApiProperty()
    uuid: string;
    
    /**
     * Token JWT
     */
    @ApiProperty()
    token: string;

    /**
     * Utilizador
     */
    @ApiProperty()
    user: User;
}

/**
 * DTO de actualização de Autenticação
 */
export class UpdateAuthenticationDto extends PartialType(CreateAuthenticationDto) {
    
}
