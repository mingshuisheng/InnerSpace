import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Note} from "../entity/note.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NoteController],
  providers: [NoteService]
})
export class NoteModule {}
