import * as React from "react"
import Icon, { IconName } from "../Icon/Icon"
import OperationalContext from "../OperationalContext/OperationalContext"
import { SidenavHeaderProps } from "../SidenavHeader/SidenavHeader"
import { DefaultProps } from "../types"
import { isModifiedEvent } from "../utils"
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
  /** **Compact-mode only:** Should we place this at the bottom? */
  end?: boolean
}

const getIconSize = (compact = false) => (compact ? 30 : 18)

const makeContainer = (type: "link" | "block") =>
  styled(type === "link" ? "a" : "div")<{
    compact: SidenavHeaderProps["compact"]
    isActive: SidenavHeaderProps["active"]
    end_: boolean
  }>(({ theme, compact, isActive, end_ }) => {
    const shouldPlaceAtBottom = Boolean(end_)
    return {
      display: "flex",
      padding: `${compact ? 10 : 0}px ${compact ? 0 : theme.space.content}px`,
      height: compact ? "auto" : 36,
      cursor: "pointer",
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
      marginTop: shouldPlaceAtBottom ? "auto" : 0,
      alignSelf: shouldPlaceAtBottom ? "flex-end" : "flex-start",
      ...(shouldPlaceAtBottom ? { "& + &": { marginTop: 0 } } : {}),
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
        marginBottom: shouldPlaceAtBottom ? 0 : theme.space.content,
      },
    }
  })

const IconContainer = styled("span")<{ compact: SidenavItemProps["compact"] }>(({ compact, theme }) => {
  const iconSize = getIconSize(compact)
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

const Label = styled("span")<{ compact: SidenavHeaderProps["compact"]; hasIcon: boolean }>(
  ({ compact, theme, hasIcon }) => {
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
          paddingLeft: hasIcon ? theme.space.base : 0,
        }
  },
)

const SidenavItem: React.SFC<SidenavItemProps> = ({ to, active, icon, label, compact, shortLabel, end, ...props }) => {
  const Container = to ? makeContainer("link") : makeContainer("block")
  const isActive = Boolean(active)
  return (
    <OperationalContext>
      {ctx => (
        <Container
          {...props}
          end_={Boolean(end)}
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
          {icon && (
            <IconContainer compact={compact}>
              <Icon name={icon} size={getIconSize(compact)} />
            </IconContainer>
          )}
          <Label hasIcon={Boolean(icon)} compact={compact}>
            {compact ? shortLabel || label : label}
          </Label>
        </Container>
      )}
    </OperationalContext>
  )
}

export default SidenavItem
