import {ReactNode} from "react";
import {Nav} from "@/app/note/Nav";
import {Divider} from "@/components/clientUI";


export default async function NoteLayout({children}: { children: ReactNode }) {

  return (
    <div className="h-full flex p-1 box-border">
      <Nav/>
      <Divider orientation="vertical" flexItem/>
      <div className="flex-1 box-border relative">
        <div className="absolute p-5 inset-0 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
