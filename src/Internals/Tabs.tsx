import * as React from "react"
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
  ...(condensed ? { paddingLeft: 30 } : {}),
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

class Tabs extends React.Component<Props, State> {
  public state = {
    activeTab: 0,
  }

  private onTabClick(index: number) {
    this.setState(() => ({ activeTab: index }))
    if (this.props.onTabChange) {
      this.props.onTabChange(this.props.tabs[index].name)
    }
  }

  private getActiveTab(): number {
    let activeTab: number
    if (this.props.activeTabName) {
      const index = this.props.tabs.findIndex(({ name }) => name === this.props.activeTabName)
      activeTab = index === -1 ? 0 : index
    } else {
      activeTab = this.state.activeTab
    }
    return activeTab
  }

  public render() {
    const activeTab = this.getActiveTab()
    return this.props.children({
      tabsBar: (
        <TabsBar condensed={this.props.condensed}>
          {this.props.tabs.filter(({ hidden }) => !hidden).map((tab, index: number) => (
            <Tab
              condensed={this.props.condensed}
              key={index}
              active={activeTab === index}
              onClick={() => this.onTabClick(index)}
            >
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
      activeChildren: this.props.tabs[activeTab].children,
    })
  }
}

export default Tabs
