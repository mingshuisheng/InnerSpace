import './globals.css'
import {ReactNode} from "react";
import {MainHeader} from "@/components/MainHeader";
import {MiniGame} from "@/components/MiniGame";
import {NavData} from "@/types/NavData";

const navDataStart: NavData[] = [
  {
    title: "主页",
    href: "/",
    matcher: "/"
  },
  {
    title: "笔记",
    href: "/note",
    matcher: "/note/?\\d*"
  },
]

const navDataEnd: NavData[] = [
  {
    title: "关于",
    href: "/about",
    matcher: "/about"
  },
  {
    title: "更多",
    href: "/more",
    matcher: "/more"
  }
]

type Props = {
  children: ReactNode,
}


export default function RootLayout(props: Props) {
  const localNavData = [...navDataStart, ...navDataEnd]
  return (
    <html lang="en">
    <body className="flex flex-col relative w-screen h-screen">
    <MainHeader navData={localNavData}/>
    <div className="relative flex-1 p-1 box-border">
      <main className="absolute overflow-auto inset-0">
        {props.children}
      </main>
    </div>
    <MiniGame/>
    </body>
    </html>
  )
}
