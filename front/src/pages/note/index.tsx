import {FC} from "react";
import {Head} from "@/components";
import {GetStaticProps} from "next";
import {NoteData} from "@/types/NoteData";
import {getNoteNavData} from "@/common/commonStaticProps";

type Props = {
  noteDataList: NoteData[]
}

const Note: FC<Props> = () => {
  return (
    <Head pageTitle="笔记页面">
      <div>
        笔记页面
      </div>
    </Head>
  )
}


export const getStaticProps: GetStaticProps<Props> = async () => {

  return {
    props: {
      noteDataList: await getNoteNavData()
    },

  }
}

export default Note
