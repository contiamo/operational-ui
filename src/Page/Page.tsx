import * as React from "react"

import Tabs, { Tab } from "../Internals/Tabs"
import PageArea from "../PageArea/PageArea"
import PageContent, { PageContentProps, isChildFunction } from "../PageContent/PageContent"
import Progress from "../Progress/Progress"
import { DefaultProps } from "../types"
import { Title } from "../Typography/Title"
import styled from "../utils/styled"
import { OperationalStyleConstants } from "../utils/constants"

export interface BaseProps extends DefaultProps {
  /** Content of the page */
  children?: PageContentProps["children"]
  /** Page title */
  title?: string
  /** Page actions, typically `condensed button` component inside a fragment */
  actions?: React.ReactNode
  /** Toggles a top progress bar to indicate loading state */
  loading?: boolean
  /** Render a page without padding */
  noPadding?: boolean
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
}

export type PageProps = PropsWithSimplePage | PropsWithComplexPage | PropsWithTabs

const computeRowHeights = (theme: OperationalStyleConstants, hasTitle: boolean, hasTabs: boolean) => {
  const titleHeightString = hasTitle ? `${theme.titleHeight}px ` : ""
  const tabsHeightString = hasTabs ? `${theme.tabsBarHeight}px ` : ""
  const titleHeightWithRowGap = hasTitle ? theme.titleHeight + theme.space.element : 0
  const tabsHeightWithRowGap = hasTabs ? theme.tabsBarHeight + theme.space.element : 0
  const viewContainerHeightString = `calc(100% - ${titleHeightWithRowGap + tabsHeightWithRowGap}px)`
  return `${titleHeightString}${tabsHeightString}${viewContainerHeightString}`
}

const Container = styled("div")<{ hasTitle: boolean; hasTabs: boolean }>(({ theme, hasTitle, hasTabs }) => ({
  height: "100%",
  position: "relative",
  display: "grid",
  gridRowGap: theme.space.element,
  backgroundColor: theme.color.white,
  gridTemplateRows: computeRowHeights(theme, hasTitle, hasTabs),
}))

const TitleContainer = styled("div")<{ fill: boolean }>(({ theme, fill }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.space.element,
  height: theme.titleHeight,
  fontWeight: theme.font.weight.medium,
  minWidth: theme.pageSize.min,
  maxWidth: fill ? "100%" : `${theme.pageSize.max}px`,
}))

const ViewContainer = styled("div")`
  overflow: hidden;
  position: relative;
  outline: none;
`

const ActionsContainer = styled("div")`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`

const FixedProgress = styled(Progress)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
`

const TabsContainer = styled.div<{ fill: boolean }>`
  padding: 0 ${({ theme }) => theme.space.element}px;
  min-width: ${({ theme }) => theme.pageSize.min};
  max-width: ${({ theme, fill }) => (fill ? "100%" : `${theme.pageSize.max}px`)};
`

const Page: React.FC<PageProps> = ({
  actions,
  activeTabName,
  areas,
  children,
  fill,
  loading,
  noPadding,
  onTabChange,
  tabs,
  title,
  ...props
}) => {
  const page = tabs ? (
    <Tabs tabs={tabs} activeTabName={activeTabName} onTabChange={onTabChange}>
      {({ tabsBar, activeChildren, activeTabId }) => (
        <>
          {title ? (
            <>
              <TitleContainer fill={Boolean(fill)}>
                <Title>{title}</Title>
                <ActionsContainer>{actions}</ActionsContainer>
              </TitleContainer>
              <TabsContainer fill={Boolean(fill)}>{tabsBar}</TabsContainer>
            </>
          ) : (
            <TabsContainer fill={Boolean(fill)}>{tabsBar}</TabsContainer>
          )}
          <ViewContainer aria-labelledby={activeTabId} role="tabpanel" tabIndex={0}>
            {activeChildren}
          </ViewContainer>
        </>
      )}
    </Tabs>
  ) : (
    <>
      {title && (
        <TitleContainer fill={Boolean(fill)}>
          <Title>{title}</Title>
          <ActionsContainer>{actions}</ActionsContainer>
        </TitleContainer>
      )}
      <ViewContainer>
        <PageContent noPadding={Boolean(noPadding)} areas={areas} fill={fill}>
          {modalConfirmContext => {
            const resolvedChildren = isChildFunction(children) ? children(modalConfirmContext) : children
            return areas === "main" ? <PageArea fill={fill}>{resolvedChildren}</PageArea> : resolvedChildren
          }}
        </PageContent>
      </ViewContainer>
    </>
  )

  return (
    <Container hasTabs={Boolean(tabs)} hasTitle={Boolean(title)} {...props}>
      {loading && <FixedProgress />}
      {page}
    </Container>
  )
}

export default Page
