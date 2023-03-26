import {FC} from "react";
import {HashRouter, MemoryRouter} from "react-router-dom"
import {Layout} from "@/pageComponents/admin/layout/Layout";
import {navDataArr, routes, WithAuth} from "@/pageComponents/admin";
import {RouterView} from "@/pageComponents/admin/RouterView";
import {ImagePicker} from "@/pageComponents/admin/global/imagePicker/ImagePicker";

//避免开发模式下报错
const Router = process.browser ? HashRouter : MemoryRouter

const AdminPage: FC = () => {

  return (
    <Router>
      <Layout navDataArr={navDataArr}>
        <RouterView routeDataArr={routes}/>
      </Layout>
      <ImagePicker/>
    </Router>
  )
}


export default WithAuth(AdminPage)
// export default AdminPage
