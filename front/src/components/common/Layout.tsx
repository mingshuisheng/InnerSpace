import {FC, ReactNode} from 'react';
import {Navbar} from './Navbar';
import {NavData} from "@/types/NavData";
import {Flex1Full} from "@/components";

interface LayoutProps {
  children: ReactNode
  navDataList: NavData[]
}

export const Layout: FC<LayoutProps> = ({children, navDataList}) => {
  return (
    <div className="flex flex-col h-full dark:text-white">
      <div className="flex flex-1 flex-col dark:bg-gray-900">
        <Navbar navDataList={navDataList}/>
        <Flex1Full>
          <div className="w-full h-full p-2 box-border">
            {children}
          </div>
        </Flex1Full>
      </div>
      {/*<Footer/>*/}
    </div>
  );
};

