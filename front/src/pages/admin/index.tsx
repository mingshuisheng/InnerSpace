import {FC} from "react";
import {HashRouter, MemoryRouter, Route, Routes} from "react-router-dom"
import {Layout} from "@/pageComponents/admin/layout/Layout";
import {navDataArr, routes} from "@/pageComponents/admin";
import {RouterView} from "@/pageComponents/admin/RouterView";

//避免开发模式下报错
const Router = process.browser ? HashRouter : MemoryRouter

const AdminPage: FC = () => {

  return (
    <Router>
      <Layout navDataArr={navDataArr}>
        <RouterView routeDataArr={routes}/>
      </Layout>
    </Router>
  )
}


// export default WithAuth(AdminPage)
export default AdminPage
