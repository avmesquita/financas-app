import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from 'src/config/typeorm.config';

/**
 * Guard de Autenticação
 */
@Injectable()
export class AuthenticationGuard implements CanActivate {

  /**
   * Injeção de Dependência
   * 
   * @param jwtService Serviço responsável pelo JWT
   */
  constructor(private jwtService: JwtService) {}

  /**
   * Valida se o utilizador pode aceder
   * 
   * @param context Contexto de Execução
   * @returns {boolean} Permissão de execução
   */  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  /**
   * Extrai o token de um header, se houver
   * 
   * @param request {Request}
   * @returns {string}
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}