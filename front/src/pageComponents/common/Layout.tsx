import {FC, PropsWithChildren, ReactNode} from "react";
import {Flex1Full} from "@/components";
import classNames from "classnames";

type LayoutProps = {
  header?: ReactNode
  className?: string
} & PropsWithChildren

export const Layout: FC<LayoutProps> = ({children, header, className}) => {
  return (
    <div className={classNames("flex flex-col h-full dark:text-white", className)}>
      <div className="flex flex-1 flex-col dark:bg-gray-900">
        {/*<Navbar navDataList={navDataList}/>*/}
        {header}
        <Flex1Full>
          <div className="w-full h-full p-2 box-border">
            {children}
          </div>
        </Flex1Full>
      </div>
      {/*<Footer/>*/}
    </div>
  )
}
