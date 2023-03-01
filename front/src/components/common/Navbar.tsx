import {DarkThemeToggle, Tabs, useTheme} from 'flowbite-react';
import {FC} from 'react';
import {NavData} from "@/types/NavData";
import {AiFillGithub} from "react-icons/ai"
import {useRouter} from "next/router";

type CommonNavProps = {
  navDataList: NavData[]
}

export const Navbar: FC<CommonNavProps> = ({navDataList}: CommonNavProps) => {
  let theme = useTheme().theme.darkThemeToggle;
  let router = useRouter();
  return (
    <>
      <header className="flex justify-between items-center shadow-lg px-4">
        <div className="font-mono text-2xl font-bold"> Inner Space</div>
        <div className="flex justify-between items-center gap-2">
          <Tabs.Group style="default" onActiveTabChange={index => navDataList[index] && router.push(navDataList[index].href)}>
            {
              navDataList.map(navData => (
                <Tabs.Item
                  key={navData.href}
                  active={new RegExp(navData.matcher || "").test(router.pathname)}
                  title={navData.title}/>
              ))
            }
          </Tabs.Group>
          <div className="flex gap-2">
            <button
              aria-label="go to github "
              data-testid="go-to-github"
              type="button"
              className={theme.base}
              onClick={() => window.open("https://github.com/mingshuisheng/InnerSpace")}
            >
              <AiFillGithub className={theme.icon}/>
            </button>
            <DarkThemeToggle/>
          </div>
        </div>
      </header>
    </>
  );
};
