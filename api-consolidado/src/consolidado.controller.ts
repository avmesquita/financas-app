import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { ConsolidadoService } from './consolidado.service';

/**
 * Controlador de Consolidado
 */
@ApiTags('Consolidated')
@ApiBearerAuth()
@Controller('consolidated')
export class ConsolidadoController {

  /**
   * Injeção de Dependencia pelo constructor
   * 
   * @param {ConsolidadoService} Serviço de Consolidação
   */
  constructor(
    private readonly service: ConsolidadoService
  ) { }
 
  /**
   * Obter os saldos de credito e debito de uma conta
   * 
   * @param accountId Identificador Primário da Conta
   * @returns 
   */
  @Get('getAccountBalance/:accountId')
  async getAccountBalance(@Param('accountId') accountId: number): Promise<any> {
    const result = await this.service.getAccountBalance(accountId.toString());
    return result;
  }

  /**
   * Obter os saldos de credito e debito de uma conta até a data atual
   * 
   * @param accountId Identificador Primário da Conta
   * @returns 
   */
  @Get('getAccountBalanceToday/:accountId')
  async getAccountBalanceToday(@Param('accountId') accountId: number): Promise<any> {
    const result = await this.service.getAccountBalanceToday(accountId.toString());
    return result;
  }  

  /**
   * Obter os saldos de credito e debito das contas de um utilizador
   * 
   * @param userId Identificador Primário do Utilizador
   * @returns 
   */
  @Get('getUserAccountsBalance/:userId')
  async getUserAccountsBalance(@Param('userId') userId: number): Promise<any> {
    const result = await this.service.getUserAccountsBalance(userId.toString());
    return result;
  }




}

