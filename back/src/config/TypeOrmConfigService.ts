import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import {Note} from "../entity/note.entity";
import {User} from "../entity/user.entity";
import {getDataBaseConfig} from "./database.config";
import {Image} from "../entity/image.entity";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const databaseConfig = getDataBaseConfig(this.configService)
    return {
      type: 'mysql',
      host: databaseConfig.host,
      port: databaseConfig.port,
      username: databaseConfig.user,
      password: databaseConfig.password,
      database: databaseConfig.database,
      entities: [Note, User, Image],
      synchronize: true,
      logging: process.env.NODE_ENV === 'development',
    }
  }
}
