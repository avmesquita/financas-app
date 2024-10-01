import {IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

/**
 * DTO de criação de Utilizador
 */
export class CreateUserDto {

  /**
   * Nome
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  readonly name: string;

  /**
   * E-mail
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  /**
   * Senha
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  /**
   * Tipo de Utilizador (1 = ADMIN, 2 = USER)
   */
  @ApiProperty()
  readonly role: number;
}

/**
 * DTO de actualização de Utilizador
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {

  /**
   * Indica se utilizador está activo
   */
  @ApiProperty()
  readonly active: boolean;

}

/**
 * DTO de Autenticação no sistema
 */
export class LoginUserDto {

  /**
   * E-Mail do Utilizador
   */
  @ApiProperty()
  @IsNotEmpty()
  readonly email: string;

  /**
   * Senha do Utilizador
   */
  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
}

/**
 * DTO de Actualização de Foto do Utilizador
 */
export class UpdateUserPhotoDto {

  /**
   * Identificador primário do Utilizador
   */  
  @ApiProperty()
  readonly id: number;

  /**
   * Foto do Utilizador (string de base64)
   */  
  @ApiProperty()
  readonly image: string;
}
