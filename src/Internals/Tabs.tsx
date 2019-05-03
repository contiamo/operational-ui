import React, { useCallback, useEffect, useState } from "react"
import Icon, { IconName } from "../Icon/Icon"
import Spinner from "../Spinner/Spinner"
import styled from "../utils/styled"

export interface Tab {
  name: string
  children: React.ReactNode
  hidden?: boolean
  icon?: IconName
  iconColor?: string
  loading?: boolean
}

export interface Props {
  tabs: Tab[]
  activeTabName?: string
  onTabChange?: (newTabName: string) => void
  condensed?: boolean
  children: (childrenConfig: { tabsBar: React.ReactNode; activeChildren: React.ReactNode }) => React.ReactNode
}

export interface State {
  activeTab: number
}

export const tabsBarHeight = 40

const TabsBar = styled("div")<{ condensed?: boolean }>(({ theme, condensed }) => ({
  display: "flex",
  alignItems: "flex-end",
  height: condensed ? theme.titleHeight : tabsBarHeight,
  color: "inherit",
  ...(condensed ? { paddingLeft: theme.space.element } : {}),
}))

const Tab = styled("div")<{ active?: boolean; condensed?: boolean }>(({ theme, active }) => ({
  display: "flex",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  color: "currentColor",
  opacity: active ? 1 : 0.8,
  textTransform: "uppercase",
  fontFamily: theme.font.family.main,
  fontSize: theme.font.size.small,
  fontWeight: theme.font.weight.medium,
  padding: `0px ${theme.space.element}px`,
  borderBottom: "2px solid",
  borderBottomColor: active ? "currentColor" : "transparent",
  ":hover": {
    cursor: "pointer",
    opacity: 1,
  },
}))

const getTabIndexByName = (tabs: Tab[], tabName?: string): number => {
  if (tabName) {
    const index = tabs.findIndex(({ name }) => name === tabName)
    return index === -1 ? 0 : index
  }
  return 0
}

const Tabs = ({ onTabChange, tabs, activeTabName, condensed, children }: Props) => {
  const activeTabIndex = getTabIndexByName(tabs, activeTabName)
  const [activeTab, setActiveTab] = useState(activeTabIndex)
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

  // Work around: wrap return in fragment- to prevent type error and not having to change childrens return type
  // https://github.com/Microsoft/TypeScript/issues/21699
  return (
    <>
      {children({
        tabsBar: (
          <TabsBar condensed={condensed}>
            {tabs
              .filter(({ hidden }) => !hidden)
              .map((tab, index: number) => (
                <Tab condensed={condensed} key={index} active={activeTab === index} onClick={() => onTabClick(index)}>
                  {tab.loading ? (
                    <Spinner left size={14} />
                  ) : (
                    tab.icon && <Icon name={tab.icon} size={14} color={tab.iconColor} left />
                  )}
                  {tab.name}
                </Tab>
              ))}
          </TabsBar>
        ),
        activeChildren: tabs[activeTab].children,
      })}
    </>
  )
}

export default Tabs
