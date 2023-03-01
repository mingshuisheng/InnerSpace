import {FC} from "react";
import {GetStaticPaths, GetStaticProps} from "next";
import {getNoteNavData} from "@/common/commonStaticProps";
import {NoteData} from "@/types/NoteData";

type Props = {
  noteDataList: NoteData[],
  noteId: string
}

type Params = {
  noteId: string
}

const NoteDetail: FC<Props> = ({noteId}) => {
  return (
    <div>
      笔记详情页 {noteId}
    </div>
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
  return {
    props: {
      noteDataList: await getNoteNavData(),
      noteId: context.params?.noteId || "0"
    }
  }
}

export default NoteDetail
