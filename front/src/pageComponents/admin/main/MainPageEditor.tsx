import {FC, useState} from "react";
import {Markdown} from "@/components";
import MdEditor from "react-markdown-editor-lite";

export const MainPageEditor: FC = () => {
  const [inputContent, setInputContent] = useState("")

  return (
    <MdEditor value={inputContent} className="w-full h-full" renderHTML={text => <Markdown>{text}</Markdown>}
              onChange={e => setInputContent(e.text)}/>
  )
}
