import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { hexOrColor, readableTextColor, setBrightness } from "@operational/utils"

import { ReactFeatherIconName } from "./ReactFeather"

export interface IProps {
  id?: string | number
  css?: any
  className?: string
  children: React.ReactNode
  number?: number
  label: string
  fill: number
  color?: string
  barColor?: string
  icon?: ReactFeatherIconName
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

const Container = glamorous.div(
  {
    label: "breakdown",
    display: "flex",
    alignItems: "center",
    position: "relative",
    maxWidth: 300
  },
  ({ theme, onClick }: { theme?: Theme; onClick: () => void }) => ({
    padding: `${theme.spacing / 2}px ${theme.spacing / 2}px ${theme.spacing / 2}px ${3 * theme.spacing}px`,
    ...onClick
      ? {
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.01)"
          }
        }
      : {},
    background: theme.colors.white,
    ":not(:first-child)": {
      borderTop: `1px solid ${theme.colors.gray20}`
    }
  })
)

const Content = glamorous.div({
  width: "100%"
})

const Label = glamorous.label(
  {
    display: "block"
  },
  ({ theme }: { theme?: Theme }) => ({
    marginBottom: theme.spacing / 4,
    fontSize: theme.typography.small.fontSize
  })
)

const Bar = glamorous.div(
  {
    position: "relative",
    width: "100%",
    fontSize: 12,
    overflow: "hidden",
    "& > span": {
      position: "relative",
      padding: 2
    },
    ":before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 0,
      display: "block",
      height: "100%",
      pointerEvents: "none"
    }
  },
  ({ theme, fill, color }: { theme: Theme; fill: number; color: string }) => {
    const backgroundColor: string = color
      ? (hexOrColor(color)(theme.colors[color] || theme.colors.info) as string)
      : theme.colors.info
    return {
      padding: `${theme.spacing / 4}px ${theme.spacing / 2}px`,
      backgroundColor: theme.colors.gray10,
      "> span": {
        color: theme.colors.gray70,
        fontSize: 12,
        position: "relative",
        top: 1,
        fontWeight: 400
      },
      ":before": {
        backgroundColor: setBrightness(backgroundColor, 145),
        transition: "all 0.3s ease-in-out",
        width: `${fill * 100}%`
      }
    }
  }
)

const Number = glamorous.div(
  {
    fontSize: 24,
    position: "absolute"
  },
  ({ theme }: { theme: Theme }) => ({
    top: theme.spacing,
    right: `calc(100% - ${3.75 * theme.spacing}px)`,
    minWidth: theme.spacing * 3,
    paddingRight: theme.spacing,
    paddingLeft: theme.spacing / 2,
    fontWeight: theme.typography.title.fontWeight,
    color: theme.colors.gray20
  })
)

export default (props: IProps) => (
  <Container
    key={props.id}
    css={props.css}
    className={props.className}
    onClick={props.onClick}
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave}
  >
    <Number>{props.number}</Number>
    <Content>
      <Label>{props.children}</Label>
      <Bar color={props.color} fill={props.fill}>
        <span>{props.label}</span>
      </Bar>
    </Content>
  </Container>
)
