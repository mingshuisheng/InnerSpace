import {ConfigService} from "@nestjs/config";

export interface NoteConfig {
  savePath: string
  rootNoteName: string
}

export const noteConfigName = "note"

export const getNoteConfig = (configService: ConfigService): NoteConfig => {
  const noteConfig = configService.get<NoteConfig>(noteConfigName)

  if (configService.get<string>("NOTE_SAVE_PATH")) {
    noteConfig.savePath = configService.get<string>("NOTE_SAVE_PATH")
  }

  if (configService.get<string>("NOTE_ROOT_NOTE_NAME")) {
    noteConfig.rootNoteName = configService.get<string>("NOTE_ROOT_NOTE_NAME")
  }

  return noteConfig
}
