import {CustomFlowbiteTheme} from 'flowbite-react/lib/esm/components/Flowbite/FlowbiteTheme';

export const flowbiteTheme: CustomFlowbiteTheme = {
  footer: {
    base: 'flex flex-col',
    brand: {
      base: 'm-6 flex items-center'
    },
    groupLink: {
      base: 'flex flex-col flex-wrap text-gray-500 dark:text-white',
      link: {
        base: 'mb-4 last:mr-0 md:mr-6'
      }
    },
    icon: {
      base: 'hover:text-gray-900 dark:hover:text-white text-gray-400'
    }
  },
  modal: {
    body: {
      base: 'space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8'
    }
  },
  tab: {
    base: 'flex flex-col',
    tablist: {
      styles: {
        default: 'flex-wrap',
      }
    },
    tabpanel: ""
  }
};
