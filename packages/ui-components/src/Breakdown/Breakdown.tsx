import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "../theme"
import { hexOrColor, readableTextColor, setBrightness } from "contiamo-ui-utils"
import { ReactFeatherIconName } from "../Icon/ReactFeather"

export interface IProps {
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
    display: "flex",
    alignItems: "center",
    maxWidth: 300
  },
  ({ theme, onClick }: { theme?: Theme; onClick: () => void }) => ({
    padding: theme.spacing / 2,
    ...onClick
      ? {
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.01)"
          }
        }
      : {},
    background: theme.colors.palette.white,
    ":not(:first-child)": {
      borderTop: `1px solid ${theme.colors.palette.grey20}`
    }
  })
)

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
      ? hexOrColor(color)(theme.colors.palette[color] || theme.colors.palette.info) as string
      : theme.colors.palette.info
    return {
      padding: `${theme.spacing / 4}px ${theme.spacing / 2}px`,
      backgroundColor: theme.colors.palette.grey10,
      "> span": {
        color: theme.colors.palette.grey70,
        fontSize: 12,
        position: "relative",
        top: 1,
        fontWeight: 400
      },
      ":before": {
        backgroundColor: setBrightness(backgroundColor, 145),
        width: `${fill * 100}%`
      }
    }
  }
)

const Number = glamorous.div(
  {
    fontSize: 24
  },
  ({ theme }: { theme?: Theme }) => ({
    minWidth: theme.spacing * 3,
    paddingRight: theme.spacing,
    paddingLeft: theme.spacing / 2,
    fontWeight: theme.typography.title.fontWeight,
    color: theme.colors.palette.grey20
  })
)

export default ({
  css,
  className,
  children,
  color,
  label,
  fill,
  number,
  onClick,
  onMouseEnter,
  onMouseLeave
}: IProps) => (
  <Container css={css} className={className} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <Number>{number}</Number>
    <div style={{ width: "100%" }}>
      <Label>{children}</Label>
      <Bar color={color} fill={fill}>
        <span>{label}</span>
      </Bar>
    </div>
  </Container>
)
