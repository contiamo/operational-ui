import * as React from "react"
import OperationalContext from "../OperationalContext/OperationalContext"
import { SidenavProps } from "../Sidenav/Sidenav"
import { SidenavItemProps } from "../SidenavItem/SidenavItem.types"
import { DefaultProps } from "../types"
import { isModifiedEvent, isOutsideLink } from "../utils"
import styled from "../utils/styled"
import { truncate } from "../utils/truncate"
import { IconComponentType } from "../Icon"

export interface SidenavHeaderProps extends DefaultProps {
  /** Main label for the header */
  label: string | React.ReactNode
  /** Navigation property à la react-router <Link/> */
  to?: string
  /** Specifies an icon to render on the left of the label, displayed only if the `condensed` option is used. */
  icon?: IconComponentType | React.ReactNode
  /** Color used in highlights and the side strip (hex or named color from `theme.colors`) */
  color?: string
  /** Condensed option  */
  condensed?: boolean
  /** Active state - renders colored strip on the left */
  active?: boolean
  /** Callback called when the active state changes */
  onToggle?: (newActiveState: boolean) => void
  /** Click handler */
  onClick?: () => void
  /** Close handler (via chevron button on the top right) */
  onClose?: () => void
  children?: React.ReactNode
  /** Should the header be small? */
  compact?: SidenavProps["compact"]
  /** Render a dark sidenav header */
  dark?: boolean
}

const SidenavHeaderBase = styled<"div" | "a">("div")<{
  as?: "div" | "a"
  compact: SidenavHeaderProps["compact"]
  dark?: SidenavHeaderProps["dark"]
}>(({ theme, compact, dark }) => {
  const color = dark ? theme.color.white : theme.color.text.default

  return {
    label: "sidenavheader",
    textDecoration: "none",
    width: "100%",
    borderBottom: compact ? 0 : "1px solid",
    borderBottomColor: dark ? theme.color.black : theme.color.separators.default,
    color,

    ":link, :visited": {
      color,
    },
  }
})

const Content = styled("div")<{
  onClick: SidenavHeaderProps["onClick"]
  isCondensed: boolean
  isActive: boolean
}>(({ theme, onClick, isCondensed, isActive }) => ({
  textDecoration: "none",
  cursor: Boolean(onClick) ? "pointer" : "initial",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  height: isCondensed ? 60 : 73,
  overflow: "hidden",
  padding: `0 ${theme.space.content}px`,
  width: "100%",
  marginBottom: isActive ? -26 : 0,
}))

const LabelText = styled("div")<{ isActive: boolean; compact: SidenavHeaderProps["compact"] }>`
  position: relative;
  display: flex;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  letter-spacing: 0.25;
  text-transform: uppercase;
  white-space: nowrap;
  user-select: none;
  margin: 0;
  ${({ theme }) => `
    font-size: ${theme.font.size.body}px;
  `};
`

const ItemsContainer = styled("div")({
  /** @todo add this animation when we move to a JSON-style API for SidenavHeaders */
  // animation: `${floatIn} .15s forwards ease`,
  position: "relative",
})

const Summary = styled("div")<{
  isActive: boolean
  compact: SidenavHeaderProps["compact"]
  dark?: SidenavHeaderProps["dark"]
}>`
  display: block;
  font-weight: normal;
  text-transform: none;
  user-select: none;
  margin-top: 4px;
  ${({ theme, isActive, compact, dark }) => `
    font-size: ${theme.font.size.fineprint}px;
    color: ${dark ? theme.color.white : theme.color.text.lightest};
    left: ${theme.space.content}px;
    visibility: ${compact || isActive ? "hidden" : "visible"};
  `};
`

const SidenavHeader: React.SFC<SidenavHeaderProps> = ({ onToggle, active, to, compact, dark, ...props }) => {
  const isActive = Boolean(active) || Boolean(compact)

  // The implementation of this component relies on the fact that it only has valid
  // `SidenavItem` components as children. The type casting here expresses that assumption.
  const childSidenavItems = (React.Children.toArray(props.children) || []) as Array<{ props: SidenavItemProps }>

  const hasChildLinks = childSidenavItems.some(child => Boolean(child.props.to))

  // Actual `to` prop should invalidate if the element has sublinks and is active
  const href = isActive && hasChildLinks ? undefined : to

  return (
    <OperationalContext>
      {ctx => {
        return (
          <SidenavHeaderBase
            {...props}
            as={href ? "a" : undefined}
            compact={compact}
            dark={dark}
            href={href}
            onClick={(ev: React.SyntheticEvent<Node>) => {
              if (props.onClick) {
                props.onClick()
              }
              if (onToggle) {
                onToggle(!active)
              }

              if (!isModifiedEvent(ev) && ctx.pushState && to && !isOutsideLink(to)) {
                ev.preventDefault()

                // Even if the `props.to` prop was ignored, redirect should still happen here
                ctx.pushState(to)
              }
            }}
          >
            {!compact && (
              <Content isActive={isActive} onClick={props.onClick} isCondensed={Boolean(props.condensed)}>
                <LabelText compact={compact} isActive={isActive}>
                  {props.label}
                  {props.icon && typeof props.icon === "function"
                    ? React.createElement(props.icon as IconComponentType, { right: true })
                    : props.icon}
                </LabelText>
                {!props.condensed && (
                  <Summary dark={dark} compact={compact} isActive={isActive}>
                    {truncate(24)(childSidenavItems.map(child => child.props.label).join(", "))}
                  </Summary>
                )}
              </Content>
            )}
            {isActive && (
              <ItemsContainer data-cy="operational-ui__sidenav-items">
                {React.Children.map(props.children, child => {
                  /**
                   * If a child manages to get here but does not exist
                   * it will have a value of `null` or `false`, then we
                   * should not attempt to extend it but rather forward it on
                   * as is.
                   */
                  if (!child) {
                    return child
                  }

                  const typedChild = child as React.ReactElement<SidenavItemProps>
                  return { ...typedChild, props: { ...typedChild.props, compact, dark } }
                })}
              </ItemsContainer>
            )}
          </SidenavHeaderBase>
        )
      }}
    </OperationalContext>
  )
}

export default SidenavHeader
