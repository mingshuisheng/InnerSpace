import {FC} from "react";
import {GetStaticProps} from "next";

type Props = {

}

const _500: FC<Props> = () => {
  return(
    <div>
      服务器错误
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {

  return {
    props: {
    },
  }
}

export default _500
