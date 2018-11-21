import * as React from "react"

import Tabs, { Tab, tabsBarHeight } from "../Internals/Tabs"
import PageArea from "../PageArea/PageArea"
import PageContent, { PageContentProps } from "../PageContent/PageContent"
import Progress from "../Progress/Progress"
import { DefaultProps } from "../types"
import { Title } from "../Typography/Title"
import { readableTextColor } from "../utils"
import { expandColor, OperationalStyleConstants } from "../utils/constants"
import styled from "../utils/styled"

export interface BaseProps extends DefaultProps {
  /** Content of the page */
  children?: PageContentProps["children"]
  /** Page title */
  title?: string
  /** Page actions, typically `condensed button` component inside a fragment */
  actions?: React.ReactNode
  /** Actions position */
  actionsPosition?: "start" | "main" | "end"
  /** A custom color for the page header color? */
  color?: keyof OperationalStyleConstants["color"] | string
  /** Toggles a top progress bar to indicate loading state */
  loading?: boolean
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
  tabs: Tab[]
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

const TitleBar = styled("div")<{ color: PageProps["color"] }>`
  background-color: ${({ theme, color }) => expandColor(theme, color) || theme.color.primary};
  color: ${({ theme, color }) =>
    readableTextColor(expandColor(theme, color) || theme.color.primary, ["black", "white"])};
`

const TitleContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.space.element,
  height: theme.titleHeight,
  fontWeight: theme.font.weight.medium,
}))

const ViewContainer = styled("div")<{ isInTab?: boolean; isTitleCondensed?: boolean; hasTitle?: boolean }>(
  ({ theme, isInTab, isTitleCondensed, hasTitle }) => {
    const calculatedTitleOffset = isInTab && !isTitleCondensed ? theme.titleHeight + tabsBarHeight : theme.titleHeight
    return {
      height: hasTitle ? `calc(100% - ${calculatedTitleOffset}px)` : "100%",
      overflow: "hidden",
      position: "relative",
    }
  },
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

const FixedProgress = styled(Progress)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
`

const initialState = {}

class Page extends React.Component<PageProps, Readonly<typeof initialState>> {
  public static defaultProps: Partial<PageProps> = {
    areas: "main",
    fill: false,
    actionsPosition: "main",
  }

  public readonly state = initialState

  private renderPageWithTabs() {
    const tabs = this.props.tabs!
    const { title, actions, actionsPosition, condensedTitle, color } = this.props

    return (
      <Tabs
        tabs={tabs}
        activeTabName={this.props.activeTabName}
        onTabChange={this.props.onTabChange}
        condensed={condensedTitle}
      >
        {({ tabsBar, activeChildren }) => (
          <>
            {title && (
              <TitleBar color={color}>
                <TitleContainer>
                  <Title>{title}</Title>
                  {condensedTitle && tabsBar}
                  <ActionsContainer actionPosition={actionsPosition}>{actions}</ActionsContainer>
                </TitleContainer>
                {!condensedTitle && tabsBar}
              </TitleBar>
            )}
            <ViewContainer isInTab isTitleCondensed={condensedTitle} hasTitle={Boolean(title)}>
              {activeChildren}
            </ViewContainer>
          </>
        )}
      </Tabs>
    )
  }

  private renderPageWithoutTabs() {
    const { title, actions, actionsPosition, areas, color, children, fill } = this.props

    return (
      <>
        {title && (
          <TitleBar color={color}>
            <TitleContainer>
              <Title>{title}</Title>
              <ActionsContainer actionPosition={actionsPosition}>{actions}</ActionsContainer>
            </TitleContainer>
          </TitleBar>
        )}
        <ViewContainer hasTitle={Boolean(title)}>
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
    const { tabs, fill, onTabChange, loading, title, ...props } = this.props

    return (
      <Container {...props}>
        {loading && <FixedProgress />}
        {tabs ? this.renderPageWithTabs() : this.renderPageWithoutTabs()}
      </Container>
    )
  }
}

export default Page
