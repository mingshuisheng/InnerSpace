import {RouteObject} from "react-router-dom";
import {MainPageEditor} from "@/pageComponents/admin/main";
import {NoteManagerPage} from "@/pageComponents/admin/note";
import {Setting} from "@/pageComponents/admin/setting";
import {NavData} from "@/types/NavData";

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: () => <MainPageEditor />
  },
  {
    path: "/note",
    Component: () => <NoteManagerPage />
  },
  {
    path: "/setting/*",
    Component: () => <Setting />
  }
]

export const navDataArr: NavData[] = [
  {
    title: "主页",
    href: "/"
  },
  {
    title: "笔记",
    href: "/note"
  },
  {
    title: "设置",
    href: "/setting"
  }
]
