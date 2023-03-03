import {FC} from "react";
import {GetStaticProps} from "next";

type Props = {

}

const About: FC = () => {
  return (
    <div>
      关于页面
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {

  return {
    props: {
    },
  }
}

export default About
