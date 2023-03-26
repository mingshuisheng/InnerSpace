import {CacheModule, Module} from '@nestjs/common';
import {NoteModule} from './note/note.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {HashModule} from "./hash/hash.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import configuration from "./config/configuration";
import {TypeOrmConfigService} from "./config/TypeOrmConfigService";
import {ImageModule} from "./image/image.module";

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true
    }),
    NoteModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeOrmConfigService
    }),
    AuthModule,
    UsersModule,
    HashModule,
    ImageModule
  ],
  controllers: [],
  providers: [],
  exports: [AuthModule]
})
export class AppModule {
}
