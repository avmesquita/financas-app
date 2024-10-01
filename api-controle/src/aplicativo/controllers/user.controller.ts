import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UpdateUserPhotoDto } from 'src/aplicativo/dto/user-dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Get, Put, Post, Delete } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Param, Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { IResponse } from '../interfaces/iresponse.interface';
import { ResponseDto } from '../dto/response-dto';

/**
 * Controlador de Utilizador
 */
@ApiTags('User')
@ApiExtraModels(ResponseDto)
@ApiExtraModels(User)
@Controller('user')
export class UserController {

  /**
   * Injeção de Dependencia pelo constructor
   * 
   * @param {UserService} service Serviço de Utilizador
   */
  constructor(
    private readonly service: UserService
  ) { }

  /**
   * Obtém um utilizador por e-mail
   * @param email 
   * @returns {User} Utilizador
   */
  @Get('getByEmail')
  async findOne(@Param('email') email: string): Promise<User> {
    const result = await this.service.findOne(email);
    return result;
  }
  
  /**
   * Obtém todos os Utilizadores
   * 
   * @returns {User[]} Utilizadores
   */
  @ApiBearerAuth()
  @Get('getAll')
  async getAll(): Promise<IResponse> {
    const result = await this.service.getAll();
    return result;
  }

  /**
   * Obter utilizador por identificador primário
   * 
   * @param id 
   * @returns {User}
   */
  @ApiBearerAuth()
  @Get('getById/:id')
  async findById(@Param('id') id: number): Promise<User> {
    const result = await this.service.findById(id);
    return result;
  }

  /**
   * Obter foto do Utilizador
   * 
   * @param id   identificador primário
   * @returns {User}
   */
  @ApiBearerAuth()
  @Get('getUserPhoto/:id')
  async findUserPhoto(@Param('id') id: number): Promise<User> {
    const result = await this.service.findUserPhoto(id);
    return result;
  }  

  /**
   * Actualizar Utilidador
   * 
   * @param {UpdateUserDto} dto 
   * @returns {User}
   */
  @ApiBearerAuth()
  @Put()
  async update(@Body() dto: UpdateUserDto): Promise<IResponse> {
    return await this.service.updateUser(dto);
  }

  /**
   * Actualizar foto do Utilidador
   * 
   * @param {UpdateUserPhotoDto} dto 
   * @returns {User}
   */
  @ApiBearerAuth()
  @Put('updateUserPhoto')
  async updateUserPhoto(@Body() dto: UpdateUserPhotoDto): Promise<IResponse> {
    return await this.service.updateUserPhoto(dto);
  }

  /**
   * Criar Utilidador
   * 
   * @param {CreateUserDto} dto 
   * @returns {User}
   */
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateUserDto): Promise<IResponse> {
    return await this.service.createUser(dto);
  }

  /**
   * Excluir Utilidador
   * 
   * @param {string} email 
   * @returns {User}
   */
  @ApiBearerAuth()
  @Delete()
  async delete(@Param('email') email: string): Promise<IResponse> {
    return await this.service.delete(email);
  }

}

