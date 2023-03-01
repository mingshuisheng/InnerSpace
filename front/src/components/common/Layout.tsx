import {FC, ReactNode} from 'react';
import {Navbar} from './Navbar';
import {NavData} from "@/types/NavData";

interface LayoutProps {
  children: ReactNode
  navDataList: NavData[]
}

export const Layout: FC<LayoutProps> = ({children, navDataList}) => {
  return (
    <div className="flex flex-col h-full dark:text-white">
      <div className="flex flex-1 flex-col dark:bg-gray-900">
        <Navbar navDataList={navDataList}/>
        <main className="flex-1">{children}</main>
      </div>
      {/*<Footer/>*/}
    </div>
  );
};

