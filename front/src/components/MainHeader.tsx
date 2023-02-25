"use client"

import {useRouter, usePathname} from "next/navigation";
import GitHubIcon from '@mui/icons-material/GitHub';
import {IconButton, Tabs, Tab} from '@mui/material';
import {NavData} from "@/types/NavData";

type Props = {
  navData: NavData[]
}

export function MainHeader(props: Props) {
  let router = useRouter();
  let pathname = usePathname();

  let selectIndex = props.navData.findIndex((nav, index) => {
      if (nav.matcher === "/") {
        return pathname === "/"
      }
      return new RegExp(nav.matcher || "").test(pathname || "")
    }
  )
  selectIndex = selectIndex === -1 ? 0 : selectIndex

  return (
    <header className="px-10 shadow-md">
      <div className="flex items-center justify-between h-11">
        <div className="font-bold text-2xl">Inner Space</div>
        <div className="flex-1 flex justify-end">
          <Tabs value={selectIndex.toString()}>
            {
              props.navData.map((nav, index) => (
                <Tab key={nav.href} onClick={() => {
                  router.push(nav.href)
                }} value={index.toString()} label={nav.title}/>
              ))
            }
          </Tabs>
          <IconButton onClick={() => {
            window.open("https://github.com/mingshuisheng/InnerSpace")
          }} aria-label="github main page">
            <GitHubIcon sx={{color: "#000"}}/>
          </IconButton>
        </div>
      </div>
    </header>
  )
}
