import {FC, memo, PropsWithChildren, ReactNode} from "react";
import {Divider, Flex1Full} from "@/components";


export interface NoteManagerLayoutProps extends PropsWithChildren {
  aside?: ReactNode
}

export const NoteManagerLayout: FC<NoteManagerLayoutProps> = memo(({aside, children}) => {

  return (
    <div className="flex w-full h-full">
      <div>
        {aside}
      </div>
      <Divider/>
      <Flex1Full>
        <div className="w-full h-full overflow-auto p-2 box-border">
          {children}
        </div>
      </Flex1Full>
    </div>
  )
})

NoteManagerLayout.displayName = "NoteManagerLayout"
