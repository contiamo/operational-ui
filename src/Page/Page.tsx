import * as React from "react"
import { Title } from ".."
import Tabs, { Tab, tabsBarHeight } from "../Internals/Tabs"
import PageArea from "../PageArea/PageArea"
import PageContent, { PageContentProps } from "../PageContent/PageContent"
import { DefaultProps } from "../types"
import constants from "../utils/constants"
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

const TitleBar = styled("div")`
  background-color: ${({ theme }) => theme.color.primary};
`

const TitleContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.color.primary,
  display: "flex",
  alignItems: "center",
  padding: theme.space.element,
  height: theme.titleHeight,
  fontWeight: theme.font.weight.medium,
}))

/**
 * This is a component that contains the contents of
 * Page. It includes a bit of hack that prevents it
 * from being scrolled at all: the component is meant
 * to have a full-height and a hidden overflow, while
 * its _children_ scroll, not it itself.
 *
 * In order to enforce this, we use the `onScroll` hack.
 *
 * More info: https://github.com/contiamo/operational-ui/pull/731
 */
class ViewContainer extends React.Component<{ isInTab?: boolean; isTitleCondensed?: boolean }> {
  private ref = React.createRef<HTMLDivElement>()

  public render() {
    const { isInTab, isTitleCondensed } = this.props

    return (
      <div
        style={{
          height: `calc(100% - ${
            isInTab && !isTitleCondensed ? constants.titleHeight + tabsBarHeight : constants.titleHeight
          }px)`,
          overflow: "hidden",
          position: "relative",
        }}
        ref={this.ref}
        onScroll={() => {
          if (this.ref.current) {
            this.ref.current.scrollTop = 0
          }
        }}
        {...this.props}
      />
    )
  }
}

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

const initialState = {}

// tslint:disable-next-line:max-classes-per-file
class Page extends React.Component<PageProps, Readonly<typeof initialState>> {
  public static defaultProps: Partial<PageProps> = {
    areas: "main",
    fill: false,
    actionsPosition: "main",
  }

  public readonly state = initialState

  private renderPageWithTabs() {
    const tabs = this.props.tabs!
    const { title, actions, actionsPosition, condensedTitle } = this.props

    return (
      <Tabs
        tabs={tabs}
        activeTabName={this.props.activeTabName}
        onTabChange={this.props.onTabChange}
        condensed={condensedTitle}
        dark
      >
        {({ tabsBar, activeChildren }) => (
          <>
            {title && (
              <TitleBar>
                <TitleContainer>
                  <Title color="white">{title}</Title>
                  {condensedTitle && tabsBar}
                  <ActionsContainer actionPosition={actionsPosition}>{actions}</ActionsContainer>
                </TitleContainer>
                {!condensedTitle && tabsBar}
              </TitleBar>
            )}
            <ViewContainer isInTab isTitleCondensed={condensedTitle}>
              {activeChildren}
            </ViewContainer>
          </>
        )}
      </Tabs>
    )
  }

  private renderPageWithoutTabs() {
    const { title, actions, actionsPosition, areas, children, fill } = this.props

    return (
      <>
        {title && (
          <TitleBar>
            <TitleContainer>
              <Title color="white">{title}</Title>
              <ActionsContainer actionPosition={actionsPosition}>{actions}</ActionsContainer>
            </TitleContainer>
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
