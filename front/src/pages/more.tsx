import {FC} from "react";
import {GetStaticProps} from "next";
import {Head} from "@/components";

type Props = {}

const More: FC = () => {
  return (
    <Head pageTitle="更多">
      <div>
        更多页面
      </div>
    </Head>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {

  return {
    props: {},
  }
}

export default More
