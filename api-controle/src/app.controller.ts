import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';

/**
 * Controlador básico do sistema
 */
@ApiTags('Health')
@Controller('health')
export class AppController {
  
  /**
   * Constructor do Serviço / Injeção de Dependência
   * 
   * @param {AppService} appService serviço básico do sistema
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Returna VERDADE se a API estiver a rodar
   *
   * @returns Verdadeiro, se estiver a funcionar correctamente
   */
  @Get()
  async getHealth(): Promise<boolean> {
    return this.appService.getHealth();
  }
}
