import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

/**
 * Função de início do serviço
 */
async function bootstrap() {
  const appOptions = {
    cors: true    
  };
  const app = await NestFactory.create(AppModule, appOptions);  
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.setGlobalPrefix('api');
  app.enableCors();

  const swaggerCustomOptions = {
    explorer: false,
    customCss: '.swagger-ui .topbar { background-color: black; } .swagger-ui img { display: none; }',
    customSiteTitle: 'Finanças App - Controle API',
    customfavIcon: "/assets/logo.png"
  }

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Finanças App - Controle API')
    .setDescription('financas.andremesquita.com')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document, swaggerCustomOptions);

  const port = process.env.PORT || 3000;

  app.listen(port);
}
bootstrap();
