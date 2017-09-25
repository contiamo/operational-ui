import * as React from "react"
import * as ReactFeather from 'react-feather'
import glamorous from "glamorous"

import { hexOrColor, readableTextColor, darken } from "contiamo-ui-utils"

type Props = {
  className?: string
  icon?: string
  label?: string
  children: React.ReactNode
  theme?: Theme
  color?: string
}

const Container = glamorous.div(({ theme, color, withIcon }: {color?: string, theme: Theme, withIcon: boolean}): any => {
  const backgroundColor = color ? hexOrColor(color)((theme.colors && theme.colors[color]) || "white") : "white"

  return {
    backgroundColor,
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
    padding: theme.spacing / 2,
    paddingRight: withIcon ? (theme.spacing/2 + 20) : (theme.spacing / 2),
    color: readableTextColor(backgroundColor)(["black", "white"]),

    "& + &": {
      borderLeft: "1px solid",
      borderLeftColor: darken(backgroundColor)(10)
    }
  }
})

const Label = glamorous.small(({ color, theme }: {color?: string, theme: Theme}): any => {
  const backgroundColor = color ? hexOrColor(color)((theme.colors && theme.colors[color]) || "white") : "white"
  return {
    ...theme.typography.small,
    marginBottom: 3,
    fontWeight: 600,
    color: readableTextColor(backgroundColor)([theme.colors.grey60, theme.colors.grey10])
  }
})

const IconContainer = glamorous.div({})

const InfoTile: React.SFC<Props> = ({ className, label, children, color, icon }: Props) => (
  <Container withIcon={!!icon} color={color} className={`${className}`}>
    <Label color={color}>{label}</Label>
    <span>{children}</span>
    {
      icon ?
      <IconContainer>
        {(function() {
          if (ReactFeather.hasOwnProperty(icon)) {
            const Comp = ReactFeather[icon]
            return <Comp size={20} />
          }
          return null
        }())}
      </IconContainer> : null
    }
  </Container>
)

export default InfoTile
