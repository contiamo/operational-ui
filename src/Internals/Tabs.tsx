import React, { useCallback, useEffect, useState } from "react"
import Spinner from "../Spinner/Spinner"
import styled from "../utils/styled"
import { IconComponentType } from "../Icon/Icon"
import { inputFocus } from "../utils"
import { useUniqueId } from "../useUniqueId"

export interface Tab {
  name: string
  children: React.ReactNode
  hidden?: boolean
  icon?: IconComponentType
  iconColor?: string
  loading?: boolean
}

export interface Props {
  tabs: Tab[]
  activeTabName?: string
  onTabChange?: (newTabName: string) => void
  children: (childrenConfig: { tabsBar: React.ReactNode; activeChildren: React.ReactNode }) => React.ReactNode
}

export interface State {
  activeTab: number
}

const tabsBarHeight = 48

const TabsBar = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-end",
  height: tabsBarHeight,
  position: "relative",
  margin: `0 ${theme.space.element}px`,
  "&::before": {
    content: "''",
    display: "block",
    position: "absolute",
    width: "100%",
    height: 0,
    top: tabsBarHeight - 1,
    left: 0,
    borderBottom: `1px solid ${theme.color.border.select}`,
  },
}))

const SingleTab = styled("div")<{ active?: boolean }>(({ theme, active }) => ({
  width: 150,
  height: "100%",
  display: "flex",
  alignItems: "center",
  fontFamily: theme.font.family.main,
  fontSize: theme.font.size.small,
  padding: `0px ${theme.space.element}px`,
  border: `1px solid ${theme.color.border.select}`,
  zIndex: 2,
  ...(active
    ? {
        backgroundColor: theme.color.white,
        color: theme.color.text.action,
        fontWeight: theme.font.weight.bold,
        borderBottomColor: theme.color.white,
      }
    : {
        backgroundColor: theme.color.background.lighter,
        color: theme.color.text.dark,
        fontWeight: theme.font.weight.regular,
        borderBottomColor: theme.color.border.select,
      }),
  borderRightWidth: 0,
  ":last-child": {
    borderRightWidth: 1,
  },
  ":hover": {
    cursor: "pointer",
  },
  ":focus": {
    ...inputFocus({ theme, isError: false }),
    borderRightWidth: 1,
    zIndex: 3,
  },
}))

const TabName = styled("p")(() => ({
  width: "100%",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  textAlign: "center",
}))

const getTabIndexByName = (tabs: Tab[], tabName?: string): number => {
  if (tabName) {
    const index = tabs.findIndex(({ name }) => name === tabName)
    return index === -1 ? 0 : index
  }
  return 0
}

const Tabs = ({ onTabChange, tabs, activeTabName, children }: Props) => {
  const activeTabIndex = getTabIndexByName(tabs, activeTabName)
  const [activeTab, setActiveTab] = useState(activeTabIndex)
  const [isMouseDown, setMouseDown] = useState(false)
  const uid = useUniqueId()
  const tabsList = tabs.map(() => React.useRef<HTMLDivElement>(null))

  useEffect(() => {
    setActiveTab(activeTabIndex)
  }, [activeTabIndex])

  const onTabClick = useCallback(
    (index: number) => {
      setActiveTab(index)
      if (onTabChange) {
        onTabChange(tabs[index].name)
      }
    },
    [onTabChange, tabs, setActiveTab],
  )

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      let newIndex: number
      let tabEl: HTMLElement | null
      switch (event.key) {
        case "ArrowRight":
          event.preventDefault()
          newIndex = activeTab + 1 >= tabs.length ? 0 : activeTab + 1
          tabEl = tabsList[newIndex].current
          if (tabEl) {
            tabEl.focus()
          }
          onTabClick(newIndex)
          break
        case "ArrowLeft":
          event.preventDefault()
          newIndex = activeTab - 1 < 0 ? tabs.length - 1 : activeTab - 1
          tabEl = tabsList[newIndex].current
          if (tabEl) {
            tabEl.focus()
          }
          onTabClick(newIndex)
          break
        case "Home":
          event.preventDefault()
          // Activate first tab
          newIndex = 0
          tabEl = tabsList[newIndex].current
          if (tabEl) {
            tabEl.focus()
          }
          onTabClick(newIndex)
          break
        case "End":
          event.preventDefault()
          // Activate last tab
          newIndex = tabs.length - 1
          tabEl = tabsList[newIndex].current
          if (tabEl) {
            tabEl.focus()
          }
          onTabClick(newIndex)
          break
      }
    },
    [activeTab, onTabClick],
  )

  const onFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (isMouseDown) {
      e.target.blur()
    }
  }

  // Work around: wrap return in fragment- to prevent type error and not having to change childrens return type
  // https://github.com/Microsoft/TypeScript/issues/21699
  return (
    <>
      {children({
        tabsBar: (
          <TabsBar role="tablist" id={uid} onKeyDown={onKeyDown}>
            {tabs
              .filter(({ hidden }) => !hidden)
              .map((tab, index: number) => {
                const isActive: boolean = activeTab === index
                return (
                  <SingleTab
                    key={index}
                    ref={tabsList[index]}
                    role="tab"
                    active={isActive}
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => onTabClick(index)}
                    onKeyDown={onKeyDown}
                    onFocus={onFocus}
                    onMouseDown={() => setMouseDown(true)}
                    onMouseUp={() => setMouseDown(false)}
                  >
                    {tab.loading ? (
                      <Spinner left size={14} />
                    ) : (
                      tab.icon && React.createElement(tab.icon, { size: 14, color: tab.iconColor, left: true })
                    )}
                    <TabName>{tab.name}</TabName>
                  </SingleTab>
                )
              })}
          </TabsBar>
        ),
        activeChildren: tabs[activeTab].children,
      })}
    </>
  )
}

export default Tabs
