import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { css } from "glamor"
import { fadeIn } from "@operational/utils"
import { Theme } from "@operational/theme"

import ContextMenuItem from "./ContextMenuItem"

export interface IProps {
  id?: string | number
  css?: {}
  className?: string
  children: React.ReactNode
  openOnHover?: boolean
  keepOpenOnItemClick?: boolean
}

export interface IState {
  isHovered: boolean
  isOpen: boolean
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
    isOpen: false
  }

  containerNode: any
  menuContainerNode: any
  outsideClickHandler: any

  handleClick(ev: any): void {
    const newIsActive = this.menuContainerNode.contains(ev.target)
      ? this.state.isOpen
      : this.containerNode.contains(ev.target) ? !this.state.isOpen : false
    this.setState(prevState => ({ isOpen: newIsActive }))
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
    React.Children.forEach(this.props.children, (child: any, index: number): void => {
      if (child.type === ContextMenuItem) {
        const { onClick } = child.props
        menuItems.push(
          React.cloneElement(child, {
            key: index,
            onClick:
              onClick &&
              (() => {
                if (!this.props.keepOpenOnItemClick) {
                  this.setState(prevState => ({
                    isOpen: false
                  }))
                }
                onClick()
              })
          })
        )
      } else {
        children.push(child)
      }
    })
    const hoverProps = this.props.openOnHover
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
        key={this.props.id}
        css={this.props.css}
        className={this.props.className}
        {...hoverProps}
      >
        {children}
        <MenuContainer
          innerRef={node => {
            this.menuContainerNode = node
          }}
          isExpanded={this.state.isOpen || this.state.isHovered}
        >
          {menuItems}
        </MenuContainer>
      </Container>
    )
  }
}

export default ContextMenu
export { ContextMenuItem }
