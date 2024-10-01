import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

/**
 * DTO de entrada no sistema
 */
export class SignInDto {

    /**
     * E-mail do Utilizador
     */
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    username: string;

    /**
     * Senha do Utilizador
     */
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}