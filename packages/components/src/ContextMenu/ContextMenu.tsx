import * as React from "react"
import styled from "react-emotion"
import { fadeIn } from "@operational/utils"
import { OperationalStyleConstants } from "../utils/constants"
import { WithTheme, Css, CssStatic } from "../types"
import { ContextMenuItem } from "../"

export interface Props {
  /** Id */
  id?: string

  /** Class name */
  className?: string

  children: React.ReactNode

  css?: any
  /** Specify whether the menu items are visible. Overrides internal open state that triggers on click. */
  open?: boolean

  /** Condensed mode */
  condensed?: boolean

  /** onClick method for all menu items */
  onClick?: (item?: any) => void

  /** Handles click events anywhere outside the context menu container, including menu items. */
  onOutsideClick?: () => void

  /** Suppresses the default behavior of closing the context menu when one of its items is clicked. */
  keepOpenOnItemClick?: boolean

  /** Menu items */
  items?: any[]
}

export interface State {
  isOpen: boolean
}

const Container = styled("div")(({ theme }: WithTheme) => ({
  label: "contextmenu",
  cursor: "pointer",
  position: "relative",
  width: "fit-content",
}))

const MenuContainer = styled("div")(
  ({
    theme,
    isExpanded,
    condensed,
  }: {
    theme?: OperationalStyleConstants
    isExpanded: boolean
    condensed: boolean
  }) => ({
    position: "absolute",
    top: "100%",
    left: 0,
    boxShadow: theme.shadows.popup,
    zIndex: theme.zIndex.selectOptions,
    padding: `0 ${theme.space.small}px`,
    backgroundColor: theme.color.white,
    width: "fit-content",
    ...(isExpanded
      ? {
          display: "block",
          animation: `${fadeIn} ease-in-out forwards 0.2s`,
        }
      : {
          display: "none",
        }),
  }),
)

class ContextMenu extends React.Component<Props, State> {
  state = {
    isOpen: false,
  }

  containerNode: any
  menuContainerNode: any
  outsideClickHandler: any

  handleClick = (ev: any): void => {
    const isTargetInsideMenu = this.menuContainerNode.contains(ev.target)
    const isTargetInsideContainer = this.containerNode.contains(ev.target)

    if (!isTargetInsideContainer && this.props.onOutsideClick) {
      this.props.onOutsideClick()
    }

    const newIsActive = isTargetInsideMenu ? this.state.isOpen : isTargetInsideContainer ? !this.state.isOpen : false
    this.setState(prevState => ({
      isOpen: newIsActive,
    }))
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick)
  }

  render() {
    return (
      <Container
        innerRef={node => {
          this.containerNode = node
        }}
        id={this.props.id}
        css={this.props.css}
        className={this.props.className}
      >
        {this.props.children}
        <MenuContainer
          innerRef={node => {
            this.menuContainerNode = node
          }}
          isExpanded={this.props.open || this.state.isOpen}
          condensed={this.props.condensed}
        >
          {(this.props.items || []).map((item: any, index: number) => {
            const onClick = () => {
              if (!this.props.keepOpenOnItemClick) {
                this.setState(() => ({
                  isOpen: false,
                }))
              }

              const clickHandler = item.onClick || this.props.onClick
              clickHandler && clickHandler(item)
            }
            return (
              <ContextMenuItem onClick={onClick} key={`contextmenu-${index}`} condensed={this.props.condensed}>
                {item.label || item}
              </ContextMenuItem>
            )
          })}
        </MenuContainer>
      </Container>
    )
  }
}

export default ContextMenu
