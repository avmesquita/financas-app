import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants, typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ConsolidadoController } from './consolidado.controller';
import { ConsolidadoService } from './consolidado.service';

/**
 * Módulo central de carga do sistema
 */
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    TypeOrmModule.forRoot(typeOrmConfig),    
    JwtModule.register({      
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    })
  ],
  controllers: [AppController, ConsolidadoController],
  providers: [AppService, ConsolidadoService],
})
export class AppModule{
 
}
