import * as React from "react"
import * as ReactFeather from "react-feather"
import glamorous, { GlamorousComponent, withTheme } from "glamorous"
import { hexOrColor } from "@operational/utils"
import { Theme, ThemeColorName } from "@operational/theme"

export type CustomColor = ThemeColorName | string

export interface IProps {
  id?: string | number
  css?: {}
  className?: string
  children?: React.ReactNode
  color?: CustomColor
  icon?: string
}

export interface IPropsWithTheme extends IProps {
  theme: Theme
}

const Line = glamorous.div(
  {
    position: "absolute",
    left: 5,
    top: 6,
    height: "100%"
  },
  ({ theme }: { theme: Theme }) => ({
    borderLeft: `1px solid ${theme.colors.gray30}`
  })
)

const StatusContainer = glamorous.div(
  {
    border: "2px solid transparent",
    borderRadius: "50%",
    height: 11,
    position: "absolute",
    top: 6,
    width: 11
  },
  ({ theme, color }: { theme: Theme; color: CustomColor }) => ({
    backgroundColor: `${color}`
  })
)

const Content = glamorous.div(
  {
    padding: "0 0 5px 26px",
    position: "relative",
    top: 0,
    "& > *": {
      margin: 0
    },
    "& p": {
      marginBottom: 0
    }
  },
  ({ theme }: { theme: Theme }): {} => ({
    ...theme.typography.body
  })
)

const Container = glamorous.li({
  label: "timelineitem",
  listStyle: "none",
  margin: 0,
  padding: "0 0 24px",
  position: "relative",
  "&:last-child > :first-child": {
    display: "none"
  }
})

const TimelineItem: React.SFC<IPropsWithTheme> = ({
  css,
  id,
  className,
  children,
  color = "info",
  icon = "",
  theme
}: IPropsWithTheme) => {
  const statusColor = hexOrColor(color)(theme.colors[color] || theme.colors.info)

  return (
    <Container key={id} css={css} className={className}>
      <Line />
      <StatusContainer color={statusColor} />
      <Content>{children}</Content>
    </Container>
  )
}

const WrappedTimelineItem: React.SFC<IProps> = withTheme(TimelineItem)

export default WrappedTimelineItem
