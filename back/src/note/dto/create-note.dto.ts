import {IsInt, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateNoteDto {

  @IsOptional()
  @IsInt()
  parentId?: number

  @IsString()
  @IsNotEmpty()
  name: string
}
