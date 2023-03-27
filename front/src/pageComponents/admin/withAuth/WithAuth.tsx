import {FC, memo} from "react";
import {LoginLayer} from "./LoginLayer";

export const WithAuth = <T extends {}, >(Component: FC<T>) => {
  const wrapper: FC<T> = (props) => {

    return (
      <>
        <Component {...props} onError={() => console.log("catch error")}/>
        <LoginLayer/>
      </>
    )
  }

  return memo(wrapper)
}
