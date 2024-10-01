import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from '../dto/response-dto';
import { IResponse } from '../interfaces/iresponse.interface';
import { Lancamento } from '../entities/lancamento.entity';
import { CreateLancamentoDto, UpdateLancamentoDto } from '../dto/lancamento-dto';

/**
 * Serviço de Lançamentos
 **/
@Injectable()
export class LancamentoService {

   /**
    * Injeção de Dependencia pelo constructor
    * 
    * @param {Repository<Lancamento>} repository Repositório de Dados de Lançamento
    */
   constructor(
    @InjectRepository(Lancamento)
    private readonly repository: Repository<Lancamento>,
    private dataSource: DataSource
    ) {
  }

  /**  
   * Obtém todas os lançamentos de uma conta
   * 
   * @param {number} contaId código primário da Conta
   * @returns {Lancamento[]} Lancamentos
   */  
  async getByAccount(contaId: number): Promise<IResponse> {    
    try {
      const response = new ResponseDto();
      response.success = true;      
      response.data = await this.repository.find({
        select: {
           id: true,
           uuid: true,  
           tipoLancamento: true,
           titulo: true,
           descricao: true,
           data: true,
           valor: true,
           categorias: true,
           image: true,
           contaId: true
        },
        relations: {
          conta: true
        },
        where: {
          contaId: contaId
        },
        order: {
          data: 'DESC'
        },
        cache: false
      });
      response.error = null;
      response.message = '';
      return response;
    } catch (error) {
      return { success: false, data: null, message: 'Error occurred.', error: error };      
    }
  }

  /**  
   * Obter um Lançamento
   * 
   * @param {id} id código primário de Lançamento
   * @returns {Lancamento} Lançamento
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
   * Obter um Lançamento
   * 
   * @param {uuid} id código primário alternativo de Lançamento
   * @returns {Lancamento} Lançamento
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
   * Criar um lançamento
   * 
   * @param {CreateLancamentoDto} dto DTO de criação de Lançamento
   * @returns {Lancamento} Lançamento
   */  
  async create(dto: CreateLancamentoDto): Promise<IResponse> {
    try {
      const response = new ResponseDto();

      const entity = new Lancamento();

      entity.tipoLancamento = dto.tipoLancamento;
      entity.titulo = dto.titulo;
      entity.descricao = dto.descricao;
      entity.data = new Date(dto.data);
      entity.valor = dto.valor
      entity.categorias = dto.categorias;
      entity.image = dto.image;
      entity.contaId = dto.contaId;  
  
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        const result = await queryRunner.manager.save(Lancamento, entity, { transaction: true });
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
   * Actualizar um lançamento
   * 
   * @param {string} uuid código primário alternativo da Lançamento
   * @param {UpdateLancamentoDto} dto DTO de actualização de Lançamento
   * @returns {Lancamento} Lançamento
   */  
  async update(uuid: string, dto: UpdateLancamentoDto): Promise<IResponse> {
    try {
      const response = new ResponseDto();

      if (uuid) {
        const entityToUpdate = await this.repository.findOneBy({uuid: uuid});

        entityToUpdate.tipoLancamento = dto.tipoLancamento;
        entityToUpdate.titulo = dto.titulo;
        entityToUpdate.descricao = dto.descricao;
        entityToUpdate.data = new Date(dto.data);
        entityToUpdate.valor = dto.valor
        entityToUpdate.categorias = dto.categorias;
        entityToUpdate.image = dto.image;
        entityToUpdate.contaId = dto.contaId;
    
        const result = this.repository.save(entityToUpdate);
        response.success = true;
        response.data = result;
        response.message = 'record has been updated';
        response.error = null;                
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
   * Excluir um lançamento
   * 
   * @param {string} uuid código primário alternativo de Lançamento
   * @returns {Lancamento} Lançamento
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
        response.error = null;
      }
      return response;
    } catch (error) {
      return {success: false, message: 'record cant be deleted', data: null, error: error };
    }
  }
}
