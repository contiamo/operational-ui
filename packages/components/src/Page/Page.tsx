import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme } from "@operational/theme"
import { Title } from ".."
import PageArea from "../PageArea/PageArea"

export interface Props {
  /** Page title */
  title?: string
  /** Page actions, typically `condensed button` component inside a fragment */
  actions?: React.ReactNode
  /** Content of the page */
  children?: React.ReactNode
  /** Areas template for `PageArea` disposition */
  areas?: "main" | "main side" | "side main"
  /** Fill the entire width */
  fill?: boolean
  /**
   * List of tabs
   * This will disable any children to render `tabs[i].component` instead
   */
  tabs?: { name: string; component: React.ComponentType }[]
  /**
   * Active tab name
   *
   * Useful for easy router mapping
   */
  activeTabName?: string
  /**
   * Send the active name tab on each tab change (in lowercase).
   */
  onTabChange?: (name: string) => void
}

const Container = styled("div")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  height: "100%",
  backgroundColor: theme.color.background.lighter,
}))

const titleBarHeight = 45

const TitleBar = styled("div")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  backgroundColor: theme.color.primary,
  display: "flex",
  alignItems: "center",
  padding: `${theme.space.base}px 0`,
  height: titleBarHeight,
}))

const TabsBar = styled("div")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  backgroundColor: theme.color.primary,
  display: "flex",
}))

const Tab = styled("div")(({ theme, active }: { theme?: OperationalStyleConstants; active?: boolean }) => ({
  color: theme.color.white,
  opacity: active ? 1 : 0.8,
  textTransform: "uppercase",
  fontFamily: theme.font.family.main,
  fontSize: theme.font.size.small,
  padding: `${theme.space.element / 2}px ${theme.space.element}px`,
  borderBottom: active ? `2px solid ${theme.color.white}` : `2px solid transparent`,
  ":hover": {
    cursor: "pointer",
    opacity: 1,
  },
}))

const ViewContainer = styled("div")`
  height: calc(100% - ${titleBarHeight}px);
  overflow: auto;
`

const Grid = styled("div")(
  (props: {
    children?: React.ReactNode
    fill?: boolean
    theme?: OperationalStyleConstants
    areas?: Props["areas"]
  }) => {
    const grid = React.Children.count(props.children) > 1 ? "main side" : "main"

    return {
      display: "grid",
      gridTemplateColumns: grid.split(" ").length > 1 ? "auto 280px" : "auto",
      gridTemplateAreas: props.areas ? `"${props.areas}"` : `"${grid}"`,
      gridGap: props.theme.space.content,
      maxWidth: props.fill ? "none" : 1150,
      minWidth: 800,
      width: "100%",
      height: `calc(100% - ${titleBarHeight}px)`,
      padding: props.theme.space.element,
    }
  },
)

const initialState = {
  activeTab: 0,
}

class Page extends React.Component<Props, Readonly<typeof initialState>> {
  constructor(props: Props) {
    super(props)
    if (props.activeTabName && props.tabs) {
      const index = props.tabs.findIndex(({ name }) => name.toLowerCase() === props.activeTabName.toLowerCase())
      this.state = {
        ...initialState,
        activeTab: index === -1 ? 0 : index,
      }
    } else {
      this.state = initialState
    }
  }

  onTabClick(index: number) {
    this.setState({ activeTab: index })
    this.props.onTabChange && this.props.onTabChange(this.props.tabs[index].name.toLowerCase())
  }

  render() {
    const { children, title, actions, tabs, fill, areas } = this.props
    const { activeTab } = this.state
    const hasOnlyOneChild = React.Children.count(children) === 1
    const CurrentTab = tabs && tabs[activeTab].component

    return (
      <Container>
        {title && (
          <TitleBar>
            <Title color="white">{title}</Title>
            {actions}
          </TitleBar>
        )}
        {tabs ? (
          <>
            <TabsBar>
              {tabs.map(({ name }, i) => (
                <Tab key={i} active={i === activeTab} onClick={() => this.onTabClick(i)}>
                  {name}
                </Tab>
              ))}
            </TabsBar>
            <CurrentTab />
          </>
        ) : (
          <ViewContainer>
            <Grid areas={areas} fill={fill}>
              {hasOnlyOneChild ? <PageArea>{children}</PageArea> : children}
            </Grid>
          </ViewContainer>
        )}
      </Container>
    )
  }
}

export default Page
