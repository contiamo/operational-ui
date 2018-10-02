import { isEqual } from "lodash"
import * as React from "react"

import { DefaultProps } from "../types"
import styled from "../utils/styled"

import ContextMenuItem, { IContextMenuItem } from "./ContextMenu.Item"

export interface ContextMenuProps extends DefaultProps {
  children: React.ReactNode | ((isActive: boolean) => React.ReactNode)
  /** Specify whether the menu items are visible. Overrides internal open state that triggers on click. */
  open?: boolean
  /** Condensed mode */
  condensed?: boolean
  /** onClick method for all menu items */
  onClick?: (item?: string | IContextMenuItem) => void
  /** Handles click events anywhere outside the context menu container, including menu items. */
  onOutsideClick?: () => void
  /** Suppresses the default behavior of closing the context menu when one of its items is clicked. */
  keepOpenOnItemClick?: boolean
  /** Menu items */
  items: Array<string | IContextMenuItem>
  /** Where shall we place an icon in rows? */
  iconLocation?: "left" | "right"
  /** Alignment */
  align?: "left" | "right"
  /** Custom width */
  width?: number
  /**
   * Whether to include the click element in the context menu styling.
   * Only recommended when the click element is the same width as the context menu.
   */
  embedChildrenInMenu?: boolean
}

export interface State {
  isOpen: boolean
  focusedItemIndex: number
}

const Container = styled("div")(({ align }: { align: ContextMenuProps["align"] }) => ({
  label: "contextmenu",
  cursor: "pointer",
  position: "relative",
  width: "fit-content",
  display: "flex",
  alignItems: "center",
  justifyContent: align === "left" ? "flex-start" : "flex-end",
}))

const MenuContainer = styled("div")<{
  isExpanded: boolean
  embedChildrenInMenu?: ContextMenuProps["embedChildrenInMenu"]
}>(({ theme, isExpanded, embedChildrenInMenu }) => ({
  position: "absolute",
  top: embedChildrenInMenu ? 0 : "100%",
  left: 0,
  maxHeight: 360,
  overflow: "auto",
  boxShadow: theme.shadows.popup,
  zIndex: theme.zIndex.selectOptions,
  width: `calc(100% - ${theme.space.small}px)`,
  minWidth: "fit-content",
  display: isExpanded ? "block" : "none",
}))

const keyCodes = {
  up: 38,
  down: 40,
  enter: 13,
  esc: 27,
}

class ContextMenu extends React.Component<ContextMenuProps, State> {
  public menu: HTMLDivElement | null = null

  public state: State = {
    isOpen: false,
    focusedItemIndex: 0,
  }

  public static defaultProps: Partial<ContextMenuProps> = {
    align: "left",
    embedChildrenInMenu: false,
  }

  public componentDidUpdate(prevProps: ContextMenuProps) {
    if (this.state.isOpen) {
      document.addEventListener("click", this.toggle)
    } else {
      document.removeEventListener("click", this.toggle)
    }

    // Reset focused item to first if items change.
    if (!isEqual(this.props.items, prevProps.items)) {
      this.setState(() => ({ focusedItemIndex: 0 }))
      this.focusElement()
    }
  }

  public toggle = () =>
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }))

  private focusElement = () => {
    if (this.menu && this.menu.querySelector('[tabindex="0"]')) {
      setTimeout(() => (this.menu!.querySelector('[tabindex="0"]') as HTMLDivElement).focus())
    }
  }

  private onUpPress = () => ({
    focusedItemIndex: this.state.focusedItemIndex === 0 ? this.props.items.length - 1 : this.state.focusedItemIndex - 1,
  })

  private onDownPress = () => ({
    focusedItemIndex: this.state.focusedItemIndex === this.props.items.length - 1 ? 0 : this.state.focusedItemIndex + 1,
  })

  private handleKeyPress = ({ keyCode }: React.KeyboardEvent<HTMLDivElement>) => {
    if (keyCode === keyCodes.enter && this.props.onClick) {
      this.props.onClick(this.props.items[this.state.focusedItemIndex])
      this.setState(() => ({ isOpen: false }))
      return
    }

    if (keyCode === keyCodes.esc) {
      this.setState(() => ({ isOpen: false }))
    }

    if ([keyCodes.up, keyCodes.down].includes(keyCode)) {
      this.setState(keyCode === keyCodes.up ? this.onUpPress : this.onDownPress)
      this.focusElement()
    }
  }

  public render() {
    if (!this.props.items) {
      throw new Error("No array of items has been provided for the ContextMenu.")
    }

    const { items, condensed, iconLocation, children, open, embedChildrenInMenu, align, width, ...props } = this.props

    const renderedChildren = typeof children === "function" ? children(this.state.isOpen) : children
    return (
      <Container {...props} align={align} onClick={this.toggle} onKeyUp={this.handleKeyPress}>
        {renderedChildren}
        {this.state.isOpen && (
          <MenuContainer
            innerRef={node => (this.menu = node)}
            isExpanded={open || this.state.isOpen}
            embedChildrenInMenu={this.props.embedChildrenInMenu}
          >
            {embedChildrenInMenu && renderedChildren}
            {items.map((item: string | IContextMenuItem, index: number) => {
              const clickHandler = (typeof item !== "string" && item.onClick) || this.props.onClick
              return (
                <ContextMenuItem
                  tabIndex={this.state.focusedItemIndex === index ? 0 : -1} // ref "tabindex roving": https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex
                  onClick={clickHandler && (() => clickHandler(item))}
                  key={`contextmenu-${index}`}
                  condensed={condensed}
                  align={align}
                  iconLocation={iconLocation}
                  width={width || "100%"}
                  item={item}
                />
              )
            })}
          </MenuContainer>
        )}
      </Container>
    )
  }
}

export default ContextMenu
