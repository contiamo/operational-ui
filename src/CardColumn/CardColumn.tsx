import * as React from "react"

import { Tab } from "../Internals/Tabs"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface BaseCardColumnProps extends DefaultProps {
  /** Column title */
  title?: React.ReactNode
  /** Align the content to the right */
  contentRight?: boolean
  /** Force the column to be full with */
  fullWidth?: boolean
  /** Component containing buttons/links/actions assigned to the card */
  action?: React.ReactNode
}

export interface CardColumnPropsWithTabs extends BaseCardColumnProps {
  /** Tabs for the CardColumn header */
  tabs: Tab[]
  /** What's the currently active tab? */
  activeTabName?: string
  /** What happens when we change tabs? */
  onTabChange?: (newTabName: string) => void
  children?: never
}

export interface CardColumnPropsWithoutTabs extends BaseCardColumnProps {
  /** Do we have tabs? */
  tabs?: never
  activeTabName?: never
  onTabChange?: never
  children?: React.ReactNode
}

export type CardColumnProps = CardColumnPropsWithTabs | CardColumnPropsWithoutTabs

const Container = styled.div<Pick<CardColumnProps, "contentRight" | "fullWidth">>(({ contentRight, fullWidth }) => ({
  label: "card-column",
  height: "min-content",
  minWidth: 280 / 2,
  ...(fullWidth ? { flex: "1 1 100%", maxWidth: "100%" } : {}),
  img: {
    maxWidth: "100%",
  },
  textAlign: contentRight ? "right" : "left",
}))

const Action = styled("div")`
  margin-left: auto;
`

const Title = styled("div")(({ theme }) => ({
  fontFamily: theme.font.family.main,
  fontWeight: theme.font.weight.medium,
  color: theme.color.text.dark,
  fontSize: theme.font.size.body,
  borderBottom: `1px solid ${theme.color.separators.default}`,
  paddingBottom: theme.space.small,
  marginBottom: theme.space.content,
  display: "flex",
  alignItems: "center",
}))

const Tabs = styled("div")`
  display: flex;
  align-items: center;
  margin-left: ${({ theme }) => theme.space.medium}px;
`

const Tab = styled("div")<{ active: boolean }>`
  padding: 0 ${({ theme }) => theme.space.content}px;
  color: ${({ theme }) => theme.color.text.lighter};
  font-size: ${({ theme }) => theme.font.size.small}px;
  padding-bottom: ${({ theme }) => theme.space.base}px;
  border-bottom: 2px solid ${({ theme, active }) => (active ? theme.color.text.lighter : "transparent")};
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => -(theme.space.medium + 1)}px;
  cursor: pointer;
`

const CardColumn = ({ title, action, tabs, activeTabName, onTabChange, children, ...props }: CardColumnProps) => {
  if (tabs) {
    return (
      <Container {...props}>
        {title && (
          <Title>
            {title}
            <Tabs>
              {tabs.map(({ name }, index) => (
                <Tab
                  key={index}
                  onClick={() => {
                    if (onTabChange) {
                      onTabChange(name)
                    }
                  }}
                  active={activeTabName === name}
                >
                  {name}
                </Tab>
              ))}
            </Tabs>
            {action && <Action>{action}</Action>}
          </Title>
        )}
        {(tabs.find(({ name }) => name === activeTabName) || { ...tabs[0] }).children}
      </Container>
    )
  }

  return (
    <Container {...props}>
      {title && (
        <Title>
          {title}
          {action && <Action>{action}</Action>}
        </Title>
      )}
      {children}
    </Container>
  )
}

export default CardColumn
