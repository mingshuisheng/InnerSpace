import {FC} from "react";
import {MiniGame} from "@/pageComponents/mainSite/home/MiniGame";
import {GetStaticProps} from "next";
import {Head} from "@/pageComponents/mainSite/layout";

type Props = {

}

const Home: FC<Props> = () => {

  return (
    <Head pageTitle="主页">
      <div className="relative w-full h-full flex flex-col justify-center items-center">
        <div className="flex justify-center items-center w-full h-40 text-7xl">
          Inner Space
        </div>
        <div className="w-1/2 flex-1 flex flex-col items-center flex-wrap text-slate-400">
          <div>
            或许你会问，为什么网站的名称叫做Inner Space?
          </div>
          <div>
            没有任何特殊意义，只是随便起的名字
          </div>

          <div className="pt-10">
            全栈工程师，技多不压身。<br/>
            前后端皆通，产品也精巧。<br/>
            难得有闲暇，常为需求忙。<br/>
            若问薪水高，不如自己猜。<br/>
            <div className="w-full text-right">-- by new bing</div>
          </div>
        </div>
        <MiniGame/>
      </div>
    </Head>
  )
};

export const getStaticProps: GetStaticProps<Props> = async () => {

  return {
    props: {
    },
  }
}

export default Home;
