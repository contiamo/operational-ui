import * as React from "react"
import isString from "lodash/isString"

import Tabs, { Tab } from "../Internals/Tabs"
import PageArea from "../PageArea/PageArea"
import PageContent, { PageContentProps } from "../PageContent/PageContent"
import { isChildFunction } from "../utils/isChildFunction"
import { FixedProgress } from "../Progress/Progress"
import { DefaultProps } from "../types"
import { Title } from "../Typography/Title"
import styled from "../utils/styled"

export interface BaseProps extends DefaultProps {
  /** Content of the page */
  children?: PageContentProps["children"]
  /** Page title */
  title?: React.ReactNode
  /** Page actions, typically `condensed button` component inside a fragment */
  actions?: React.ReactNode
  /** Toggles a top progress bar to indicate loading state */
  loading?: boolean
  /** Render a page without padding */
  noPadding?: boolean
  /** Fill the entire width */
  fill?: boolean
}

export interface PropsWithSimplePage extends BaseProps {
  /** Areas template for `PageArea` disposition */
  areas?: "main"
  tabs?: never
  activeTabName?: never
  onTabChange?: never
}

export interface PropsWithComplexPage extends BaseProps {
  /** Areas template for `PageArea` disposition */
  areas: "main side" | "side main"
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
}

export type PageProps = PropsWithSimplePage | PropsWithComplexPage | PropsWithTabs

const Container = styled("div")<{ hasTitle: boolean; hasTabs: boolean }>(({ theme, hasTitle, hasTabs }) => ({
  position: "relative",
  height: "100%",
  display: "grid",
  gridRowGap: theme.space.element,
  backgroundColor: theme.color.white,
  gridTemplateRows: `${hasTitle ? `min-content ` : ""}${hasTabs ? `${theme.tabsBarHeight}px ` : ""}auto`,
  padding: "50px 35px 35px",
  overflow: "auto",
}))

const TitleContainer = styled("div", { shouldForwardProp: prop => prop !== "fill" })<{ fill: boolean }>(
  ({ theme, fill }) => ({
    display: "flex",
    alignItems: "center",
    fontWeight: theme.font.weight.medium,
    minWidth: theme.pageSize.min,
    maxWidth: fill ? "100%" : `${theme.pageSize.max}px`,
  }),
)

const ViewContainer = styled("div", { shouldForwardProp: prop => prop !== "fill" })<{ fill: boolean }>`
  outline: none;
  min-width: ${({ theme }) => theme.pageSize.min}px;
  max-width: ${({ fill, theme }) => (fill ? "100%" : `${theme.pageSize.max}px`)};
  overflow-y: auto;
  overflow-x: hidden;
`

const ActionsContainer = styled("div")`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`

const TabsContainer = styled("div", { shouldForwardProp: prop => prop !== "fill" })<{ fill: boolean }>`
  min-width: ${({ theme }) => theme.pageSize.min}px;
  max-width: ${({ theme, fill }) => (fill ? "100%" : `${theme.pageSize.max}px`)};
`

const Page: React.FC<PageProps> = ({
  actions,
  activeTabName,
  areas = "main",
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
                {isString(title) ? <Title>{title}</Title> : title}
                <ActionsContainer>{actions}</ActionsContainer>
              </TitleContainer>
              <TabsContainer fill={Boolean(fill)}>{tabsBar}</TabsContainer>
            </>
          ) : (
            <TabsContainer fill={Boolean(fill)}>{tabsBar}</TabsContainer>
          )}
          <ViewContainer fill={Boolean(fill)} aria-labelledby={activeTabId} role="tabpanel" tabIndex={0}>
            {activeChildren}
          </ViewContainer>
        </>
      )}
    </Tabs>
  ) : (
    <>
      {title && (
        <TitleContainer fill={Boolean(fill)}>
          {isString(title) ? <Title>{title}</Title> : title}
          <ActionsContainer>{actions}</ActionsContainer>
        </TitleContainer>
      )}
      <ViewContainer fill={Boolean(fill)}>
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
