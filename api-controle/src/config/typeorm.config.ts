import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config()

/**
 * Constante de configuração do acesso a banco de dados
 **/
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT,3306),
  username: process.env.MYSQL_USERNAME, 
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
  debug: process.env.DEBUG == 'true' ? true : false,
  insecureAuth: process.env.INSECURE_AUTH == 'true' ? true : false,
};

/**
 * Constante de segurança do token JWT
 **/
export const jwtConstants = {
  secret : process.env.JWT_SECRET,
};

