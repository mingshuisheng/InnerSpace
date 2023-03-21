import {FC, ReactNode} from 'react';
import {Navbar} from './Navbar';
import {NavData} from "@/types/NavData";
import {Layout as CommonLayout} from "@/pageComponents/common/Layout";

interface LayoutProps {
  children: ReactNode
  navDataList: NavData[]
}

export const Layout: FC<LayoutProps> = ({children, navDataList}) => {
  return (
    <CommonLayout header={<Navbar navDataList={navDataList}/>} >
      {children}
    </CommonLayout>
  );
};

