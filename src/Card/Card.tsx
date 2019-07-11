import * as React from "react"
import CardItem from "../CardItem/CardItem"
import CardHeader from "../Internals/CardHeader"
import Tabs, { Tab } from "../Internals/Tabs"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface BaseProps extends DefaultProps {
  /** Component containing buttons/links/actions assigned to the card */
  action?: React.ReactNode
  /**
   * Fill all the height of the parent.
   */
  fullSize?: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export interface CardPropsWithChildrenOrData<T extends {} = {}> extends BaseProps {
  /** Any object to show. The key is the title of the data. */
  data?: T
  /**  A function to format keys of `data` */
  keyFormatter?: (key: Extract<keyof T, string>) => string
  /** A key-value object to format values of `data`. */
  valueFormatters?: { [P in Extract<keyof T, string>]?: (value: T[P]) => React.ReactNode }
  /** Sort method for keys. By default, they will be sorted alphabetically as regular JavaScript strings */
  sortKeys?: (a: keyof T, b: keyof T) => number
  /** An ordered array to pick only some keys to display  */
  keys?: Array<Extract<keyof T, string>>
  /** Title of the card */
  title?: React.ReactNode
  /** React children */
  children?: React.ReactNode
  /** Card sections */
  sections?: never
  /** Section stacking */
  stackSections?: never
}

export interface CardPropsWithSections extends BaseProps {
  /** Any object to show. The key is the title of the data. */
  data?: never
  /**  A function to format keys of `data` */
  keyFormatter?: never
  /** A key-value object to format values of `data`. */
  valueFormatters?: never
  /** An ordered array to pick only some keys to display  */
  keys?: never
  /** Title of the card */
  title?: React.ReactNode
  /** React children */
  children?: never
  /** Card sections */
  sections?: React.ReactNode
  /** Section stacking */
  stackSections?: "horizontal" | "vertical"
}

export interface CardPropsWithTabs extends BaseProps {
  /** Any object to show. The key is the title of the data. */
  data?: never
  /**  A function to format keys of `data` */
  keyFormatter?: never
  /** A key-value object to format values of `data`. */
  valueFormatters?: never
  /** An ordered array to pick only some keys to display  */
  keys?: never
  /** Card sections */
  sections?: never
  /** Section stacking */
  stackSections?: never
  /** React children */
  children?: never
  /** Title of the card */
  title?: never
  /**
   * List of tabs
   * This will disable any children to render `tabs[i].component` instead
   */
  tabs: Tab[]
  /** UI to render left of tabs */
  leftOfTabs?: React.ReactNode
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
}

// Type guard to check whether we're working with a card with tabs, detecting type correctly afterwards
const isWithTabs = <T extends {}>(props: CardProps<T>): props is CardPropsWithTabs => {
  return props.hasOwnProperty("tabs")
}

export type CardProps<T extends {} = {}> = CardPropsWithChildrenOrData<T> | CardPropsWithSections | CardPropsWithTabs

export interface State {
  activeTab: number
}

const Container = styled("div")(({ theme }) => ({
  marginBottom: theme.space.element,
  border: `1px solid ${theme.color.separators.light}`,
  backgroundColor: theme.color.white,
  wordWrap: "break-word",
  "& > img": {
    maxWidth: "100%",
  },
  /**
   * Since there is no further element to separate this card from, the bottom margin is disabled.
   * This avoids unwanted overflowing behavior especially in cases where there is a single card.
   */
  "&:last-child": {
    marginBottom: 0,
  },
}))

const Content = styled("div")<{ fullSize?: boolean }>`
  padding: ${({ theme }) => theme.space.element}px;
  height: ${props => (props.fullSize ? "100%" : "auto")};
  white-space: pre-wrap;
  word-wrap: break-all;
  hyphens: auto;
`

const TabsBarContainer = styled("div")`
  display: flex;
  align-items: center;
`

/**
 * This extra element is necessary to prevent buttons added in the `leftOfTabs` prop to extend
 * to full height.
 */
const TabsBarLeftContainer = styled("div")`
  margin-right: 32px;
`

const SectionsContainer = styled("div")<{ stackHorizontal: boolean }>`
  ${({ stackHorizontal, theme }) => `
    display: ${stackHorizontal ? "flex" : "block"};

    /* 
      Assume the first level down is a section
      since this is a SectionsContainer.
    */
    > div { border-right: ${stackHorizontal ? `1px solid ${theme.color.separators.default}` : `none`} };	
  `};
`

const objectKeys = <T extends {}>(x: T) => Object.keys(x) as Array<keyof T>

/**
 * Render card items corresponding to the specified data.
 */
function renderData<T extends {}>(props: CardPropsWithChildrenOrData<T>) {
  const { keyFormatter, valueFormatters, data, keys, sortKeys } = props
  const _keys = keys ? keys : objectKeys(data || {}).sort(sortKeys)
  const titles = keyFormatter ? _keys.map(keyFormatter) : _keys
  const values = _keys.map(i => {
    const value = data ? data[i] : undefined
    if (valueFormatters && value !== undefined) {
      const valueFormatter = valueFormatters[i]
      return valueFormatter ? valueFormatter(value) : value
    }
    return value
  })
  return data && titles.map((cardItemTitle, i) => <CardItem key={i} value={values[i]} title={cardItemTitle} />)
}

function Card<T extends {}>(props: CardProps<T>) {
  const {
    title,
    keyFormatter,
    valueFormatters = {},
    sections,
    stackSections,
    data,
    keys,
    children,
    action,
    fullSize,
    ...rest
  } = props

  if (sections) {
    return (
      <Container {...rest}>
        {(title || action) && <CardHeader title={title} action={action} />}
        <SectionsContainer stackHorizontal={stackSections === "horizontal"}>{sections}</SectionsContainer>
      </Container>
    )
  }

  if (isWithTabs(props)) {
    const { onTabChange, ...otherProps } = props

    return (
      <Tabs tabs={props.tabs} activeTabName={props.activeTabName} onTabChange={onTabChange}>
        {({ tabsBar, activeChildren }) => (
          <Container {...otherProps}>
            <CardHeader
              title={
                <TabsBarContainer>
                  <TabsBarLeftContainer>{props.leftOfTabs}</TabsBarLeftContainer>
                  {tabsBar}
                </TabsBarContainer>
              }
              action={props.action}
            />
            <Content fullSize={fullSize}>{activeChildren}</Content>
          </Container>
        )}
      </Tabs>
    )
  }

  return (
    <Container {...rest}>
      {(title || action) && <CardHeader title={title} action={action} />}
      <Content fullSize={fullSize}>
        {renderData(props as CardPropsWithChildrenOrData<T>)}
        {children}
      </Content>
    </Container>
  )
}

export default Card
