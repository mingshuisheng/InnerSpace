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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(+id, updateNoteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/content/:id')
  changeDetail(@Param('id') id: string, @Body() patchNoteContentDto: PatchNoteDetailDto) {
    return this.noteService.changeContent(+id, patchNoteContentDto.noteContent);
  }

  @Get('/content/:id')
  getDetail(@Param('id') id: string) {
    return this.noteService.getDetail(+id);
  }
}
