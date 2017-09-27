import * as React from "react"
import * as ReactFeather from "react-feather"
import glamorous from "glamorous"

import { hexOrColor, readableTextColor, darken } from "contiamo-ui-utils"

interface Props {
  className?: string
  icon?: ReactFeatherIconName
  onIconClick?: () => void
  label?: string
  children: React.ReactNode
  color?: string
}

const Container = glamorous.div(
  {
    "&:not(:first-child)": {
      borderLeftWidth: 1,
      borderLeftStyle: "solid"
    }
  },
  ({ theme, color, withIcon }: { color?: string; theme: Theme; withIcon: boolean }): any => {
    const backgroundColor = color ? hexOrColor(color)((theme.colors && theme.colors[color]) || "white") : "white"

    return {
      backgroundColor,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      width: "fit-content",
      borderColor: darken(backgroundColor)(15),
      padding: theme.spacing / 2,
      paddingRight: withIcon ? theme.spacing + 20 : theme.spacing / 2,
      color: readableTextColor(backgroundColor)(["black", "white"])
    }
  }
)

const Label = glamorous.small(({ color, theme }: { color?: string; theme: Theme }): any => {
  const backgroundColor = color ? hexOrColor(color)((theme.colors && theme.colors[color]) || "white") : "white"
  return {
    ...theme.typography.small,
    marginBottom: 3,
    fontWeight: 600,
    color: readableTextColor(backgroundColor)([theme.colors.grey60, theme.colors.grey10])
  }
})

const IconContainer = glamorous.div(
  {
    width: 20,
    height: 20,
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)"
  },
  ({ theme, color }: { theme: Theme; color?: string }) => {
    const backgroundColor = color ? hexOrColor(color)((theme.colors && theme.colors[color]) || "white") : "white"

    return {
      right: theme.spacing / 2,
      "& svg": {
        stroke: readableTextColor(backgroundColor)([theme.colors.white, theme.colors.black])
      }
    }
  }
)

const InfoTile: React.SFC<Props> = ({ className, label, children, color, icon, onIconClick }: Props) => (
  <Container withIcon={!!icon} color={color} className={className}>
    <Label color={color}>{label}</Label>
    <span>{children}</span>
    {icon ? (
      <IconContainer color={color} onClick={onIconClick}>
        {(() => {
          if (ReactFeather.hasOwnProperty(icon)) {
            const Comp = ReactFeather[icon]
            return <Comp size={20} />
          }
          return null
        })()}
      </IconContainer>
    ) : null}
  </Container>
)

export default InfoTile
