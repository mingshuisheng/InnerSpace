import {FC, memo} from "react";
import MdEditor from "react-markdown-editor-lite";
import {Markdown} from "@/components";
import {saveNoteContent, setInputContent, useInputContent} from "@/components/admin/note/store";
import {useOnSave} from "@/utils/EventUtils";

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
