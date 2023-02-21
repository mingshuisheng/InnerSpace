import './globals.css'
import {ReactNode} from "react";
import {MainHeader} from "@/components/MainHeader";
import {MiniGame} from "@/components/MiniGame";

const navData = [
  {
    title: "主页",
    href: "/"
  },
  {
    title: "笔记主页",
    href: "/note"
  },
  {
    title: "笔记1",
    href: "/note/1"
  },
  {
    title: "笔记2",
    href: "/note/2"
  },
  {
    title: "关于",
    href: "/about"
  },
  {
    title: "更多",
    href: "/more"
  }
]

export default function RootLayout({children}: { children: ReactNode }) {

  return (
    <html lang="en">
      <body className="flex flex-col relative w-screen h-screen">
        <MainHeader navData={navData}/>
        <main className="flex-1">
          {children}
        </main>
        <MiniGame/>
      </body>
    </html>
  )
}
