import React, { useCallback, useEffect, useState } from "react"
import Spinner from "../Spinner/Spinner"
import styled from "../utils/styled"
import { IconComponentType } from "../Icon/Icon"

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
  color: "inherit",
  position: "inherit",
  margin: `0 ${theme.space.element}px`,
  "&::before": {
    content: "''",
    display: "block",
    position: "absolute",
    width: "100%",
    top: tabsBarHeight - 1,
    left: 0,
    borderBottom: `1px solid ${theme.color.border.default}`,
  },
}))

const Tab = styled("div")<{ active?: boolean }>(({ theme, active }) => ({
  display: "flex",
  width: 150,
  height: "100%",
  backgroundColor: active ? "inherit" : theme.color.background.lighter,
  color: active ? theme.color.text.action : "currentColor",
  zIndex: 2,
  textTransform: "capitalize",
  fontFamily: theme.font.family.main,
  fontSize: theme.font.size.small,
  fontWeight: active ? theme.font.weight.bold : theme.font.weight.regular,
  padding: `0px ${theme.space.element}px`,
  border: `1px solid ${theme.color.border.default}`,
  borderBottomColor: active ? "white" : "border.default",
  borderRightWidth: 0,
  ":last-child": {
    borderRightWidth: 1,
  },
  ":hover": {
    cursor: "pointer",
    opacity: 1,
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
          <TabsBar>
            {tabs
              .filter(({ hidden }) => !hidden)
              .map((tab, index: number) => (
                <Tab key={index} active={activeTab === index} onClick={() => onTabClick(index)}>
                  {tab.loading ? (
                    <Spinner left size={14} />
                  ) : (
                    tab.icon && React.createElement(tab.icon, { size: 14, color: tab.iconColor, left: true })
                  )}
                  {<TabName>{tab.name}</TabName>}
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
