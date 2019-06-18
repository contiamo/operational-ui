import * as React from "react"
import { SectionHeader } from "../Internals/SectionHeader"
import { DefaultProps } from "../types"
import styled from "../utils/styled"
import { useUniqueId } from "../useUniqueId"
import { NoIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon } from "../Icon/Icon"
import { ScrollButton } from "./ScrollButton"

const buttonWidth = 55

export interface Tab {
  title: string
  icon?: React.ReactNode
}

export interface TabsProps extends DefaultProps {
  tabs: Tab[]
  active: number
  onActivate: (tabIndex: number) => void
  onClose?: (tabIndex: number) => void
  onInsert?: (tabIndex: number) => void
  label?: string
  style?: React.CSSProperties
  id?: string
}

const Container = styled.div`
  label: Tabs;
  display: grid;
  grid-template-rows: ${({ theme }) => `${theme.space.element * 2}px 1fr`};
  position: relative;
`

const TabList = styled.div`
  display: flex;
  height: ${({ theme }) => theme.space.element * 2}px;
  overflow-x: auto;
  max-width: calc(100% - ${buttonWidth * 2}px);
  scroll-behavior: smooth;
  border-left: solid 1px ${({ theme }) => theme.color.separators.default};
  overflow-y: hidden;
  /* magic number to hide scroll bar underneath tabpanel */
  height: ${({ theme }) => theme.space.element * 2 + 20}px;
  -webkit-overflow-scrolling: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  z-index: 1;
`

TabList.defaultProps = {
  role: "tablist",
}

const TabScroll = styled.div`
  display: flex;
`

const TabHeader = styled(SectionHeader, {
  shouldForwardProp: prop => !(prop === "first" || prop === "aria-selected" || prop === "condensed" || prop === "as" ),
})<{
  first: boolean
  "aria-selected": boolean
  condensed?: boolean
  as?: React.FC<any> | string
}>`
  cursor: pointer;
  font-weight: normal;
  background-color: ${({ theme }) => theme.color.background.light};
  border: solid 1px ${({ theme }) => theme.color.separators.default};
  border-left: none;
  ${props =>
    props["aria-selected"]
      ? `border-bottom: 1px solid ${props.theme.color.background.lighter}; 
         background-color: ${props.theme.color.background.lighter};
         color: ${props.theme.color.primary};
         font-weight: bold;`
      : ""}

  ${({ condensed }) =>
    condensed ? `max-width: ${buttonWidth}px; min-width: ${buttonWidth}px;` : "max-width: 180px;"}
  flex-grow: 1;
  & svg {
    ${({ condensed }) => (condensed ? "pointer-events: none;" : "")}
    cursor: pointer;
  }
  :focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.insetFocus};
  }
  ::-moz-focus-inner {
    border: none;
  }
  :disabled {
    color: ${({ theme }) => theme.color.disabled};
    cursor: not-allowed;
  }
  margin: 0;
`

TabHeader.defaultProps = {
  role: "tab",
  as: "button",
}

const TabContainer = styled.div`
  border: solid 1px ${({ theme }) => theme.color.separators.default};
  margin-top: -1px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.background.lighter};
`

const TabPanel = styled.div`
  z-index: 2;
  :focus {
    outline: none;
    ${({ theme }) => `box-shadow: ${theme.shadows.insetFocus};`}
  }
  ::-moz-focus-inner {
    border: none;
  }
  height: 100%;
  overflow: auto;
`

TabPanel.defaultProps = {
  role: "tabpanel",
  tabIndex: 0,
}

// We need this one so that icon and title both would be aligned to the left
const TitleIconWrapper = styled.div`
  display: flex;
  max-width: 120px;
`

// we need this one to show ellipsis if title is to long
const TitleWrapper = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: ${({ theme }) => theme.space.small}px;
`

const TabIcon = styled.span`
  margin-right: ${({ theme }) => theme.space.small}px;
`

const ScrollButtons = styled.div`
  position: absolute;
  right: 1px;
  width: ${buttonWidth * 2}px;
  display: flex;
  border-left: solid 1px ${({ theme }) => theme.color.separators.default};
  border-right: solid 1px ${({ theme }) => theme.color.separators.default};
  z-index: 1;
