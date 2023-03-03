import {FC} from "react";
import {GetStaticProps} from "next";

type Props = {

}

const _404: FC<Props> = () => {
  return(
    <div>
      找不到页面
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {

  return {
    props: {
    },
  }
}

export default _404
