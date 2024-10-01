import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Get, Put, Post, Delete } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Param, Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../entities/notification.entity';
import { CreateNotificationDto, UpdateNotificationDto } from '../dto/notification-dto';
import { IResponse } from '../interfaces/iresponse.interface';
import { ResponseDto } from '../dto/response-dto';

/**
 * Controlador de Notificação
 */
@ApiExtraModels(ResponseDto)
@ApiExtraModels(Notification)
@ApiTags('Notification')
@Controller('notification')
export class NotificationController {

  /**
   * Injeção de Dependencia pelo constructor
   * 
   * @param {NotificationService} Serviço de Notificação
   */
  constructor(
    private readonly service: NotificationService
  ) { }

  /**
   * Obter todas as notificações
   * 
   * @returns {Notification[]} Notificações
   */
  @ApiBearerAuth()
  @Get()
  async getAll(): Promise<IResponse> {
    const result = await this.service.getAll();
    return result;
  }

  /**
   * Obter Notificação pelo identificador secundário
   * 
   * @param   {string}      uuid código de identificação secundário
   * @returns {Notificacao}
   */
  @ApiBearerAuth()
  @Get('getByGuid/:uuid')
  async findOne(@Param('uuid') uuid: string): Promise<IResponse> {
    return await this.service.getByGuid(uuid);
  }
  
  /**
   * Obter Notificação pelo identificador primário
   * 
   * @param {number} id código identificador primário
   * @returns {Notification}
   */
  @ApiBearerAuth()
  @Get('getById/:id')
  async findById(@Param('id') id: number): Promise<IResponse> {
    return await this.service.getById(id);
  }

  /**
   * Obter Notificações de um utilizador
   * 
   * @param {number} idUser código de identificação primário do Utilizador
   * @returns {Notification[]} Notificações
   */
  @ApiBearerAuth()
  @Get('getNotificationsToUser')
  async getNotificationsToUser(@Param('idUser') idUser: number): Promise<IResponse> {
    return await this.service.getNotificationsToUser(idUser);
  }

  /**
   * Actualizar Notificação
   * 
   * @param {string} uuid código de identificação secundário
   * @param {UpdateNotificationDto} dto DTO de actualização de Notificação
   * @returns 
   */
  @ApiBearerAuth()
  @Put()
  async update(@Param('uuid') uuid: string, @Body() dto: UpdateNotificationDto): Promise<IResponse> {
    return await this.service.update(uuid, dto);
  }

  /**
   * Criar Notificação
   * 
   * @param {CreateNotificationDto} dto DTO de criação de Notificação
   * @returns {Notification} Notificação
   */
  @ApiBearerAuth()
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateNotificationDto): Promise<IResponse> {
    return await this.service.create(dto);
  }

  /**
   * Excluir uma notificação
   * 
   * @param {string} uuid código de identificação secundário
   * @returns {Notification} Notificação
   */
  @ApiBearerAuth()
  @Delete()
  async delete(@Param('uuid') uuid: string): Promise<IResponse> {
    return await this.service.delete(uuid);
  }
}
