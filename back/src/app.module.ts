import {CacheModule, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {NoteModule} from './note/note.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Note} from "./entity/note.entity";

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true
    }),
    NoteModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'inner_space',
      entities: [Note],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
}
