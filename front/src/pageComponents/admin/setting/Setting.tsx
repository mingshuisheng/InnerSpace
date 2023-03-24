import React, {FC} from "react";
import {Flex1Full} from "@/components";
import {RouterView} from "@/pageComponents/admin/RouterView";
import {navDataArr, routes} from "@/pageComponents/admin/setting/router";
import {SidebarNav} from "@/pageComponents/admin/setting/SidebarNav";

export const Setting: FC = () => {

  return (
    <div className="w-full h-full flex overflow-auto justify-center">
      <div className="w-3/4 h-full flex">
        <div className="w-1/4 flex justify-center">
          <SidebarNav navDataArr={navDataArr} />
        </div>
        <Flex1Full>
          <div className="w-full h-full p-2 box-border">
            <RouterView routeDataArr={routes}/>
          </div>
        </Flex1Full>
      </div>
    </div>
  )
}
