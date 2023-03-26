import {FC, PropsWithChildren} from "react";
import {Layout as CommonLayout} from "@/pageComponents/common/Layout";
import {Navbar} from "./Navbar";
import {NavData} from "@/types/NavData";

type LayoutProps = {
  navDataArr: NavData[]
} & PropsWithChildren

export const Layout: FC<LayoutProps> = ({children, navDataArr}) => {
  return (
    <CommonLayout header={<Navbar navDataArr={navDataArr}/>} className="bg-gray-100 dark:bg-gray-900">
      <div className="w-full h-full overflow-auto">
        {children}
      </div>
    </CommonLayout>
  )
}
