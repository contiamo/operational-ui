import * as React from "react"
import glamorous, { withTheme } from "glamorous"
import { darken, hexOrColor } from "contiamo-ui-utils"
import Tab, { TabProps } from "./Tab/Tab"

type Props = {
  active?: number
  activeColor?: string
  children: JSX.Element[]
  onChange?: (index: number) => void
  theme: Theme
}

const Container = glamorous.div({
  /* Add any styles to the container */
})

const Content = glamorous.div({
  marginTop: 18
})

const TabList = glamorous.ul(
  {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    position: "relative",
    border: "none",
    "&:after": {
      position: "absolute",
      display: "block",
      content: " ",
      width: "100%",
      height: 1,
      left: 0,
      bottom: 0,
      background: "red",
      zIndex: 1
    },
    "> *:not(:last-child)": {
      marginRight: 20
    }
  },
  ({ theme }: { theme: Theme }) => ({
    "&:after": {
      background: darken(theme.colors.palette.grey20)(6)
    }
  })
)

const TabPanel = glamorous.div({
  /* Add any styles to the TabPanel */
})

const overflowEllipsis = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  wordWrap: "normal"
}

const TabTitle = glamorous.li(
  {
    cursor: "pointer",
    flex: "0 0 auto",
    listStyle: "none",
    maxWidth: "100%",
    position: "relative",
    transition: "all 250ms ease",
    padding: "5px 15px",
    zIndex: 10
  },
  ({
    theme,
    color,
    isActive,
    disabled
  }: {
    theme: Theme
    color: string
    isActive: boolean
    disabled: boolean
  }): {} => ({
    ...theme.typography.body,
    ...overflowEllipsis,
    fontSize: theme.typography.body.fontSize * 1.1,
    borderBottom: `2px solid transparent`,
    ...isActive
      ? {
          color,
          borderColor: color
        }
      : {},
    ...disabled
      ? {
          color: theme.colors.palette.grey60,
          cursor: "not-allowed"
        }
      : {},
    ...!disabled
      ? {
          "&:hover": {
            color
          }
        }
      : {}
  })
)

class Tabs extends React.Component<Props, {}> {
  static defaultProps = {
    active: 0,
    activeColor: "info",
    onChange: () => {}
  }

  // Will fix this, but need to understand TS better
  data: any[]

  componentWillMount() {
    const { activeColor, children } = this.props
    this.data = React.Children.map(children, (child: React.ReactElement<TabProps>, index: number) => ({
      ...child.props,
      activeColor,
      index
    }))
  }

  renderTabs() {
    const { active, activeColor, onChange, theme } = this.props
    const color = hexOrColor(activeColor)(theme.colors.palette[activeColor] || theme.colors.palette.info)

    return this.data.map(({ disabled, index, title }) => (
      <TabTitle
        color={color}
        disabled={disabled}
        isActive={active === index && !disabled}
        key={index}
        onClick={() => {
          if (!disabled) onChange(index)
        }}
      >
        {title}
      </TabTitle>
    ))
  }

  renderPanel() {
    const { children, disabled } = this.data.find(({ index }) => index === this.props.active)
    return disabled ? null : <TabPanel>{children}</TabPanel>
  }

  render() {
    return (
      <Container>
        <TabList>{this.renderTabs()}</TabList>
        <Content>{this.renderPanel()}</Content>
      </Container>
    )
  }
}

export default withTheme(Tabs)

export { Tabs, Tab }
