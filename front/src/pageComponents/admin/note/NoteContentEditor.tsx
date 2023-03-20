import {FC, memo} from "react";
import MdEditor from "react-markdown-editor-lite";
import {Markdown} from "@/components";
import {saveNoteContent, setInputContent, useInputContent} from "./store";
import {useOnSave} from "@/hooks/useOnSave";

export const NoteContentEditor: FC = memo(() => {
  const inputContent = useInputContent()
  useOnSave(saveNoteContent)

  return (
    <div className="flex h-full w-full gap-2">
      <MdEditor value={inputContent} className="w-full h-full" renderHTML={text => <Markdown>{text}</Markdown>}
                onChange={e => setInputContent(e.text)}/>
    </div>
  )
})

NoteContentEditor.displayName = "NoteContentEditor"
