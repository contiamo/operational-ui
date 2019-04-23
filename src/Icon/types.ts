import { DefaultProps } from "../types"

export enum ICONS {
  OperationalUI = "OperationalUI",
  Pantheon = "Pantheon",
  Labs = "Labs",
  Contiamo = "Contiamo",

  Add = "Add",
  Admin = "Admin",
  Building = "Building",
  Bundle = "Bundle",
  CaretDown = "CaretDown",
  CaretLeft = "CaretLeft",
  CaretRight = "CaretRight",
  CaretUp = "CaretUp",
  Catalog = "Catalog",
  ChevronDown = "ChevronDown",
  ChevronLeft = "ChevronLeft",
  ChevronRight = "ChevronRight",
  ChevronUp = "ChevronUp",
  ChevronUpDown = "ChevronUpDown",
  Copy = "Copy",
  Database = "Database",
  Deploy = "Deploy",
  Document = "Document",
  EmptyCircle = "EmptyCircle",
  Entity = "Entity",
  Function = "Function",
  Funnel = "Funnel",
  Grid = "Grid",
  Home = "Home",
  Jobs = "Jobs",
  Lock = "Lock",
  Menu = "Menu",
  No = "No",
  Olap = "Olap",
  Open = "Open",
  Pause = "Pause",
  Play = "Play",
  Project = "Project",
  Redo = "Redo",
  Remove = "Remove",
  Resume = "Resume",
  Question = "Question",
  QuestionFill = "QuestionFill",
  SavedQuery = "SavedQuery",
  Schema = "Schema",
  Search = "Search",
  Share = "Share",
  SortAscending = "SortAscending",
  SortDescending = "SortDescending",
  Sql = "Sql",
  Sync = "Sync",
  Unlock = "Unlock",
  User = "User",
  Undo = "Undo",
  Users = "Users",
  Yes = "Yes",
}

export type BRAND_ICON = ICONS.Contiamo | ICONS.OperationalUI | ICONS.Pantheon | ICONS.Labs
export type CUSTOM_ICON = Exclude<ICONS, BRAND_ICON>

// Remove keyof typeof if we require enums to be used
export type IconName = keyof typeof ICONS

export interface SVGProps extends DefaultProps {
  /**
   * Size
   *
   * @default 18 for regular icons, 32 for brand icons
   */
  size?: number
  /** Icon color, specified as a hex, or a color name (info, success, warning, error) */
  color?: string
  /**
   * Indicates that this component is left of other content, and adds an appropriate right margin.
   */
  left?: boolean
  /**
   * Indicates that this component is right of other content, and adds an appropriate left margin.
   */
  right?: boolean
  /**
   * Icon name.
   * For OperationalUI brand icons, use the values `OperationalUI`, `Labs`, `Components`, `Blocks` and `Visualizations`
   */
  onClick?: (e: React.MouseEvent) => void
}

export interface CommunIconProps extends SVGProps {
  name: IconName
}

export interface OperationalUIIconProps extends CommunIconProps {
  name: "OperationalUI"
  /**
   * OperationalUI needs this prop to animate the inner circle.
   * All other icons should ignore it.
   */
  rotation?: number
}

export interface PantheonIconProps extends CommunIconProps {
  name: "Pantheon"
  /** Use the colored version of the logo (works for `name = Pantheon` only) */
  colored?: boolean
}

export interface OtherIconProps extends CommunIconProps {
  colored?: never
  rotation?: never
}

export type IconProps = OtherIconProps | OperationalUIIconProps | PantheonIconProps

type OmitName<T extends {}> = Pick<T, Exclude<keyof T, "name">>

export type CustomIconsData = { [key in CUSTOM_ICON]: React.FC<SVGProps> }

export interface BrandIconsData {
  [ICONS.OperationalUI]: React.SFC<OmitName<OperationalUIIconProps>>
  [ICONS.Pantheon]: React.SFC<OmitName<PantheonIconProps>>
  [ICONS.Labs]: React.SFC<SVGProps>
  [ICONS.Contiamo]: React.SFC<SVGProps>
}
