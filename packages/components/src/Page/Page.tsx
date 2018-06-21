import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "@operational/theme"
import { Title } from ".."
import PageArea from "../PageArea/PageArea"
import PageContent from "../PageContent/PageContent"

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

const TitleBar = styled("div")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  backgroundColor: theme.color.primary,
  display: "flex",
  alignItems: "center",
  padding: `${theme.space.base}px 0`,
  height: theme.titleHeight,
  fontWeight: 500,
}))

const tabsBarHeight = 37

const TabsBar = styled("div")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  display: "flex",
  height: tabsBarHeight,
  backgroundColor: theme.color.primary,
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

const ViewContainer = styled("div")(({ theme, isInTab }: { theme?: OperationalStyleConstants; isInTab?: boolean }) => ({
  height: `calc(100% - ${isInTab ? theme.titleHeight + tabsBarHeight : theme.titleHeight}px)`,
  overflow: "auto",
}))

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
    const { children, title, actions, tabs, areas, fill = false } = this.props
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
            <ViewContainer isInTab>
              <CurrentTab />
            </ViewContainer>
          </>
        ) : (
          <ViewContainer>
            <PageContent areas={areas} fill={fill}>
              {hasOnlyOneChild ? (
                <PageArea>
                  <div>{children}</div>
                </PageArea>
              ) : (
                children
              )}
            </PageContent>
          </ViewContainer>
        )}
      </Container>
    )
  }
}

export default Page
