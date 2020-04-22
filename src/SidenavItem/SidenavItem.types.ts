import { SidenavHeaderProps } from "../SidenavHeader/SidenavHeader"
import { IconComponentType } from "../Icon"
import { IContextMenuItem } from "../ContextMenu/ContextMenu.Item"
import { DefaultProps } from "../types"

export interface SidenavItemProps extends DefaultProps, React.BaseHTMLAttributes<HTMLDivElement> {
  /** What should we do on click? */
  onClick?: (e: React.MouseEvent) => void
  /** Navigation property à la react-router <Link/> */
  to?: string
  /** Is it currently active? */
  active?: boolean
  /** An Icon for the menu item */
  icon?: IconComponentType
  /** A label for the item when the containing sidenav is full */
  label: React.ReactNode
  /** A label for the item when the containing sidenav is compact */
  compactLabel?: string
  compact?: SidenavHeaderProps["compact"]
  /** Should we place this at the bottom of its sidenav? */
  end?: boolean
  /** Render a dark sidenav item */
  dark?: boolean
  /** Items for sidenav popout */
  items?: Array<IContextMenuItem & { items?: IContextMenuItem[] }>
  /** for internal use */
  _level?: number
}
