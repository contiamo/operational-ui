// Simple imports n' exports for consumers of the library.

import SideNavigation, {
  SideNavigationItem,
  SideNavigationLink,
  SideNavigationTooltip,
} from './src/components/SideNavigation/SideNavigation';

import Header, { HeaderItem, HeaderSeparator, HeaderTitle } from './components/Header/Header';

import contiamoTheme from './src/App.theme';
import { ThemeProvider } from 'glamorous';

export {
  SideNavigation,
  SideNavigationItem,
  SideNavigationLink,
  SideNavigationTooltip,
  Header,
  HeaderItem,
  HeaderSeparator,
  HeaderTitle,
  contiamoTheme,
  ThemeProvider,
};
