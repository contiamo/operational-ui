import * as React from "react"
import { Title } from ".."
import PageArea from "../PageArea/PageArea"
import PageContent, { PageContentProps } from "../PageContent/PageContent"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export type Tabs = Array<{ name: string; children: React.ReactNode; hidden?: boolean }>

export interface BaseProps extends DefaultProps {
  /** Content of the page */
  children?: PageContentProps["children"]
  /** Page title */
  title?: string
  /** Page actions, typically `condensed button` component inside a fragment */
  actions?: React.ReactNode
}

export interface PropsWithSimplePage extends BaseProps {
  /** Areas template for `PageArea` disposition */
  areas?: "main"
  /** Fill the entire width */
  fill?: boolean
  tabs?: never
  activeTabName?: never
  onTabChange?: never
}

export interface PropsWithComplexPage extends BaseProps {
  /** Areas template for `PageArea` disposition */
  areas: "main side" | "side main"
  /** Fill the entire width */
  fill?: boolean
  tabs?: never
  activeTabName?: never
  onTabChange?: never
}

export interface PropsWithTabs extends BaseProps {
  /**
   * List of tabs
   * This will disable any children to render `tabs[i].component` instead
   */
  tabs: Tabs
  /**
   * Active tab name
   *
   * If not specified, active tab is controlled by internal state.
   */
  activeTabName?: string
  /**
   * Send the active name tab on each tab change (in lowercase).
   */
  onTabChange?: (name: string) => void
  children?: never
  areas?: never
  fill?: never
}

export type PageProps = PropsWithSimplePage | PropsWithComplexPage | PropsWithTabs

const Container = styled("div")(({ theme }) => ({
  height: "100%",
  position: "relative",
  backgroundColor: theme.color.background.lighter,
}))

const TitleBar = styled("div")(({ theme }) => ({
  backgroundColor: theme.color.primary,
  display: "flex",
  alignItems: "center",
  padding: theme.space.element,
  height: theme.titleHeight,
  fontWeight: theme.font.weight.medium,
}))

const tabsBarHeight = 43

const TabsBar = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-end",
  height: tabsBarHeight,
  backgroundColor: theme.color.primary,
}))

const Tab = styled("div")<{ active?: boolean }>(({ theme, active }) => ({
  color: theme.color.white,
  opacity: active ? 1 : 0.8,
  textTransform: "uppercase",
  fontFamily: theme.font.family.main,
  fontSize: theme.font.size.small,
  fontWeight: theme.font.weight.medium,
  padding: `${theme.space.element / 2}px ${theme.space.element}px`,
  borderBottom: active ? `2px solid ${theme.color.white}` : `2px solid transparent`,
  ":hover": {
    cursor: "pointer",
    opacity: 1,
  },
}))

const ViewContainer = styled("div")<{ isInTab?: boolean }>(({ theme, isInTab }) => ({
  height: `calc(100% - ${isInTab ? theme.titleHeight + tabsBarHeight : theme.titleHeight}px)`,
  overflow: "hidden",
  position: "relative",
}))

const ActionsContainer = styled("div")(({ theme }) => ({
  marginLeft: theme.space.element,
}))

const initialState = {
  activeTab: 0,
}

class Page extends React.Component<PageProps, Readonly<typeof initialState>> {
  public static defaultProps = {
    areas: "main",
    fill: false,
  }

  public readonly state = initialState

  private onTabClick(index: number, tabs: Tabs) {
    this.setState({ activeTab: index })
    if (this.props.onTabChange) {
      this.props.onTabChange(tabs[index].name.toLowerCase())
    }
  }

  private getActiveTab(tabs: Tabs): number {
    let activeTab: number
    if (this.props.activeTabName) {
      const index = tabs.findIndex(({ name }) => name.toLowerCase() === this.props.activeTabName!.toLowerCase())
      activeTab = index === -1 ? 0 : index
    } else {
      activeTab = this.state.activeTab
    }

    return activeTab
  }

  private renderPageWithTabs() {
    const tabs = this.props.tabs!
    const activeTab = this.getActiveTab(tabs)
    const currentTabChildren = tabs[activeTab].children

    return (
      <>
        <TabsBar>
          {tabs.filter(({ hidden }) => !hidden).map(({ name }, i) => (
            <Tab key={i} active={i === activeTab} onClick={() => this.onTabClick(i, tabs)}>
              {name}
            </Tab>
          ))}
        </TabsBar>
        <ViewContainer isInTab>{currentTabChildren}</ViewContainer>
      </>
    )
  }

  private renderPageWithoutTabs() {
    const { areas, fill, children } = this.props

    return (
      <ViewContainer>
        <PageContent areas={areas} fill={fill}>
          {modalConfirmContext => {
            const resolvedChildren = typeof children === "function" ? children(modalConfirmContext) : children
            return areas === "main" ? <PageArea>{resolvedChildren}</PageArea> : resolvedChildren
          }}
        </PageContent>
      </ViewContainer>
    )
  }

  public render() {
    const { title, actions, tabs } = this.props

    return (
      <Container>
        {title && (
          <TitleBar>
            <Title color="white">{title}</Title>
            <ActionsContainer>{actions}</ActionsContainer>
          </TitleBar>
        )}
        {tabs ? this.renderPageWithTabs() : this.renderPageWithoutTabs()}
      </Container>
    )
  }
}

export default Page
