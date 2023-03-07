import {CacheModule, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {NoteModule} from './note/note.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Note} from "./entity/note.entity";
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true
    }),
    NoteModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.2.170',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'inner_space',
      entities: [Note],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
  exports:[AuthModule]
})
export class AppModule {
}
