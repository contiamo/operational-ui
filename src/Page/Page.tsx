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
  /** Actions position */
  actionsPosition?: "start" | "main" | "end"
}

export interface PropsWithSimplePage extends BaseProps {
  /** Areas template for `PageArea` disposition */
  areas?: "main"
  /** Fill the entire width */
  fill?: boolean
  tabs?: never
  activeTabName?: never
  onTabChange?: never
  condensedTitle?: never
}

export interface PropsWithComplexPage extends BaseProps {
  /** Areas template for `PageArea` disposition */
  areas: "main side" | "side main"
  /** Fill the entire width */
  fill?: boolean
  tabs?: never
  activeTabName?: never
  onTabChange?: never
  condensedTitle?: never
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
  /** Condensed option */
  condensedTitle?: boolean
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

const TabsBar = styled("div")<{ condensed?: boolean }>(({ theme, condensed }) => ({
  display: "flex",
  alignItems: "flex-end",
  height: condensed ? theme.titleHeight : tabsBarHeight,
  backgroundColor: theme.color.primary,
  ...(condensed ? { paddingLeft: 30 } : {}),
}))

const Tab = styled("div")<{ active?: boolean; condensed?: boolean }>(({ theme, active, condensed }) => ({
  color: theme.color.white,
  opacity: active ? 1 : 0.8,
  textTransform: "uppercase",
  fontFamily: theme.font.family.main,
  fontSize: theme.font.size.small,
  fontWeight: theme.font.weight.medium,
  padding: `${(condensed ? theme.space.big : theme.space.element) / 2}px ${theme.space.element}px`,
  borderBottom: active ? `2px solid ${theme.color.white}` : `2px solid transparent`,
  ":hover": {
    cursor: "pointer",
    opacity: 1,
  },
}))

const ViewContainer = styled("div")<{ isInTab?: boolean; isTitleCondensed?: boolean }>(
  ({ theme, isInTab, isTitleCondensed }) => ({
    height: `calc(100% - ${isInTab && !isTitleCondensed ? theme.titleHeight + tabsBarHeight : theme.titleHeight}px)`,
    overflow: "hidden",
    position: "relative",
  }),
)

const ActionsContainer = styled("div")<{ actionPosition: PageProps["actionsPosition"] }>(
  ({ theme, actionPosition }) => ({
    ...(actionPosition === "start"
      ? {
          order: -1,
          // Deal with the button margin (theme.space.small)
          marginRight: theme.space.element - theme.space.small,
        }
      : {
          marginLeft: theme.space.element,
        }),
    ...(actionPosition === "end"
      ? {
          flexGrow: 1,
          display: "flex",
          justifyContent: "flex-end",
        }
      : {}),
  }),
)

const initialState = {
  activeTab: 0,
}

class Page extends React.Component<PageProps, Readonly<typeof initialState>> {
  public static defaultProps: Partial<PageProps> = {
    areas: "main",
    fill: false,
    actionsPosition: "main",
  }

  public readonly state = initialState

  private onTabClick(index: number, tabs: Tabs) {
    this.setState({ activeTab: index })
    if (this.props.onTabChange) {
      this.props.onTabChange(tabs[index].name)
    }
  }

  private getActiveTab(tabs: Tabs): number {
    let activeTab: number
    if (this.props.activeTabName) {
      const index = tabs.findIndex(({ name }) => name === this.props.activeTabName)
      activeTab = index === -1 ? 0 : index
    } else {
      activeTab = this.state.activeTab
    }

    return activeTab
  }

  private renderTabsBar() {
    const tabs = this.props.tabs!
    const activeTab = this.getActiveTab(tabs)
    const { condensedTitle, onTabChange, activeTabName } = this.props

    /**
     * @todo remove this after we merge https://github.com/contiamo/operational-ui/pull/692
     */
    if (
      process.env.NODE_ENV !== "production" &&
      activeTabName &&
      Boolean(onTabChange) &&
      Boolean(tabs) &&
      Boolean(tabs.find(tab => activeTabName.toLowerCase() === tab.name.toLowerCase())) &&
      Boolean(!tabs.find(tab => activeTabName === tab.name))
    ) {
      console.warn(
        "Operational UI Warning:\nThe Page component no longer lowercases the active tab name when passed back through its onTabChange callback.\nNames are passed exactly as they appear in the tab name field.",
      )
    }

    return (
      <TabsBar condensed={condensedTitle}>
        {tabs.filter(({ hidden }) => !hidden).map(({ name }, i) => (
          <Tab condensed={condensedTitle} key={i} active={i === activeTab} onClick={() => this.onTabClick(i, tabs)}>
            {name}
          </Tab>
        ))}
      </TabsBar>
    )
  }

  private renderPageWithTabs() {
    const tabs = this.props.tabs!
    const activeTab = this.getActiveTab(tabs)
    const currentTabChildren = tabs[activeTab].children
    const { title, actions, actionsPosition, condensedTitle } = this.props

    return (
      <>
        {title && (
          <>
            <TitleBar>
              <Title color="white">{title}</Title>
              {condensedTitle && this.renderTabsBar()}
              <ActionsContainer actionPosition={actionsPosition}>{actions}</ActionsContainer>
            </TitleBar>
            {!condensedTitle && this.renderTabsBar()}
          </>
        )}
        <ViewContainer isInTab isTitleCondensed={condensedTitle}>
          {currentTabChildren}
        </ViewContainer>
      </>
    )
  }

  private renderPageWithoutTabs() {
    const { title, actions, actionsPosition, areas, children, fill } = this.props

    return (
      <>
        {title && (
          <TitleBar>
            <Title color="white">{title}</Title>
            <ActionsContainer actionPosition={actionsPosition}>{actions}</ActionsContainer>
          </TitleBar>
        )}
        <ViewContainer>
          <PageContent areas={areas} fill={fill}>
            {modalConfirmContext => {
              const resolvedChildren = typeof children === "function" ? children(modalConfirmContext) : children
              return areas === "main" ? <PageArea>{resolvedChildren}</PageArea> : resolvedChildren
            }}
          </PageContent>
        </ViewContainer>
      </>
    )
  }

  public render() {
    const { tabs, fill, onTabChange, ...props } = this.props

    return <Container {...props}>{tabs ? this.renderPageWithTabs() : this.renderPageWithoutTabs()}</Container>
  }
}

export default Page