`

const Tabs: React.FC<TabsProps> = ({ tabs, active, onClose, onActivate, onInsert, label, style, id, children }) => {
  if (!Number.isInteger(active) || active < 0 || active >= tabs.length) {
    active = active > 0 ? tabs.length - 1 : 0
    if (process.env.NODE_ENV !== "production")
      console.warn("Active tab is out of bounds, falling back to closest value.")
  }
  const uid = useUniqueId(id)

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

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      userAction.current = true
      switch (event.key) {
        case "ArrowRight":
          event.preventDefault()
          if (active + 1 >= tabs.length) {
            onActivate(0)
          } else {
            onActivate(active + 1)
          }
          break
        case "ArrowLeft":
          event.preventDefault()
          if (active - 1 < 0) {
            onActivate(tabs.length - 1)
          } else {
            onActivate(active - 1)
          }
          break
        case "Home":
          event.preventDefault()
          onActivate(0)
          break
        case "End":
          event.preventDefault()
          onActivate(tabs.length - 1)
          break
        case "Delete":
          event.preventDefault()
          if (onClose) {
            onClose(active)
          }
          break
        case "Enter":
          // There is no insert on some modern keyboards.
          // You can use `fn` + `enter` to get it on Mac keyboard, it will be reported as Enter.
          // Can be differentiated from enter using this check `e.nativeEvent.code === "NumpadEnter"`
          // WAI ARIA specification doesn't provide recommendations for this case,
          // so let's use Enter `¯\_(ツ)_/¯`
          event.preventDefault()
          if (onInsert) {
            onInsert(active)
          }
          break
      }
    },
    [active, onActivate, onInsert],
  )

  const tabListRef = React.useRef<HTMLDivElement>(null)
  const tabScrollRef = React.useRef<HTMLDivElement>(null)

  const scrollLeft = React.useCallback(event => {
    event && event.preventDefault() // so the button won't get focus when clicked
    if (tabListRef.current) {
      tabListRef.current.scrollLeft = tabListRef.current.scrollLeft - 100
    }
  }, [])

  const scrollRight = React.useCallback(event => {
    event && event.preventDefault() // so the button won't get focus when clicked
    if (tabListRef.current) {
      tabListRef.current.scrollLeft = tabListRef.current.scrollLeft + 100
    }
  }, [])

  return (
    <Container data-cy="operational-ui__Tabs" style={style}>
      <TabList aria-label={label} onKeyDown={onKeyDown} ref={tabListRef}>
        <TabScroll ref={tabScrollRef}>
          {tabs.map(({ title, icon }, i) => {
            const onClick = () => {
              userAction.current = true
              onActivate(i)
            }
            return (
              <TabHeader
                tabIndex={i === active ? 0 : -1}
                first={i === 0}
                aria-selected={i === active}
                aria-controls={`TabPanel-${uid}-${i}`}
                id={`TabHeader-${uid}-${i}`}
                key={i}
                onClick={onClick}
                onFocus={onClick}
                ref={i === active ? activeTab : undefined}
              >
                <TitleIconWrapper>
                  {icon && <TabIcon>{icon}</TabIcon>}
                  <TitleWrapper title={title}>{title}</TitleWrapper>
                </TitleIconWrapper>
                {onClose && (
                  <NoIcon
                    size={9}
                    onMouseDown={e => {
                      e.stopPropagation()
                      onClose(i)
                    }}
                  />
                )}
              </TabHeader>
            )
          })}
          {onInsert && (
            <TabHeader
              aria-hidden={true}
              tabIndex={-1}
              first={false}
              aria-selected={false}
              condensed={true}
              onMouseDown={e => {
                e.preventDefault()
                userAction.current = true
                onInsert(tabs.length - 1)
              }}
            >
              <PlusIcon size={12} color="primary" />
            </TabHeader>
          )}
        </TabScroll>
      </TabList>
      <ScrollButtons>
        <TabHeader
          aria-hidden={true}
          as={ScrollButton}
          tabIndex={-1}
          first={true}
          aria-selected={false}
          condensed={true}
          onClick={scrollLeft}
        >
          <ChevronLeftIcon size={14} />
        </TabHeader>
        <TabHeader
          aria-hidden={true}
          as={ScrollButton}
          tabIndex={-1}
          first={false}
          aria-selected={false}
          condensed={true}
          onClick={scrollRight}
        >
          <ChevronRightIcon size={14} />
        </TabHeader>
      </ScrollButtons>
      <TabContainer>
        {tabs.map((_, i) => (
          <TabPanel hidden={i !== active} id={`TabPanel-${uid}-${i}`} aria-labelledby={`TabHeader-${uid}-${i}`} key={i}>
            {i === active && children}
          </TabPanel>
        ))}
      </TabContainer>
    </Container>
  )
}

export default Tabs
