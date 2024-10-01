import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { Authentication } from '../entities/authentication.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthenticationDto, UpdateAuthenticationDto } from '../dto/authentication-dto';
import { ResponseDto } from '../dto/response-dto';
import { IResponse } from '../interfaces/iresponse.interface';
import { compare } from 'bcrypt';

/**
 * Serviço de Autenticação
 **/
@Injectable()
export class AuthenticationService {

   /**
    * Injeção de Dependencia pelo constructor
    * 
    * @param {Repository<Authentication>} repository Repositório de Dados de Autenticação
    */
    constructor(
        @InjectRepository(Authentication)
          private readonly repository: Repository<Authentication>,      
        private usersService: UserService,
        private jwtService: JwtService,
      ) {

    }
    
  /**
   * Autenticar Utilizador
   * 
   * @param {string} username conta de e-email do utilizador
   * @param {string} pass senha de acesso do utilizador
   * @returns {CreateAuthenticationDto} DTO de Autenticação
   */
    async signIn(username, pass) {        
        try {                    
          const user = await this.usersService.findSignIn(username);          
          if (user) {
            const validate = await compare(pass, user.password);
            if (!validate) {
              throw new UnauthorizedException();
            }
            const payload = { sub: user, username: user.email, role: user.role };
                
            try {
              const access_token = this.jwtService.sign(payload);              
              const dto = new CreateAuthenticationDto();
              dto.token = access_token;
              dto.user = user;
              await this.create(dto);
              return dto;
            } catch (error) {
              const dto = new CreateAuthenticationDto();
              dto.token = error;
              dto.user = null;
              return dto;  
            }
            
          } else {
            throw new UnauthorizedException();
          }            
        } catch (error) {
          throw new UnauthorizedException(error);
        }
    }

  /**   
   * Retorna o utilizador autenticado
   * 
   * @param {any} me
   */    
    async me(user: any): Promise<IResponse> {
      /* lookupAll() gets all data only active is true */
      try {
        const response = new ResponseDto();
        response.success = true;      
        response.data = await this.repository.find({
          select: {
             id: true,
             uuid: true,
             token: true,
             createdAt: true,
             updatedAt: true,
             deletedAt: true,             
          },
          relations: {
            user: true
          },
          where: {
            user: user
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
   * Obter autenticação por identificador primário
   * 
   * @param {number} id identificador principal da autenticação
   * @returns {Authentication} Autenticação
   */    
    async getById(id: number): Promise<Authentication> {
      return await this.repository.findOneBy({
        id: id,
      });
    }
  
  /**
   * Obter Autenticação por uuid
   * 
   * @param {string} uuid identificador secundário do utilizador
   * @returns {Authentication} Autenticação
   */    
    async getByGuid(uuid: string): Promise<Authentication> {
      return await this.repository.findOneBy({
        uuid: uuid,
      });
    }
  
  /**
   * Criar autenticação
   * 
   * @param {CreateAuthenticationDto} dto DTO de criação de registo da autenticação
   * @returns {Authentication} Autenticação
   */    
    async create(dto: CreateAuthenticationDto): Promise<IResponse> {  
      try {
        const response = new ResponseDto();

        const entity = new Authentication();
        entity.token = dto ? dto.token : '';
        entity.userId = dto ? dto.user.id : 0;
  
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
   * Actualizar autenticação
   * 
   * @param {string} uuid identificador secundário do utilizador
   * @param {UpdateAuthenticationDto} dto DTO de actualização de registo da autenticação
   * @returns {Authentication} Autenticação
   */    
    async update(uuid: string, dto: UpdateAuthenticationDto): Promise<IResponse> {  
      try {
        const response = new ResponseDto();

        const entityToUpdate = await this.repository.findOneBy({uuid: uuid});
      
        entityToUpdate.token = (entityToUpdate.token !== dto.token) && dto.token.length > 0 ? dto.token : entityToUpdate.token;
  
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
   * Excluir autenticação
   * 
   * @param {string} uuid identificador secundário do utilizador
   * @returns {Authentication} Autenticação
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

  /**
   * Obter Utilizador autenticado
   *
   * @param {string} email conta de e-mail do utilizador
   * @param {string} plainTextPassword senha de acesso do utilizador
   * @returns {User} Utilizador
   */    
    public async getAuthenticatedUser(email: string, plainTextPassword: string) {
      try {
        const user = await this.usersService.findSignIn(email);
        await this.verifyPassword(plainTextPassword, user.password);
        user.password = undefined;
        return user;
      } catch (error) {
        throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
      }
    }

    /**
     * Validar senha
     *
     * @param {string} plainTextPassword senha de acesso do utilizador
     * @param {string} hashedPassword senha criptografada
     */    
    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
      const isPasswordMatching = await compare(
        plainTextPassword,
        hashedPassword
      );
      if (!isPasswordMatching) {
        throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
      }
    }    
  }