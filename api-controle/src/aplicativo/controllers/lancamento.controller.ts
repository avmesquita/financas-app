import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Get, Put, Post, Delete } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Param, Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { IResponse } from '../interfaces/iresponse.interface';
import { ResponseDto } from '../dto/response-dto';
import { Lancamento } from '../entities/lancamento.entity';
import { LancamentoService } from '../services/lancamento.service';
import { CreateLancamentoDto, UpdateLancamentoDto } from '../dto/lancamento-dto';

/**
 * Controlador de Lançamento
 */
@ApiTags('Accounting Entry')
@ApiExtraModels(ResponseDto)
@ApiExtraModels(Lancamento)
@Controller('entry')
export class LancamentoController {

    /**
   * Injeção de Dependencia pelo constructor
   * 
   * @param {LancamentoService} Serviço de Lançamentos
   */
  constructor(
    private readonly service: LancamentoService
  ) { }
 
  /**
   * Obtem todos os Lançamentos de uma Conta
   * 
   * @param {number} id código de identificação primário de Conta
   * @returns {Lancamento[]}
   */
  @ApiBearerAuth()
  @Get('getByAccount/:id')
  async getByAccount(@Param('id') id: number): Promise<IResponse> {
    const result = await this.service.getByAccount(id);
    return result;
  }

  /**
   * Obtém um Lannçamento
   * 
   * @param {number} id Identificador primário do Lançamento
   * @returns {Lancamento} Lançamento
   */  
  @ApiBearerAuth()
  @Get('getById/:id')
  async findById(@Param('id') id: number): Promise<IResponse> {
    const result = await this.service.getById(id);
    return result;
  }

  /**
   * Actualizar o Lançamento
   * 
   * @param {UpdateLancamentoDto} dto DTO de actualização de Lançamento
   * @returns {Lancamento} Lançamento
   */  
  @ApiBearerAuth()
  @Put()
  async update(@Body() dto: UpdateLancamentoDto): Promise<IResponse> {
    return await this.service.update(dto.uuid, dto);
  }

  /**
   * Criar o Lançamento
   * 
   * @param {CreateLancamentoDto} dto DTO de criação de Lançamento
   * @returns {Lancamento} Lançamento
   */
  @ApiBearerAuth()
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateLancamentoDto): Promise<IResponse> {    
    return await this.service.create(dto);
  }

  /**
   * Excluir o Lançamento
   * 
   * @param {string} uuid Identificador secundário
   * @returns {Lancamento} Lançamento
   */  
  @ApiBearerAuth()
  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string): Promise<IResponse> {
    return await this.service.delete(uuid);
  }

}

