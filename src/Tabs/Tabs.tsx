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

const TabHeader = styled(SectionHeader)<{ first: boolean; "aria-selected": boolean }>`
  cursor: pointer;
  background-color: #d8d8d8;
  border: solid 1px ${({ theme }) => theme.color.separators.default};
  ${({ first }) => (first ? "" : "border-left: none;")}
  ${props =>
    props["aria-selected"] ? "border-bottom: 1px solid #f2f4f6; background-color: #f2f4f6;" : ""}

  max-width: 180px;
  flex-grow: 1;
  :focus {
    /* TODO: style focus state */
  }

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

TabHeader.defaultProps = {
  role: "tab",
  // @ts-ignore styled components TS definitions doesn't like `as` prop, but it works just fine
  as: "button",
}

const TabContainer = styled("div")`
  border: solid 1px ${({ theme }) => theme.color.separators.default};
  margin-top: -1px;
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
  if (!Number.isInteger(active) || active < 0 || active >= tabs.length) {
    active = active > 0 ? tabs.length - 1 : 0
    console.warn("active tab is out of bound, fall-back to closest value")
  }

  // track if action was triggered by user or not
  // we need this to activate focus in case action was triggered by user, but not if it was re-render
  const userAction = React.useRef(false)
  const activeTab = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (activeTab.current && userAction.current) {
      activeTab.current.focus()
      userAction.current = false
    }
  }, [active, tabs])

  return (
    <Container data-cy="operational-ui__Tabs">
      <TabList
        aria-label={label}
        onKeyDown={e => {
          userAction.current = true
          switch (e.key) {
            case "ArrowRight":
              e.preventDefault()
              if (active + 1 >= tabs.length) {
                onActivate(0)
              } else {
                onActivate(active + 1)
              }
              break
            case "ArrowLeft":
              e.preventDefault()
              if (active - 1 < 0) {
                onActivate(tabs.length - 1)
              } else {
                onActivate(active - 1)
              }
              break
            case "Home":
              e.preventDefault()
              onActivate(0)
              break
            case "End":
              e.preventDefault()
              onActivate(tabs.length - 1)
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
            aria-selected={i === active}
            aria-controls={`TabPanel${key}`}
            id={`TabHeader${key}`}
            key={key}
            onFocus={() => {
              userAction.current = true
              onActivate(i)
            }}
            ref={i === active ? activeTab : undefined}
          >
            {icon && <Icon size={14} name={icon} />}
            {title}
            <Icon
              size={14}
              name="No"
              onMouseDown={e => {
                e.stopPropagation()
                onClose(i)
              }}
            />
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
