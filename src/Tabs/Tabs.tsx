import * as React from "react"
import { DefaultProps } from "../types"
import { useUniqueId } from "../useUniqueId"
import { NoIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon } from "../Icon/Icon"
import { ScrollButton } from "./ScrollButton"
import {
  Container,
  ScrollButtons,
  TabContainer,
  TabHeader as DefaultTabHeader,
  TabIcon,
  TabList,
  TabPanel as DefaultTabPanel,
  TabScroll,
  TitleIconWrapper,
  TitleWrapper,
} from "./Tabs.styled"

export interface Tab {
  title: string
  icon?: React.ReactNode
}

export interface TabsProps extends DefaultProps {
  tabs: Tab[]
  active: number
  onActivate: (tabIndex: number) => void
  scroll?: boolean
  onClose?: (tabIndex: number) => void
  onInsert?: (tabIndex: number) => void
  label?: string
  style?: React.CSSProperties
  id?: string
  // TODO: add type safety here
  TabHeader?: React.FC<any>
  TabPanel?: React.FC<any>
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  scroll,
  active,
  onClose,
  onActivate,
  onInsert,
  label,
  style,
  id,
  children,
  TabHeader = DefaultTabHeader,
  TabPanel = DefaultTabPanel,
}) => {
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
      switch (event.key) {
        case "ArrowRight":
          userAction.current = true
          event.preventDefault()
          if (active + 1 >= tabs.length) {
            onActivate(0)
          } else {
            onActivate(active + 1)
          }
          break
        case "ArrowLeft":
          userAction.current = true
          event.preventDefault()
          if (active - 1 < 0) {
            onActivate(tabs.length - 1)
          } else {
            onActivate(active - 1)
          }
          break
        case "Home":
          userAction.current = true
          event.preventDefault()
          onActivate(0)
          break
        case "End":
          userAction.current = true
          event.preventDefault()
          onActivate(tabs.length - 1)
          break
        case "Delete":
          userAction.current = true
          event.preventDefault()
          if (onClose) {
            onClose(active)
          }
          break
        case "Enter":
          userAction.current = true
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
      <TabList scroll={Boolean(scroll)} aria-label={label} onKeyDown={onKeyDown} ref={tabListRef}>
        <TabScroll ref={tabScrollRef}>
          {tabs.map(({ title, icon, ...rest }, i) => {
            const onClick = () => {
              onActivate(i)
            }
            return (
              <TabHeader
                {...rest}
                center={!scroll}
                tabIndex={i === active ? 0 : -1}
                first={i === 0}
                aria-selected={i === active}
                aria-controls={`TabPanel-${uid}-${i}`}
                id={`TabHeader-${uid}-${i}`}
                key={i}
                onClick={onClick}
                ref={i === active ? activeTab : undefined}
              >
                <TitleIconWrapper>
                  {icon && <TabIcon>{icon}</TabIcon>}
                  <TitleWrapper title={title}>{title}</TitleWrapper>
                </TitleIconWrapper>
                {onClose && (
                  <NoIcon
                    right
                    size={9}
                    onClick={e => {
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
                userAction.current = true
                e.preventDefault()
                onInsert(tabs.length - 1)
              }}
            >
              <PlusIcon size={12} color="primary" />
            </TabHeader>
          )}
        </TabScroll>
      </TabList>
      {scroll && (
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
      )}
      <TabContainer>
        {tabs.map(({ title, icon, ...rest }, i) => (
          <TabPanel
            {...rest}
            hidden={i !== active}
            id={`TabPanel-${uid}-${i}`}
            aria-labelledby={`TabHeader-${uid}-${i}`}
            key={i}
          >
            {i === active && children}
          </TabPanel>
        ))}
      </TabContainer>
    </Container>
  )
}

export default Tabs
