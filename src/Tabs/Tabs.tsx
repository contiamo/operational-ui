import * as React from "react"
import Icon, { IconName } from "../Icon/Icon"
import { SectionHeader } from "../Internals/SectionHeader"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface Tab {
  title: React.ReactNode
  content: () => React.ReactNode
  key: string | number
  icon?: IconName
}

export interface TabsProps extends DefaultProps {
  tabs: Tab[]
  active: number
  onActivate: (tabIndex: number) => void
  onClose: (tabIndex: number) => void
  children?: never
  label?: string
}

const Container = styled("div")`
  label: Tabs;
`

const TabList = styled("div")`
  display: flex;
  height: ${({ theme }) => theme.space.element * 2}px;
`

TabList.defaultProps = {
  role: "tablist",
}

const TabHeader = styled(SectionHeader)<{ first: boolean; active: boolean }>`
  cursor: pointer;
  background-color: #bfcbd2;
  border: solid 1px ${({ theme }) => theme.color.separators.default};
  ${({ first }) => (first ? "" : "border-left: none;")}
  ${({ active }) => (active ? "border-bottom: none; background-color: #f2f4f6;" : "")}

  min-width: 180px;
  flex-grow: 1;
  :focus {
    /* TODO: style focus state */
  }
`

TabHeader.defaultProps = {
  role: "tab",
}

const TabContainer = styled("div")`
  border: solid 1px ${({ theme }) => theme.color.separators.default};
  border-top: none;
`

const TabPanel = styled("div")`
  padding: ${({ theme }) => theme.space.element}px;
  background-color: #f2f4f6;
`

TabPanel.defaultProps = {
  role: "tabpanel",
  tabIndex: 0,
}

const Tabs = ({ tabs, active, onClose, onActivate, label }: TabsProps) => {
  if (isNaN(active) || active < 0 || active >= tabs.length) {
    active = 0
    console.warn("Active tab is out of bound, fall-back to 0")
  }

  return (
    <Container>
      <TabList
        aria-label={label}
        onKeyDown={e => {
          switch (e.key) {
            case "ArrowRight":
              if (active + 1 >= tabs.length) {
                onActivate(0)
              } else {
                onActivate(active + 1)
              }
              break
            case "ArrowLeft":
              if (active - 1 < 0) {
                onActivate(tabs.length - 1)
              } else {
                onActivate(active - 1)
              }
              break
            case "Delete":
              onClose(active)
              break
          }
        }}
      >
        {tabs.map(({ key, title, icon }, i) => (
          <TabHeader
            tabIndex={i === active ? 0 : -1}
            first={i === 0}
            active={i === active}
            aria-selected={i === active}
            aria-controls={`TabPanel${key}`}
            id={`TabHeader${key}`}
            key={key}
            onClick={() => onActivate(i)}
            onFocus={() => onActivate(i)}
          >
            {icon && <Icon size={14} name={icon} />}
            {title}
            <Icon size={14} name="No" onClick={() => onClose(i)} />
          </TabHeader>
        ))}
      </TabList>
      <TabContainer>
        {tabs.map(({ key, content }, i) => (
          <TabPanel hidden={i !== active} id={`TabPanel${key}`} aria-labelledby={`TabHeader${key}`} key={key}>
            {i === active && content()}
          </TabPanel>
        ))}
      </TabContainer>
    </Container>
  )
}

export default Tabs
