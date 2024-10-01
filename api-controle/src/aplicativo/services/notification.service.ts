import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from '../entities/notification.entity';
import { CreateNotificationDto, UpdateNotificationDto } from '../dto/notification-dto';
import { ResponseDto } from '../dto/response-dto';
import { IResponse } from '../interfaces/iresponse.interface';

/**
 * Notification Service
 */
@Injectable()
export class NotificationService {
  
   /**
    * Injeção de Dependencia pelo constructor
    * 
    * @param {Repository<Notification>} repository Repositório de Dados de Notificação
    */
   constructor(
    @InjectRepository(Notification)
    private readonly repository: Repository<Notification>
    ) {
  }

  /**  
   * Obtém todas as notificações
   * 
   * @returns {Notification[]} Notificações
   */
  async getAll(): Promise<IResponse> {    
    try {
      const response = new ResponseDto();
      response.success = true;      
      response.data = await this.repository.find({
        select: {
           id: true,
           uuid: true,
           message: true,
           createdAt: true,
           updatedAt: true          
        },
        order: {
          createdAt: 'DESC'
        },
        cache: true
      });
      response.error = null;
      response.message = '';
      return response;
    } catch (error) {
      return { success: false, data: null, message: 'Error occurred.', error: error };      
    }
  }

  /**  
   * Obtém uma notificação por id
   * 
   * @returns {Notification} Notificações
   */
  async getById(id: number): Promise<IResponse> {
    try {
      const response = new ResponseDto();
      response.success = true;      
      response.data = await this.repository.findOneBy({
        id: id,
      });  
      response.error = null;
      response.message = '';
      return response;
    } catch (error) {
      return { success: false, data: null, message: 'Error occurred.', error: error };      
    }
  }

  /**  
   * Obtém uma notificação por uuid
   * 
   * @returns {Notification} Notificações
   */
  async getByGuid(uuid: string): Promise<IResponse> {
    try {
      const response = new ResponseDto();
      response.success = true;      
      response.data = await this.repository.findOneBy({
        uuid: uuid,
      });
      response.error = null;
      response.message = '';
      return response;
    } catch (error) {
      return { success: false, data: null, message: 'Error occurred.', error: error };      
    }
  }

  /**  
   * Obtém todas as notificações de um utilizador
   * 
   * @param {number} idUser código único do Utilizador
   * @returns {Notification[]} Notificações
   */  
  async getNotificationsToUser(idUser: number): Promise<IResponse> {
    try {
        const response = new ResponseDto();
        response.success = true;      
        response.data = await this.repository.findBy({ userId: idUser });
        response.error = null;
        response.message = '';
        return response;
    } catch (error) {
        return { success: false, data: null, message: 'Error occurred.', error: error };      
    }    
  }

  /**  
   * Criar uma notificação
   * 
   * @param {CreateNotificationDto} dto DTO de criação de Notificação
   * @returns {Notification} Notificação
   */  
  async create(dto: CreateNotificationDto): Promise<IResponse> {
    try {
      const response = new ResponseDto();

      const entity = new Notification();
      entity.message = dto.message;      
      entity.userId = dto.userId;
  
      const result = await this.repository.save(entity);
      if (result.id) {
        response.success = true;
        response.message = 'record has been created';
        response.data = result;
        response.error = null;
      } else {
        response.success = false;
        response.message = 'record cant be created';
        response.data = result;
        response.error = null;          
      }
      return response;      
  } catch (error) {
      return { success: false, message: 'record cant be created', data: null, error: error };  
  }
}

  /**  
   * Actualizar uma notificação
   * 
   * @param {string} uuid código primário alternativo da Notificação
   * @param {UpdateNotificationDto} dto DTO de actualização de Notificação
   * @returns {Notification} Notificação
   */  
  async update(uuid: string, dto: UpdateNotificationDto): Promise<IResponse> {
    try {
      const response = new ResponseDto();

      const entityToUpdate = await this.repository.findOneBy({uuid: uuid});
    
      entityToUpdate.message = (entityToUpdate.message !== dto.message) && dto.message.length > 0 ? dto.message : entityToUpdate.message;      
      entityToUpdate.userId = dto.userId;
  
      const result = this.repository.save(entityToUpdate);
      response.success = true;
      response.data = result;
      response.message = 'record has been updated';
      response.error = null;        
      return response;
    } catch (error) {
      return {success: false, message: 'record cant be updated', data: null, error: error };  
    }
  }

  /**  
   * Excluir uma notificação
   * 
   * @param {string} uuid código primário alternativo da Notificação
   * @returns {Notification} Notificação
   */      
  async delete(uuid: string): Promise<IResponse> {
    try {
      const response = new ResponseDto();
      const result = await this.repository.delete( { uuid: uuid } );
      if (result.affected && result.affected > 0) {
        response.success = true;
        response.data = result.affected;
        response.message = 'record has been deleted';
        response.error = result.raw;
      } else {
        response.success = false;
        response.data = result.affected;
        response.message = 'record cant be deleted';
        response.error = result.raw;          
      }
      return response;
    } catch (error) {
      return {success: false, message: 'record cant be deleted', data: null, error: error };
    }
  }
}
