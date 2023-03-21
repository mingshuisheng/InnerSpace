import React, {FC} from "react";
import {useNavigate} from "react-router-dom";
import {Sidebar} from "flowbite-react";

type SidebarNavProps = {
  navDataArr: { name: string, path: string }[]
}

export const SidebarNav: FC = () => {

  const navigateFunction = useNavigate();

  return <Sidebar>
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        <Sidebar.Item className="hover:cursor-pointer"
                      onClick={() => navigateFunction("/setting")}>修改密码</Sidebar.Item>
        <Sidebar.Item className="hover:cursor-pointer"
                      onClick={() => navigateFunction("/setting/other")}>添加用户</Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>;
}
