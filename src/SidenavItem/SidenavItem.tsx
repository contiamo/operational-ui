import * as React from "react"
import { Interpolation, Themed } from "react-emotion"
import Icon, { IconName } from "../Icon/Icon"
import OperationalContext from "../OperationalContext/OperationalContext"
import { SidenavHeaderProps } from "../SidenavHeader/SidenavHeader"
import { DefaultProps } from "../types"
import { isModifiedEvent } from "../utils"
import { OperationalStyleConstants } from "../utils/constants"
import styled from "../utils/styled"

export interface SidenavItemProps extends DefaultProps {
  /** What should we do on click? */
  onClick?: () => void
  /** Navigation property à la react-router <Link/> */
  to?: string
  /** Is it currently active? */
  active?: boolean
  /** An Icon for the menu item */
  icon?: IconName
  /** A label for the item when the containing sidenav is full */
  label: string
  /** A label for the item when the containing sidenav is compact */
  shortLabel?: string
  compact?: SidenavHeaderProps["compact"]
}

const getSize = (compact = false) => (compact ? 30 : 18)

const containerStyles: Interpolation<
  Themed<
    {
      isActive: boolean
      compact: SidenavHeaderProps["compact"]
    },
    OperationalStyleConstants
  >
> = ({ theme, compact, isActive }) => ({
  display: "flex",
  padding: `${compact ? 10 : 0}px ${compact ? 0 : theme.space.content}px`,
  height: compact ? "auto" : 36,
  cursor: "pointer",
  position: "relative",
  width: "100%",
  alignItems: "center",
  flexDirection: compact ? "column" : "row",
  justifyContent: compact ? "center" : "flex-start",
  whiteSpace: "nowrap",
  userSelect: "none",
  fontSize: theme.font.size.body,
  color: isActive ? theme.color.primary : theme.color.text.lightest,
  fontWeight: theme.font.weight.regular,
  boxShadow: isActive && compact ? `2px 0 0 inset ${theme.color.primary}` : "none",
  // Specificity is piled up here to override default styles
  "a:link&, a:visited&": {
    textDecoration: "none",
    color: isActive ? theme.color.primary : theme.color.text.lightest,
  },
  "&:hover": {
    backgroundColor: theme.color.background.lighter,
    color: isActive ? theme.color.primary : theme.color.text.dark,
  },
  "&:last-child": {
    marginBottom: theme.space.content,
  },
})

const Container = styled("div")(containerStyles)
const ContainerLink = styled("a")(containerStyles)

const IconContainer = styled("span")<{ compact: SidenavItemProps["compact"] }>(({ compact, theme }) => {
  const iconSize = getSize(compact)
  return {
    width: iconSize,
    height: iconSize,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flex: `0 0 ${iconSize}px`,
    marginRight: compact ? 0 : theme.space.small,
  }
})

const Label = styled("span")<{ compact: SidenavHeaderProps["compact"] }>(({ compact, theme }) => {
  return compact
    ? {
        marginTop: theme.space.medium,
        padding: 0,
        display: "block",
        fontSize: 11,
        fontWeight: theme.font.weight.medium,
        lineHeight: 1.18,
        color: theme.color.text.lighter,
        textTransform: "uppercase",
        width: "100%",
        wordBreak: "break-all",
        wordWrap: "break-word",
        overflow: "hidden",
        textAlign: "center",
      }
    : {
        display: "inline-block",
        paddingLeft: theme.space.base,
      }
})

const SidenavItem: React.SFC<SidenavItemProps> = ({ to, active, icon, label, compact, shortLabel, ...props }) => {
  const ContainerComponent = to ? ContainerLink : Container
  const isActive = Boolean(active)
  return (
    <OperationalContext>
      {ctx => (
        <ContainerComponent
          {...props}
          compact={compact}
          href={to}
          onClick={(ev: React.SyntheticEvent<Node>) => {
            ev.stopPropagation()
            if (props.onClick) {
              props.onClick()
            }

            if (!isModifiedEvent(ev) && to && ctx.pushState) {
              ev.preventDefault()
              ctx.pushState(to)
            }
          }}
          isActive={isActive}
        >
          <IconContainer compact={compact}>
            {icon === String(icon) ? <Icon name={icon} size={getSize(compact)} /> : icon}
          </IconContainer>
          <Label compact={compact}>{compact ? shortLabel || label : label}</Label>
        </ContainerComponent>
      )}
    </OperationalContext>
  )
}

export default SidenavItem
