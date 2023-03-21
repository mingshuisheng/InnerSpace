import {FC} from "react";
import {Navbar as CommonNavbar} from "@/pageComponents/common/Navbar"
import {Tabs} from "flowbite-react";
import {useLocation, useNavigate} from "react-router-dom"
import {NavData} from "@/types/NavData";


type NavbarProps = {
  navDataArr: NavData[]
}

export const Navbar: FC<NavbarProps> = ({navDataArr}) => {

  const navigateFunction = useNavigate();
  const location = useLocation()


  return (
    <CommonNavbar>
      <Tabs.Group style="default" onActiveTabChange={index => navigateFunction(navDataArr[index].href)}>
        {
          navDataArr.map(navData => (
            <Tabs.Item key={navData.href} title={navData.title} active={location.pathname === navData.href}/>
          ))
        }
      </Tabs.Group>
    </CommonNavbar>
  )
}
