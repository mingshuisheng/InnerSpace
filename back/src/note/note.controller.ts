import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  CacheInterceptor, CacheKey, UseGuards
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import {PatchNoteDetailDto} from "./dto/patch-note-detail.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @Get("tree")
  @UseInterceptors(CacheInterceptor)
  @CacheKey("note_key")
  getTree(){
    return this.noteService.buildTree();
  }

  @Get()
  findAll() {
    return this.noteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteService.remove(+id);
  }

  @Patch('/detail/:id')
  changeDetail(@Param('id') id: string, @Body() patchNoteDetailDto: PatchNoteDetailDto) {
    return this.noteService.changeDetail(+id, patchNoteDetailDto.noteDetail);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/detail/:id')
  getDetail(@Param('id') id: string) {
    return this.noteService.getDetail(+id);
  }
}
