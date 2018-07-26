import * as React from "react"
import { Title } from ".."
import Confirm, { ConfirmOptions } from "../Confirm/Confirm"
import Modal, { ModalOptions } from "../Modal/Modal"
import PageArea from "../PageArea/PageArea"
import PageContent from "../PageContent/PageContent"
import styled from "../utils/styled"

export type Tabs = Array<{ name: string; component: React.ComponentType; hidden?: boolean }>

export interface ModalConfirmContext {
  modal: (modalOptions: ModalOptions) => void
  confirm: (confirmOptions: ConfirmOptions) => void
}

export interface Props {
  /** Page title */
  title?: string
  /** Page actions, typically `condensed button` component inside a fragment */
  actions?: React.ReactNode
  /** Content of the page */
  children?: React.ReactNode | ((modalConfirmContext: ModalConfirmContext) => React.ReactNode)
  /** Areas template for `PageArea` disposition */
  areas?: "main" | "main side" | "side main"
  /** Fill the entire width */
  fill?: boolean
  /**
   * List of tabs
   * This will disable any children to render `tabs[i].component` instead
   */
  tabs?: Tabs | ((modalConfirmContext: ModalConfirmContext) => Tabs)
  /**
   * Active tab name
   *
   * If not specified, active tab is controlled by internal state.
   */
  activeTabName?: string
  /**
   * Send the active name tab on each tab change (in lowercase).
   */
  onTabChange?: (name: string) => void
}

const Container = styled("div")(({ theme }) => ({
  height: "100%",
  position: "relative",
  backgroundColor: theme.color.background.lighter,
}))

const TitleBar = styled("div")(({ theme }) => ({
  backgroundColor: theme.color.primary,
  display: "flex",
  alignItems: "center",
  padding: theme.space.element,
  height: theme.titleHeight,
  fontWeight: theme.font.weight.medium,
}))

const tabsBarHeight = 43

const TabsBar = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-end",
  height: tabsBarHeight,
  backgroundColor: theme.color.primary,
}))

const Tab = styled("div")<{ active?: boolean }>(({ theme, active }) => ({
  color: theme.color.white,
  opacity: active ? 1 : 0.8,
  textTransform: "uppercase",
  fontFamily: theme.font.family.main,
  fontSize: theme.font.size.small,
  fontWeight: theme.font.weight.medium,
  padding: `${theme.space.element / 2}px ${theme.space.element}px`,
  borderBottom: active ? `2px solid ${theme.color.white}` : `2px solid transparent`,
  ":hover": {
    cursor: "pointer",
    opacity: 1,
  },
}))

const ViewContainer = styled("div")<{ isInTab?: boolean }>(({ theme, isInTab }) => ({
  height: `calc(100% - ${isInTab ? theme.titleHeight + tabsBarHeight : theme.titleHeight}px)`,
  overflow: "auto",
}))

const ActionsContainer = styled("div")(({ theme }) => ({
  marginLeft: theme.space.element,
}))

const initialState = {
  activeTab: 0,
}

class Page extends React.Component<Props, Readonly<typeof initialState>> {
  public static defaultProps = {
    areas: "main",
    fill: false,
  }

  public state = initialState

  public onTabClick(index: number, tabs: Tabs) {
    this.setState({ activeTab: index })
    if (this.props.onTabChange) {
      this.props.onTabChange(tabs[index].name.toLowerCase())
    }
  }

  public getActiveTab(tabs: Tabs): number {
    let activeTab: number
    if (this.props.activeTabName) {
      const index = tabs.findIndex(({ name }) => name.toLowerCase() === this.props.activeTabName!.toLowerCase())
      activeTab = index === -1 ? 0 : index
    } else {
      activeTab = this.state.activeTab
    }

    return activeTab
  }

  public render() {
    return (
      <Modal>
        {modal => (
          <Confirm>
            {confirm => {
              const modalConfirmContext: ModalConfirmContext = { modal, confirm }
              const { title, actions, areas, fill } = this.props
              const children =
                typeof this.props.children === "function"
                  ? this.props.children(modalConfirmContext)
                  : this.props.children
              const tabs =
                typeof this.props.tabs === "function" ? this.props.tabs(modalConfirmContext) : this.props.tabs
              const activeTab = this.getActiveTab(tabs || [])
              const grid = React.Children.count(children) > 1 ? "main side" : "main"
              const CurrentTab = tabs && tabs[activeTab].component
              return (
                <Container>
                  {title && (
                    <TitleBar>
                      <Title color="white">{title}</Title>
                      <ActionsContainer>{actions}</ActionsContainer>
                    </TitleBar>
                  )}
                  {tabs ? (
                    <>
                      <TabsBar>
                        {tabs.filter(({ hidden }) => !hidden).map(({ name }, i) => (
                          <Tab key={i} active={i === activeTab} onClick={() => this.onTabClick(i, tabs)}>
                            {name}
                          </Tab>
                        ))}
                      </TabsBar>
                      <ViewContainer isInTab>{CurrentTab && <CurrentTab />}</ViewContainer>
                    </>
                  ) : (
                    <ViewContainer>
                      <PageContent areas={areas ? areas : grid} fill={fill}>
                        {areas === "main" ? <PageArea>{children}</PageArea> : children}
                      </PageContent>
                    </ViewContainer>
                  )}
                </Container>
              )
            }}
          </Confirm>
        )}
      </Modal>
    )
  }
}

export default Page

export { ModalOptions, ConfirmOptions }
