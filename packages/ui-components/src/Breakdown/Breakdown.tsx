import * as React from "react"
import glamorous from "glamorous"
import { hexOrColor, readableTextColor } from "contiamo-ui-utils"

interface IProps {
  css?: any
  className?: string
  children: React.ReactNode
  number?: number
  label: string
  fill: number
  color?: string
  icon?: ReactFeatherIconName
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  theme?: Theme
}

const Container = glamorous.div(
  {
    display: "flex",
    alignItems: "center",
    maxWidth: 300
  },
  ({ theme, onClick }: { theme?: Theme; onClick: () => void }) => ({
    padding: theme.spacing / 2,
    cursor: onClick ? "pointer" : "auto",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.01)"
    },
    background: theme.colors.palette.white,
    "& + &": {
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
    overflow: "hidden",
    "& > div": {
      position: "relative"
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
  ({ theme, fill, color, onClick }: IProps) => {
    const backgroundColor = color ? hexOrColor(color)(theme.colors.palette.info) : theme.colors.palette.info
    return {
      padding: `${theme.spacing / 4}px ${theme.spacing / 2}px`,
      backgroundColor: theme.colors.palette.grey10,
      "> div": {
        color: readableTextColor(backgroundColor)([theme.colors.palette.white, theme.colors.palette.black])
      },
      ":before": {
        backgroundColor,
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
        <div>{label}</div>
      </Bar>
    </div>
  </Container>
)
