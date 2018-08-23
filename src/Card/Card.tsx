import * as React from "react"
import { CardItem } from "../"
import CardHeader from "../Internals/CardHeader"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface CardPropsWithChildrenOrData<T extends {} = {}> extends DefaultProps {
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
  /** Component containing buttons/links/actions assigned to the card */
  action?: React.ReactNode
  /** React children */
  children?: React.ReactNode
  /** Card sections */
  sections?: never
  /** Section stacking */
  stackSections?: never
}

export interface CardPropsWithSections extends DefaultProps {
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
  /** Component containing buttons/links/actions assigned to the card */
  action?: React.ReactNode
  /** React children */
  children?: never
  /** Card sections */
  sections?: React.ReactNode
  /** Section stacking */
  stackSections?: "horizontal" | "vertical"
}

export type CardProps<T extends {} = {}> = CardPropsWithChildrenOrData<T> | CardPropsWithSections

const Container = styled("div")(({ theme }) => ({
  marginBottom: theme.space.element,
  borderTop: `1px solid ${theme.color.separators.light}`,
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.16)",
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

const Content = styled("div")`
  ${({ theme }) => `
    padding: ${theme.space.element}px;
  `};
`

const SectionsContainer = styled("div")<{ stackHorizontal: boolean }>`
  ${({ stackHorizontal }) => `
    display: ${stackHorizontal ? "flex" : "block"};
  `};
`

const objectKeys = <T extends {}>(x: T) => Object.keys(x) as Array<keyof T>

/**
 * Render card items corresponding to the specified data.
 */
function renderData<T extends {}>(props: CardPropsWithChildrenOrData<T>) {
  const { keyFormatter, valueFormatters = {}, data, keys, sortKeys } = props
  const _keys = keys ? keys : objectKeys(data || {}).sort(sortKeys)
  const titles = keyFormatter ? _keys.map(keyFormatter) : _keys
  const values = _keys.map(i => {
    const valueFormatter = valueFormatters[i]
    const value = data ? data[i] : undefined
    return valueFormatter ? valueFormatter(value!) : value
  })
  return data && titles.map((cardItemTitle, i) => <CardItem key={i} value={values[i]} title={cardItemTitle} />)
}

export default function Card<T extends {}>(props: CardProps<T>) {
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
    ...rest
  } = props

  return (
    <Container {...rest}>
      {(title || action) && <CardHeader title={title} action={action} />}
      {sections ? (
        <SectionsContainer stackHorizontal={stackSections === "horizontal"}>{sections}</SectionsContainer>
      ) : (
        <Content>
          {renderData(props as CardPropsWithChildrenOrData<T>)}
          {children}
        </Content>
      )}
    </Container>
  )
}
