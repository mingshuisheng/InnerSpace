import {FC} from 'react';
import {NavData} from "@/types/NavData";
import {useRouter} from "next/router";
import {Tabs} from "flowbite-react";
import {Navbar as CommonNavbar} from "@/pageComponents/common/Navbar"

type CommonNavProps = {
  navDataList: NavData[]
}

export const Navbar: FC<CommonNavProps> = ({navDataList}: CommonNavProps) => {
  const router = useRouter()
  return (
    <CommonNavbar>
      <Tabs.Group style="default"
                  onActiveTabChange={index => navDataList[index] && router.push(navDataList[index].href)}>
        {
          navDataList.map(navData => (
            <Tabs.Item
              key={navData.href}
              active={new RegExp(navData.matcher || "").test(router.pathname)}
              title={navData.title}/>
          ))
        }
      </Tabs.Group>
    </CommonNavbar>
  );
};
