import {DarkThemeToggle, useTheme} from 'flowbite-react';
import {FC, PropsWithChildren} from 'react';
import {AiFillGithub} from "react-icons/ai"

type CommonNavProps = {
} & PropsWithChildren

export const Navbar: FC<CommonNavProps> = ({children}) => {
  const theme = useTheme().theme.darkThemeToggle;
  return (
    <>
      <header className="flex justify-between items-center shadow-lg px-4">
        <div className="font-mono text-2xl font-bold"> Inner Space</div>
        <div className="flex justify-between items-center gap-2">
          {children}
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
