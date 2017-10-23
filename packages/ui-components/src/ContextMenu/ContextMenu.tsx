import * as React from "react"
import glamorous from "glamorous"
import { css } from "glamor"

import ContextMenuItem from "./ContextMenuItem"

interface IProps {
  css?: any
  className?: string
  children?: any
  expandOnHover?: boolean
}

interface IState {
  isHovered: boolean
  isActive: boolean
}

const fadeIn = css.keyframes({
  from: {
    opacity: 0,
    transform: "translate3d(0, -6px, 0)"
  },
  to: {
    opacity: 1,
    transform: "translate3d(0, 0, 0)"
  }
})

const Container = glamorous.div(({ theme }: { theme: Theme }): any => ({
  position: "relative",
  width: "fit-content",
  margin: theme.spacing * 2
}))

const MenuContainer = glamorous.div(({ theme, isExpanded }: { theme: Theme; isExpanded: boolean }): any => ({
  position: "absolute",
  top: "100%",
  left: "0%",
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

  handleClick(ev: any) {
    const newIsActive = this.menuContainerNode.contains(ev.target)
      ? this.state.isActive
      : this.containerNode.contains(ev.target) ? !this.state.isActive : false
    this.setState(prevState => ({ isActive: newIsActive }))
  }

  componentDidMount() {
    this.outsideClickHandler = (ev: any) => {
      this.handleClick(ev)
    }
    document.addEventListener("click", this.outsideClickHandler)
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.outsideClickHandler)
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
