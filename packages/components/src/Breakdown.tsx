import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme, expandColor } from "@operational/theme"
import { readableTextColor, setBrightness } from "@operational/utils"

import { IconName } from "./Icon"

export interface Props {
  id?: string
  css?: any
  className?: string
  children: React.ReactNode
  number?: number
  label: string
  fill: number
  color?: string
  barColor?: string
  icon?: IconName
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

const Container = glamorous.div(
  {
    label: "breakdown",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    maxWidth: 300
  },
  ({ theme, onClick }: { theme?: Theme; onClick: () => void }) => ({
    padding: `${theme.spacing * 3 / 4}px 0`,
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
      borderTop: `1px solid ${theme.colors.separator}`
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
      content: "' '",
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
    const backgroundColor: string = expandColor(theme, color) || theme.colors.info
    return {
      padding: `${theme.spacing / 4}px ${theme.spacing / 2}px`,
      backgroundColor: theme.colors.lightGray,
      "> span": {
        color: theme.colors.gray,
        fontSize: 12,
        position: "relative",
        top: 1,
        fontWeight: 400
      },
      ":before": {
        backgroundColor: setBrightness(backgroundColor, 155),
        transition: "all 0.3s ease-in-out",
        width: `${fill * 100}%`
      }
    }
  }
)

const Number = glamorous.div(
  {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  ({ theme }: { theme: Theme }): {} => ({
    ...theme.typography.heading1,
    flex: `0 0 ${theme.spacing * 2.5}px`,
    color: theme.colors.lightGray
  })
)

const Breakdown = (props: Props) => (
  <Container
    id={props.id}
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
        <glamorous.Span css={{ fontFeatureSettings: "'tnum'" }}>{props.label}</glamorous.Span>
      </Bar>
    </Content>
  </Container>
)

export default Breakdown
