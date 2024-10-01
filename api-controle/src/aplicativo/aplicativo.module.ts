import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/config/typeorm.config';

import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { Authentication } from './entities/authentication.entity';

import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User } from './entities/user.entity';

import { Notification } from './entities/notification.entity';
import { NotificationController } from './controllers/notification.controller';
import { NotificationService } from './services/notification.service';


import { Conta } from './entities/conta.entity';
import { ContaController } from './controllers/conta.controller';
import { ContaService } from './services/conta.service';

import { Lancamento } from './entities/lancamento.entity';
import { LancamentoController } from './controllers/lancamento.controller';
import { LancamentoService } from './services/lancamento.service';

/**
 * Módulo do aplicativo
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,      
      Authentication,
      Notification,
      Lancamento,
      Conta
    ]),
    JwtModule.register({      
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    })    
  ],
  controllers: [
    AuthenticationController,
    UserController,
    NotificationController,
    ContaController,    
    LancamentoController
  ],
  providers: [
    AuthenticationService,
    UserService,
    NotificationService,
    ContaService,    
    LancamentoService
  ],
  exports: [ 
    AuthenticationService,
    UserService,
  ],
})
export class AplicativoModule  {
  
}
