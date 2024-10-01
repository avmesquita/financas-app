import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto, UpdateUserPhotoDto } from '../dto/user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare, genSalt} from "bcrypt";
import { IResponse } from '../interfaces/iresponse.interface';
import { ResponseDto } from '../dto/response-dto';

/**
 * Serviço do Utilizador
 */
@Injectable()
export class UserService {
  
   /**
    * Injeção de Dependencia pelo constructor
    * 
    * @param {Repository<User>} repository Repositório de Dados de Utilizador
    */
   constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
    ) {

  }

 /**  
  * Obter todos os utilizadores activos
  * 
  * @returns {User[]} Utilizadores Ativos
  */
  async getAll(): Promise<IResponse> {  
    try {
      const response = new ResponseDto();
      response.success = true;      
      response.data = await this.repository.find({
        select: {
          id: true,
          uuid: true,
          name: true,
          role: true,
          email: true,                    
          createdAt: true,
          updatedAt: true
        },
        where: {
          active: true
        },
        order: {          
          name: 'ASC'
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
   * Obter Utilizador por código de identificador primário
   * 
   * @param {number} id  Código interno primário do Utilizador
   * @returns {User} Utilizador
   */
  async getById(id: number): Promise<IResponse> {  
    try {
      const response = new ResponseDto();
      response.success = true;      
      response.data = await this.repository.find({
        select: {
          id: true,
          uuid: true,
          name: true,
          role: true,
          email: true,                    
          createdAt: true,
          updatedAt: true
        },
        where: {
          id: id
        },
        relations: {
          contas: true,
        },
        order: {          
          name: 'ASC'
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
   * Obtém um Utilizador por email
   * 
   * @param {email} email  Conta de e-mail do utilizador
   * @returns {User} Utilizador
   */
  async findOne(email: string): Promise<User> {    
    return await this.repository.findOneBy({ email: email });
  }

 /**  
  * Obtém a foto do Utilizador por id
  * 
  * @param {number} id  código interno do Utilizador
  * @returns {User} Imagem do Utilizador
  */
  async findUserPhoto(id: number): Promise<User> {
    const users = await this.repository.find(
      {
        select: { image: true },
        where: { id: id },                
      }
    );    
    if (users && users.length > 0) return users[0]; else return null;    
  }

  /**  
   * Obtém o Utilizador por email
   * 
   * @param {email} email  conta de e-mail do utilizador
   * @returns {User} Utilizador
   */
  async findSignIn(email: string): Promise<User> {
    const users = await this.repository.find(
      {
        select: { id: true, uuid: true, name: true, email: true, role: true, createdAt: true, password: true },
        where: { email: email },                
      }
    );    
    if (users && users.length > 0) return users[0]; else return null;
  }

 /**  
  * Obtém o Utilizador por código primário
  * 
  * @param {number} id  código interno do utilizador
  * @returns {User} Utilizador
  */
  async findById(id: number): Promise<User> {
    return await this.repository.findOneBy({ id: id });
  }

  /**  
   * Compara a senha do utilizador com a senha hashed
   * 
   * @returns {boolean} ResponseDTO => response.data = true/false
   */
  async validatePassword(plain: string, hash: string): Promise<IResponse> {
    const isPasswordMatching = await compare(plain, hash);  
    const response = new ResponseDto();
    response.success = true;
    response.message = "is Password Matching";
    response.data = isPasswordMatching;
    return response;
  }

  /**  
   * Valida a senha do Utilizador
   * 
   * @param {number} id  código interno do utilizador
   * @param {string} password  senha do utilizador
   * @returns ResponseDTO => response.data = User
   */
  async validate(id: number, password: string): Promise<IResponse> {
    try {
      const hashedPassword = await hash(password, 10);
      //console.log(hashedPassword);
      const user = await this.repository.findOneBy({ id: id, password: hashedPassword });
      if (user) {
        const response = new ResponseDto();
        response.success = true;
        response.message = "user checked by id and password";
        response.data = user;
        return response;  
      } else {
        const response = new ResponseDto();
        response.success = false;
        response.message = "id and password cannot validate user";
        response.data = user;
        return response;
      }
    } catch (error) {
      return { success: false, message: 'record cant be updated', data: null, error: error };
    }
  }

  /**  
   * Actualiza a foto do Utilizador
   * 
   * @param {UpdateUserPhotoDto} UpdateUserPhotoDto  DTO de actualização de imagem do utilizador
   * @returns ResponseDTO => response.data = Utilizador actualizado
   */  
  async updateUserPhoto(updateUserPhotoDto: UpdateUserPhotoDto): Promise<IResponse> {
    try {      
      const response = new ResponseDto();
      const userToUpdate = await this.repository.findOneBy({ id: updateUserPhotoDto.id });
      if (userToUpdate) {
        userToUpdate.image = updateUserPhotoDto.image;
        const result = this.repository.save(userToUpdate);

        response.success = true;
        response.data = result;
        response.message = 'photo has been updated';
        response.error = null;        
      } else {
        response.success = false;
        response.data = null;
        response.message = 'invalid user';
        response.error = null;
      }
  
      return response;
    } catch (error) {
      return { success: false, message: 'record cant be updated', data: null, error: error };  
    }    
  }

  /**  
   * Actualiza os dados do Utilizador
   * 
   * @param {UpdateUserDto} UpdateUserDto  DTO de actualização do utilizador
   * @returns ResponseDTO => response.data = Utilizador actualizado
   */  
  async updateUser(updateUserDto: UpdateUserDto): Promise<IResponse> {
    try {
      //const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      const response = new ResponseDto();
      const userToUpdate = await this.repository.findOneBy({ email: updateUserDto.email });
      if (userToUpdate) {
        const user = new User();
        user.name = (userToUpdate.name !== updateUserDto.name) && updateUserDto.name.length > 0 ? updateUserDto.name : userToUpdate.name;
        user.email = userToUpdate.email;
        user.password = userToUpdate.password;
        user.role = (userToUpdate.role !== updateUserDto.role) && updateUserDto.role > 0 ? updateUserDto.role : userToUpdate.role;
        user.active = updateUserDto.active;

        const result = this.repository.save(user);

        response.success = true;
        response.data = result;
        response.message = 'record has been updated';
        response.error = null;        
      } else {
        response.success = false;
        response.data = null;
        response.message = 'invalid user';
        response.error = null;
      }
  
      return response;
    } catch (error) {
      return { success: false, message: 'record cant be updated', data: null, error: error };  
    }
  }

  /**  
   * Cria um novo Utilizador
   * 
   * @param {CreateUserDto} CreateUserDto  DTO de criação do utilizador
   * @returns ResponseDTO => response.data = Utilizador incluído
   */  
  async createUser(createUserDto: CreateUserDto): Promise<IResponse> {
    try {
      const hashedPassword = await hash(createUserDto.password, 10);

      const response = new ResponseDto();

      const user = new User();
      user.name = createUserDto.name;
      user.email = createUserDto.email;
      user.password = hashedPassword;
      user.role = createUserDto.role;
  
      const result = await this.repository.save(user);
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
   * Exclui um utilizador
   * 
   * @param {string} email  conta de email do utilizador
   * @returns ResponseDTO => response.data = Utilizador excluído
   */  
  async delete(email: string): Promise<IResponse> {
    try {
      const response = new ResponseDto();
      const result = await this.repository.delete( { email: email } );
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

  /*
  private generatePassword(pwd: string): any {
    genSalt(10, function(err, salt) {
      hash(pwd, salt, function(err, hash) {
          return hash;
      });
  });
  }*/
}
