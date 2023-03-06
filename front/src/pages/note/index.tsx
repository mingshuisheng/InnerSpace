import {FC} from "react";
import {Head, Markdown} from "@/components";
import {GetStaticProps} from "next";
import {NoteData} from "@/types/NoteData";
import {getNoteNavData} from "@/common/commonStaticProps";
import {getNoteContent} from "@/server/api/note";

type Props = {
  noteDataList: NoteData[]
  content: string
}

const Note: FC<Props> = ({content}) => {
  return (
    <Head pageTitle="笔记页面">
      <div>
        <Markdown>
          {content}
        </Markdown>
      </div>
    </Head>
  )
}


export const getStaticProps: GetStaticProps<Props> = async () => {


  const noteNavData = getNoteNavData();
  const noteContent = getNoteContent(0);

  return {
    props: {
      noteDataList: await noteNavData,
      content: (await noteContent).content || "无数据"
    },

  }
}

export default Note
