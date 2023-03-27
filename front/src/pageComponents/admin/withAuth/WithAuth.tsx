import {FC, memo} from "react";
import {LoginLayer} from "./LoginLayer";
import {useMount} from "ahooks";
import {checkLoginStatus} from "@/pageComponents/admin/withAuth/store";

export const WithAuth = <T extends {}, >(Component: FC<T>) => {
  const wrapper: FC<T> = (props) => {

    useMount(checkLoginStatus)

    return (
      <>
        <Component {...props} onError={() => console.log("catch error")}/>
        <LoginLayer/>
      </>
    )
  }

  return memo(wrapper)
}
