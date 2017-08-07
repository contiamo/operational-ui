// Simple imports n' exports for consumers of the library.

import SideNavigation, {
  SideNavigationItem,
  SideNavigationLink,
  SideNavigationTooltip,
} from './src/components/SideNavigation/SideNavigation';

import contiamoTheme from './src/App.theme';
import { ThemeProvider } from 'glamorous';

export {
  SideNavigation,
  SideNavigationItem,
  SideNavigationLink,
  SideNavigationTooltip,
  contiamoTheme,
  ThemeProvider,
};
