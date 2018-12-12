import * as React from "react"
import ContextMenu, { ContextMenuProps } from "../ContextMenu/ContextMenu"
import Icon from "../Icon/Icon"
import styled from "../utils/styled"

export interface TopbarSelectProps {
  /** A label added right before displaying the selected value */
  label: string
  /** Selected value */
  selected?: string
  /** A placeholder displayed when no item is selected */
  placeholder?: string
  /** Menu items, conforming to the ContextMenu API */
  items: ContextMenuProps["items"]
  /** Change handler */
  onChange?: (newLabel: string | React.ReactElement<any>) => void
}

export interface State {
  renderedWidth?: number
}

const TopbarSelectContainer = styled("div")<{ isActive: boolean }>`
  height: ${props => props.theme.topbarHeight}px;
  display: flex;
  align-items: center;
  padding: 0px ${props => props.theme.space.medium}px;
  box-shadow: ${props => (props.isActive ? props.theme.shadows.popup : "none")};
  border-bottom: ${props => (props.isActive ? "1px" : "0px")};
  border-color: ${props => props.theme.color.border.default};
  cursor: pointer;
  background-color: ${props => (props.isActive ? props.theme.color.white : "transparent")};
  :hover {
    background-color: ${props => (props.isActive ? props.theme.color.white : props.theme.color.background.lighter)};
  }
  & svg {
    /** Icons are purely presentational and click events are handled upstream */
    pointer-events: none;
  }
`

const TopbarSelectValue = styled("div")`
  padding: 0px ${props => props.theme.space.base}px;
  font-size: ${props => props.theme.font.size.fineprint}px;
  display: flex;
  align-items: center;
  color: ${props => props.theme.color.text.dark};
  & > :first-child {
    margin-right: ${props => props.theme.space.element}px;
  }
`

const TopbarSelectValueSpan = styled("span")<{ active?: boolean }>`
  color: ${props => (props.active ? props.theme.color.text.dark : props.theme.color.text.lighter)};
`

const TopbarSelectLabel = styled("p")`
  margin: 0px ${props => props.theme.space.base}px 0px 0px;
  font-size: ${props => props.theme.font.size.fineprint}px;
  color: ${props => props.theme.color.text.lighter};
  font-weight: ${props => props.theme.font.weight.medium};
`

class TopbarSelect extends React.Component<TopbarSelectProps, Readonly<State>> {
  public state: State = {
    renderedWidth: undefined,
  }

  private containerRef = React.createRef()

  public componentDidMount() {
    this.updateRenderedWidth()
  }

  public componentDidUpdate() {
    this.updateRenderedWidth()
  }

  private updateRenderedWidth() {
    const node = this.containerRef.current as HTMLElement
    if (!node) {
      return
    }
    const renderedWidth = node.clientWidth
    if (renderedWidth !== this.state.renderedWidth) {
      this.setState(() => ({
        renderedWidth,
      }))
    }
  }

  public render() {
    const { label, selected, items, onChange, ...props } = this.props
    return (
      <ContextMenu
        condensed
        items={items}
        width={this.state.renderedWidth}
        onClick={newItem => {
          if (onChange) {
            onChange(newItem.label)
          }
        }}
      >
        {isActive => (
          <TopbarSelectContainer {...props} isActive={isActive} innerRef={this.containerRef}>
            <TopbarSelectLabel>{label}</TopbarSelectLabel>
            <TopbarSelectValue>
              <TopbarSelectValueSpan active={Boolean(selected)}>{selected}</TopbarSelectValueSpan>
              <Icon name={isActive ? "ChevronUp" : "ChevronDown"} size={12} />
            </TopbarSelectValue>
          </TopbarSelectContainer>
        )}
      </ContextMenu>
    )
  }
}

export default TopbarSelect
