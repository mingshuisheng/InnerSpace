import {IsNotEmpty, IsString} from "class-validator";

export class PatchNoteDetailDto {
  @IsString()
  @IsNotEmpty()
  noteDetail: string;
}
