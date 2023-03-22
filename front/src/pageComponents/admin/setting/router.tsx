import {RouteObject} from "react-router-dom";
import {ChangePassword} from "@/pageComponents/admin/setting/ChangePassword";
import {NavData} from "@/types/NavData";

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: () => <ChangePassword />
  },
  {
    path: "/other",
    Component: () => <div>other</div>
  },
]

export const navDataArr: NavData[] = [
  {
    title: "修改密码",
    href: "/setting"
  },
  {
    title: "添加管理员",
    href: "/setting/other"
  }
]
