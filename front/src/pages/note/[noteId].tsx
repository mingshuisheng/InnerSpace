import {FC} from "react";
import {GetStaticPaths, GetStaticProps} from "next";
import {getNoteNavData} from "@/common/commonStaticProps";
import {NoteData} from "@/types/NoteData";
import {Head, Markdown, NoteLayout} from "@/components";
import {getNoteContent} from "@/server/api/note";

type Props = {
  noteDataList: NoteData[],
  noteData: NoteData & { content: string }
}

type Params = {
  noteId: string
}

const NoteDetail: FC<Props> = ({noteData, noteDataList}) => {
  return (
    <Head pageTitle={noteData.name}>
      <NoteLayout noteDataList={noteDataList}>
        <div>
          <Markdown>{noteData.content}</Markdown>
        </div>
      </NoteLayout>
    </Head>
  )
}


export const getStaticPaths: GetStaticPaths<Params> = async (_context) => {
  const list = await getNoteNavData();
  const paths = list.filter(item => item.id !== 0).map(item => ({
    params: {noteId: item.id.toString()}
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}


export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const noteNavData = getNoteNavData();
  const noteData = await getNoteContent(parseInt(context.params?.noteId || "0"));
  if (!noteData.content) {
    noteData.content = "无数据"
  }

  return {
    props: {
      noteDataList: await noteNavData,
      noteData: noteData
    }
  }
}

export default NoteDetail
