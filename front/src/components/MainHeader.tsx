"use client"

import {useRouter, usePathname} from "next/navigation";
import {useTheme} from "@/utils/ThemeUtils";

type Props = {
  navData: { title: string, href: string }[]
}

export function MainHeader(props: Props) {
  let router = useRouter();
  let pathname = usePathname();

  const {theme, toggleTheme} = useTheme();

  return (
    <header className="px-10 shadow-md">
      <div className="flex items-center justify-between h-11">
        <div className="font-bold text-2xl">Inner Space</div>
        <nav className="flex h-full text-base">
          <ul className="flex h-full">
            {
              props.navData.map(nav => (
                pathname == nav.href ?
                  <li key={nav.href}
                      className="w-20 h-full flex items-center justify-center m-auto bg-blue-300">
                    {nav.title}
                  </li> :
                  <li key={nav.href} onClick={() => router.push(nav.href)}
                      className="select-none w-20 h-full flex items-center justify-center m-auto hover:bg-blue-300 active:bg-blue-400 hover:cursor-pointer">
                    {nav.title}
                  </li>
              ))
            }
          </ul>
          <div onClick={toggleTheme} className="hidden w-10 select-none flex justify-center items-center hover:cursor-pointer">
            {theme}
          </div>
        </nav>
      </div>
    </header>
  )
}
