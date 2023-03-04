import {FC} from "react";
import {GetStaticProps} from "next";
import {Markdown} from "@/components";


type Props = {}

const About: FC = () => {
  return (
    <>
      <Markdown>{"# 代码样例"}</Markdown>
      <Markdown>{"![这是图片](https://tse4-mm.cn.bing.net/th/id/OIP-C.YKoZzgmubNBxQ8j-mmoTKAHaEK?pid=ImgDet&rs=1 \"Magic Gardens\")"}</Markdown>
      <Markdown>{"```javascript\nlet i = 0\n```"}</Markdown>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {

  return {
    props: {},
  }
}

export default About
