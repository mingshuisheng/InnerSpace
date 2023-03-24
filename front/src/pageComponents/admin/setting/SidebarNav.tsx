import React, {FC} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Sidebar} from "flowbite-react";
import {NavData} from "@/types/NavData";

type SidebarNavProps = {
  navDataArr: NavData[]
}

export const SidebarNav: FC<SidebarNavProps> = ({navDataArr}) => {

  const navigateFunction = useNavigate();
  const location = useLocation()

  return <Sidebar>
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        {
          navDataArr.map(navData => (
            <Sidebar.Item active={new RegExp(navData.matcher || "").test(location.pathname)}
                          className="hover:cursor-pointer"
                          onClick={() => navigateFunction(navData.href)}>{navData.title}</Sidebar.Item>
          ))
        }
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>;
}
