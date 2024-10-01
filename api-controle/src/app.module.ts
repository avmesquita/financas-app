import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AplicativoModule } from './aplicativo/aplicativo.module';
import { ConfigModule } from '@nestjs/config';

/**
 * Módulo central de carga do sistema
 */
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), 
    AplicativoModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{
 
}
