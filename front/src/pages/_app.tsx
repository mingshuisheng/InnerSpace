import type {AppProps} from 'next/app';
import {FC, Suspense} from 'react';
import '../styles/globals.css';
import "react-markdown-editor-lite/lib/index.css";
import {flowbiteTheme as theme} from '../theme';

import {Flowbite, Spinner} from 'flowbite-react';
import {Layout, NoteLayout} from "@/components";
import {NavData} from "@/types/NavData";
import {useRouter} from "next/router";

const navDataStart: NavData[] = [
  {
    title: "主页",
    href: "/",
    matcher: "^/$"
  },
  {
    title: "笔记",
    href: "/note/0",
    matcher: "^/note/?\\d*"
  },
]

const navDataEnd: NavData[] = [
  {
    title: "关于",
    href: "/about",
    matcher: "^/about$"
  },
  {
    title: "更多",
    href: "/more",
    matcher: "^/more$"
  },
  {
    title: "管理页面",
    href: "/admin/note",
    matcher: "^/admin/note$"
  },
]

const App: FC<AppProps> = function ({Component, pageProps}): JSX.Element {
  const localNavData = [...navDataStart, ...navDataEnd]
  let router = useRouter();
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          <Spinner size="lg"/> Loading..
        </div>
      }
    >
      <Flowbite theme={{theme}}>
        <Layout navDataList={localNavData}>
          {
            new RegExp(navDataStart[1].matcher || "").test(router.pathname) ?
              <NoteLayout noteDataList={pageProps.noteDataList || []}>
                <Component {...pageProps} />
              </NoteLayout> :
              <Component {...pageProps} />
          }
        </Layout>
      </Flowbite>
    </Suspense>
  );
};

export default App;
