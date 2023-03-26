import {FC} from "react";
import {Route, RouteObject, Routes} from "react-router-dom";

type RouterViewProps = {
  routeDataArr: RouteObject[]
}

export const RouterView: FC<RouterViewProps> = ({routeDataArr}) => {
  return(
    <Routes>
      {
        routeDataArr.map(routeData => (
          <Route key={routeData.path} path={routeData.path} Component={routeData.Component}/>
        ))
      }
    </Routes>
  )
}
