import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from '../dto/response-dto';
import { IResponse } from '../interfaces/iresponse.interface';
import { Conta } from '../entities/conta.entity';
import { CreateContaDto, UpdateContaDto } from '../dto/conta-dto';

/**
 * Serviço de Contas
 **/
@Injectable()
export class ContaService {

   /**
    * Injeção de Dependencia pelo constructor
    * 
    * @param {Repository<Conta>} repository Repositório de Dados de Conta
    */  
  constructor(
    @InjectRepository(Conta)
    private readonly repository: Repository<Conta>,
    private dataSource: DataSource
    ) {
  }

  /**
   * Obter todas as contas do utilizador
   * 
   * @param {number} id identificador do utilizador
   * @returns {Conta[]} Contas
   */    
  async getAllByUserId(id: number): Promise<IResponse> {
    try {
      const response = new ResponseDto();
      response.success = true;      
      response.data = await this.repository.find({
        select: {
           id: true,
           uuid: true,  
           nome: true,
           descricao: true,
           
           userId: true,

           active: true,

           saldoConsolidado: true,
           saldoCredito: true,
           saldoDebito: true,
           saldoFuturo: true,

           createdAt: true,
           updatedAt: true,
           deletedAt: true,

        },
        where: {
          userId: id
        },
        relations: {
          lancamentos: true
        },
        order: {
          nome: 'DESC'
        },
        cache: false
      });
      response.error = null;
      response.message = '';
      return response;
    } catch (error) {
      return { success: false, data: null, message: 'Error occurred.', error: error };      
    }  }

  /**
   * Obter uma conta por id
   * 
   * @param {number} id identificador da conta
   * @returns {Conta} Conta
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
   * Obter uma conta por guid
   * 
   * @param {string} uuid identificador secundário da conta
   * @returns {Conta} Conta
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
   * Criar uma conta
   * 
   * @param {CreateContaDto} dto DTO de criação de conta
   * @returns {Conta} Conta
   */        
  async create(dto: CreateContaDto): Promise<IResponse> {
    try {
      const response = new ResponseDto();

      const entity = new Conta();

      entity.nome = dto.nome;
      entity.descricao = dto.descricao;
      entity.saldoCredito = dto.saldoCredito;
      entity.saldoDebito = dto.saldoDebito;
      entity.saldoFuturo = dto.saldoFuturo;
      entity.saldoConsolidado = dto.saldoConsolidado;
      entity.userId = dto.userId;
  
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        const result = await queryRunner.manager.save(Conta, entity, { transaction: true });
        await queryRunner.commitTransaction();
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
      } catch (error) {
        await queryRunner.rollbackTransaction();

        response.success = false;
        response.message = 'record cant be created';
        response.data = null;
        response.error = error;

        return response;
      }
      finally {
        await queryRunner.release();
      }
      return response;
  } catch (error) {
      return { success: false, message: 'record cant be created', data: null, error: error };  
  }
}

  /**
   * Actualizar uma conta      
   * 
   * @param {string} uuid identificador secundário do utilizador
   * @param {UpdateContaDto} dto DTO de criação de conta
   * @returns {Conta} Conta
   */        
   async update(uuid: string, dto: UpdateContaDto): Promise<IResponse> {
    try {
      const response = new ResponseDto();

      if (dto.uuid && dto?.uuid?.length > 0) {        

        const entityToUpdate = await this.repository.findOneBy({uuid: uuid});
    
        entityToUpdate.nome = dto.nome;
        entityToUpdate.descricao = dto.descricao;        
    
        const result = this.repository.save(entityToUpdate);
        response.success = true;
        response.data = result;
        response.message = 'record has been updated';
        response.error = null;        
        return response;  
      } else {
        response.success = false;
        response.data = null;
        response.message = 'missing identifier';
        response.error = null;        
      }
      return response;
    } catch (error) {
      return {success: false, message: 'record cant be updated', data: null, error: error };  
    }
  }

  /**
   * Excluir uma conta
   * 
   * @param {string} uuid identificador secundário do utilizador
   * @returns {Conta} Conta
   */        
  async delete(uuid: string): Promise<IResponse> {
    try {
      const response = new ResponseDto();
      if (uuid && uuid.length > 0) {
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
      } else {
        response.success = false;
        response.data = null;
        response.message = 'missing identifier';
        response.error = null
      }
      return response;
    } catch (error) {
      return {success: false, message: 'record cant be deleted', data: null, error: error };
    }
  }
}
