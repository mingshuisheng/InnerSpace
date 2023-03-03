import {FC, PropsWithChildren} from "react";
import classNames from "classnames";

export interface Flex1FullProps extends PropsWithChildren {
  className?: string
}

export const Flex1Full: FC<Flex1FullProps> = ({children, className}) => {
  return (
    <div className={classNames("flex-1 relative", className)}>
      <div className="absolute top-0 bottom-0 left-0 right-0">
        {children}
      </div>
    </div>
  )
}
