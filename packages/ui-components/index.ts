// Simple imports n' exports for consumers of the library.

import { ThemeProvider } from "glamorous"

import Button from "./src/Button/Button"
import ButtonGroup from "./src/ButtonGroup/ButtonGroup"
import Breakdown from "./src/Breakdown/Breakdown"
import Card, { CardHeader } from "./src/Card/Card"
import Chip from "./src/Chip/Chip"
import ColorPicker from "./src/ColorPicker/ColorPicker"
import ContextMenu, { ContextMenuItem } from "./src/ContextMenu/ContextMenu"
import Grid from "./src/Grid/Grid"
import DatePicker from "./src/DatePicker/DatePicker"
import Fieldset from "./src/Fieldset/Fieldset"
import Header, { HeaderItem, HeaderSeparator, HeaderTitle } from "./src/Header/Header"
import Icon from "./src/Icon/Icon"
import InfoTile from "./src/InfoTile/InfoTile"
import Input from "./src/Input/Input"
import Modal from "./src/Modal/Modal"
import Paginator from "./src/Paginator/Paginator"
import PlusChip from "./src/PlusChip/PlusChip"
import Progress from "./src/Progress/Progress"
import Select from "./src/Select/Select"
import Sidebar, { SidebarItem, SidebarLink } from "./src/Sidebar/Sidebar"
import SideNavigation, {
  SideNavigationHeader,
  SideNavigationItem,
  SideNavigationLink
} from "./src/SideNavigation/SideNavigation"
import Spinner from "./src/Spinner/Spinner"
import Switch from "./src/Switch/Switch"
import Tabs, { Tab } from "./src/Tabs/Tabs"
import Tooltip from "./src/Tooltip/Tooltip"
import Timeline, { TimelineItem } from "./src/Timeline/Timeline"
import { TitleType, Heading1Type, Heading2Type, BodyType, SmallType } from "./src/Typography/Typography"
import theme from "./src/theme"
import Upload from "./src/Upload/Upload"

export {
  Button,
  ButtonGroup,
  Breakdown,
  Card,
  CardHeader,
  Chip,
  ColorPicker,
  ContextMenu,
  ContextMenuItem,
  Grid,
  DatePicker,
  Fieldset,
  Header,
  HeaderItem,
  HeaderSeparator,
  HeaderTitle,
  Icon,
  InfoTile,
  Input,
  Modal,
  Paginator,
  PlusChip,
  Progress,
  Select,
  SideNavigation,
  SideNavigationHeader,
  SideNavigationItem,
  SideNavigationLink,
  Sidebar,
  SidebarItem,
  SidebarLink,
  Spinner,
  Switch,
  Tabs,
  Tab,
  Timeline,
  TimelineItem,
  Tooltip,
  TitleType,
  Heading1Type,
  Heading2Type,
  BodyType,
  SmallType,
  theme as contiamoTheme,
  ThemeProvider,
  Upload
}
