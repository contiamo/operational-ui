import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { css } from "glamor"
import ContextMenuItem from "./ContextMenuItem"
import { fadeIn } from "contiamo-ui-utils"
import { Theme } from "contiamo-ui-theme"

export interface IProps {
  css?: {}
  className?: string
  children: React.ReactNode
  expandOnHover?: boolean
}

export interface IState {
  isHovered: boolean
  isActive: boolean
}

const Container = glamorous.div(({ theme }: { theme: Theme }): any => ({
  position: "relative",
  width: "fit-content",
  margin: theme.spacing * 2
}))

const MenuContainer = glamorous.div(({ theme, isExpanded }: { theme: Theme; isExpanded: boolean }): any => ({
  position: "absolute",
  top: "100%",
  left: "0%",
  boxShadow: theme.shadows.popup,
  width: "fit-content",
  ...isExpanded ? { display: "block", animation: `${fadeIn} ease-in-out forwards 0.2s` } : { display: "none" }
}))

class ContextMenu extends React.Component<IProps, IState> {
  state = {
    isHovered: false,
    isActive: false
  }

  containerNode: any
  menuContainerNode: any
  outsideClickHandler: any

  handleClick(ev: any): void {
    const newIsActive = this.menuContainerNode.contains(ev.target)
      ? this.state.isActive
      : this.containerNode.contains(ev.target) ? !this.state.isActive : false
    this.setState(prevState => ({ isActive: newIsActive }))
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClick.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick.bind(this))
  }

  render() {
    const menuItems: any = []
    const children: any = []
    React.Children.forEach(this.props.children, (child: any): void => {
      if (child.type === ContextMenuItem) {
        menuItems.push(child)
      } else {
        children.push(child)
      }
    })
    const hoverProps = this.props.expandOnHover
      ? {
          onMouseEnter: (ev: any) => {
            this.setState(prevState => ({ isHovered: true }))
          },

          onMouseLeave: (ev: any) => {
            this.setState(prevState => ({ isHovered: false }))
          }
        }
      : {}
    return (
      <Container
        innerRef={node => {
          this.containerNode = node
        }}
        css={this.props.css}
        className={this.props.className}
        {...hoverProps}
      >
        {children}
        <MenuContainer
          innerRef={node => {
            this.menuContainerNode = node
          }}
          isExpanded={this.state.isActive || this.state.isHovered}
        >
          {menuItems}
        </MenuContainer>
      </Container>
    )
  }
}

export default ContextMenu
export { ContextMenuItem }
