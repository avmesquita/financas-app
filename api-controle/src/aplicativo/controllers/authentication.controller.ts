import { Controller, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignInDto } from '../dto/sign-in-dto';
import { Get, Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { IResponse } from '../interfaces/iresponse.interface';

/**
 * Controlador de Autenticação
 */
@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {

  /**
   * Injeção de Dependencia pelo constructor
   * 
   * @param {AuthenticationService} Serviço de Autenticação
   */
  constructor(private service: AuthenticationService) {}

  /**
   * Autenticação do Utilizador
   * 
   * @param {SignInDto} dto DTO de Autenticação
   * @returns {User} Utilizador com token JWT
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() dto: SignInDto) {
    return this.service.signIn(dto.username, dto.password);
  }

  /**
   * Obtém o Utilizador logado
   * 
   * @param req Requisição (Parâmetro automático)
   * @returns {User} Utilizador
   */
  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  
  /**
   * Obtém o Utilizador logado
   * 
   * @param req Requisição (Parâmetro automático)
   * @returns {User} Utilizador
   */  
  @ApiBearerAuth()
  @Get('me')
  async me(@Request() req): Promise<IResponse> {
    const result = await this.service.me(req.user);
    return result;
  }

}