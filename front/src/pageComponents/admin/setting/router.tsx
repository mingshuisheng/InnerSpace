import {RouteObject} from "react-router-dom";
import {ChangePassword} from "@/pageComponents/admin/setting/ChangePassword";
import {NavData} from "@/types/NavData";
import {AdminManagement} from "@/pageComponents/admin/setting/AdminManagement";

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: () => <ChangePassword/>
  },
  {
    path: "/other",
    Component: () => <AdminManagement/>
  },
]

export const navDataArr: NavData[] = [
  {
    title: "修改密码",
    href: "/setting",
    matcher: "^/setting$"
  },
  {
    title: "行政管理",
    href: "/setting/other",
    matcher: "^/setting/other$"
  }
]
