// Simple imports n' exports for consumers of the library.

import Header, { HeaderItem, HeaderSeparator, HeaderTitle } from "./src/Header/Header"

import SideNavigation, {
  SideNavigationHeader,
  SideNavigationItem,
  SideNavigationLink,
} from "./src/SideNavigation/SideNavigation"

import Sidebar, { SidebarItem, SidebarLink } from "./src/Sidebar/Sidebar"

import Button from "./src/Button/Button"

import Tooltip from "./src/Tooltip/Tooltip"

import withTooltip from "./src/Tooltip/withTooltip"

import Chip from "./src/Chip/Chip"
import PlusChip from "./src/PlusChip/PlusChip"
import Card, { CardHeader } from "./src/Card/Card"
import Stat from "./src/Stat/Stat"
import Icon from "./src/Icon/Icon"

import Input from "./src/Input/Input"
import Select from "./src/Select/Select"

import theme from "./src/theme"

import { ThemeProvider } from "glamorous"

export {
  Header,
  HeaderItem,
  HeaderSeparator,
  HeaderTitle,
  SideNavigation,
  SideNavigationHeader,
  SideNavigationItem,
  SideNavigationLink,
  Sidebar,
  SidebarItem,
  SidebarLink,
  Button,
  Tooltip,
  withTooltip,
  Chip,
  PlusChip,
  Card,
  CardHeader,
  Stat,
  Input,
  Icon,
  Select,
  theme as contiamoTheme,
  ThemeProvider,
}
