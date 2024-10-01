import { createParamDecorator } from '@nestjs/common';
import { User } from '../entities/user.entity';

/**
 * Obtém o Utilizador da requisição
 */
export const GetUser = createParamDecorator((data, req): User => {
  return req.user;
});
