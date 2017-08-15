// Simple imports n' exports for consumers of the library.

import Header, { HeaderItem, HeaderSeparator, HeaderTitle } from './src/components/Header/Header';

import SideNavigation, {
  SideNavigationItem,
  SideNavigationLink,
  SideNavigationTooltip,
} from './src/components/SideNavigation/SideNavigation';

import Chip from './src/components/Chip/Chip';
import PlusChip from './src/components/PlusChip/PlusChip';
import Card from './src/components/Card/Card';
import Stat from './src/components/Stat/Stat';

import contiamoTheme from './src/App.theme';

import { ThemeProvider } from 'glamorous';

export {
  Header,
  HeaderItem,
  HeaderSeparator,
  HeaderTitle,
  SideNavigation,
  SideNavigationItem,
  SideNavigationLink,
  SideNavigationTooltip,
  Chip,
  PlusChip,
  Card,
  Stat,
  contiamoTheme,
  ThemeProvider,
};
