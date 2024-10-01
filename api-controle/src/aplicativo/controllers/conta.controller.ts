import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Get, Put, Post, Delete } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Param, Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { IResponse } from '../interfaces/iresponse.interface';
import { ResponseDto } from '../dto/response-dto';
import { Conta } from '../entities/conta.entity';
import { ContaService } from '../services/conta.service';
import { CreateContaDto, UpdateContaDto } from '../dto/conta-dto';

/**
 * Controlador de Conta
 */
@ApiTags('Account')
@ApiExtraModels(ResponseDto)
@ApiExtraModels(Conta)
@Controller('account')
export class ContaController {

  /**
   * Injeção de Dependencia pelo constructor
   * 
   * @param {ContaService} Serviço de Contas
   */
  constructor(
    private readonly service: ContaService
  ) { }
 
  /**
   * Obter todas as contas por Utilizador
   * 
   * @param {number} id identificador primário de Utilizador
   * @returns {Conta[]} Contas
   */  
  @ApiBearerAuth()
  @Get('getAllByUserId/:id')
  async getByUserId(@Param('id') id: number): Promise<IResponse> {
    const result = await this.service.getAllByUserId(id);
    return result;
  }

  /**
   * Obter Conta pelo identificador primário
   * 
   * @param {number} id identificador primário de Conta
   * @returns {Conta} Conta
   */  
  @ApiBearerAuth()
  @Get('getById/:id')
  async findById(@Param('id') id: number): Promise<IResponse> {
    const result = await this.service.getById(id);
    return result;
  }

  /**
   * Actualizar a Conta
   * 
   * @param {UpdateContaDto} dto DTO de actualização de Conta
   * @returns {Conta} Conta
   */  
  @ApiBearerAuth()
  @Put()
  async update(@Body() dto: UpdateContaDto): Promise<IResponse> {
    return await this.service.update(dto.uuid, dto);
  }

  /**
   * Criar uma Conta
   * 
   * @param {CreateContaDto} dto DTO de criação de Conta
   * @returns {Conta} Conta
   */
  @ApiBearerAuth()
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateContaDto): Promise<IResponse> {
    return await this.service.create(dto);
  }

  /**
   * Excluir o Lançamento
   * 
   * @param {string} uuid Identificador secundário
   * @returns {Conta} Conta
   */  
  @ApiBearerAuth()
  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string): Promise<IResponse> {
    return await this.service.delete(uuid);
  }

}

