import {FC} from "react";
import {GetStaticPaths, GetStaticProps} from "next";
import {NoteData, NullNoteData, RootNoteData} from "@/types/NoteData";
import {Markdown} from "@/components";
import {api} from "@/server/api";
import {Head} from "@/pageComponents/mainSite/layout";
import {NoteLayout} from "@/pageComponents/mainSite/note";

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

const getNoteNavData = () => {
  return api.getNoteTree();
}

export const getStaticPaths: GetStaticPaths<Params> = async (_context) => {
  let paths: { params: Params }[] = [];
  try {
    const list = await getNoteNavData();
    paths = list.filter(item => item.id !== 0).map(item => ({
      params: {noteId: item.id.toString()}
    }))
  } catch (e) {
    console.warn("获取笔记列表失败", e)
  }

  return {
    paths,
    fallback: 'blocking'
  }
}


export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  let noteDataList: NoteData[] = []
  let noteData: NoteData & { content: string } = {...NullNoteData, content: "无数据"}
  try {
    const noteNavData = getNoteNavData();
    noteData = await api.getNoteContent(parseInt(context.params?.noteId || "0"));
    if (!noteData.content) {
      noteData.content = "无数据"
    }
    noteDataList = await noteNavData
  } catch (e) {
    console.warn("获取笔记内容失败", e)
  }

  return {
    props: {
      noteDataList: noteDataList,
      noteData: noteData
    }
  }
}

export default NoteDetail
