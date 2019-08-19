import * as React from "react"
import CopyToClipboard from "react-copy-to-clipboard"

import Tooltip from "../Tooltip/Tooltip"
import { isClient } from "../utils/isClient"
import styled from "../utils/styled"
import { makeRowsFromConfig } from "./makeRowsFromConfig"
import { CopyIcon, ChevronDownIcon, ChevronUpIcon } from "../Icon"

export interface DebugProps<T extends {}> {
  title: string
  values: T
  className?: string
  expanded?: boolean
}

export interface DebugState {
  isExpanded: boolean
  copied: boolean
  top?: number
  left?: number

  // Required for calculating final drop position.
  contextTop?: number
  contextLeft?: number
}

const Container = styled("div")`
  position: fixed;
  bottom: ${({ theme }) => theme.space.element}px;
  right: ${({ theme }) => theme.space.element}px;
  width: fit-content;
  display: grid;
  grid-template-rows: 40px auto;
  background: rgba(0, 0, 0, 0.7);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  color: white;
  z-index: ${({ theme }) => theme.zIndex.debugViewer};
`

const Header = styled("div")`
  padding: 0 ${({ theme }) => theme.space.content}px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-weight: ${({ theme }) => theme.font.weight.bold};
  cursor: pointer;
`

const ConfigTableContainer = styled("div")`
  overflow: auto;
  max-height: 80vh;
  -webkit-overflow-scrolling: touch;
`

const ConfigTable = styled("table")`
  font: inherit;
  color: inherit;

  td {
    padding: ${({ theme }) => `${theme.space.small}px ${theme.space.content}px`};
  }

  td:nth-child(odd) {
    font-weight: ${({ theme }) => theme.font.weight.medium};
  }
`

const Icons = styled("div")`
  position: relative;
  margin-left: auto;
  display: flex;
  align-items: center;

  svg + svg {
    margin-left: ${({ theme }) => theme.space.small}px;
  }
`

const Title = styled("span")`
  display: inline-block;
  margin-right: ${({ theme }) => theme.space.element}px;
`

class Debug<T> extends React.Component<DebugProps<T>, DebugState> {
  public static defaultProps = {
    expanded: false,
  }

  public state: DebugState = {
    isExpanded: this.props.expanded!,
    copied: false,
  }

  public dragStart = (event: React.DragEvent) => {
    event.persist()
    const style = window.getComputedStyle(event.currentTarget, null)

    this.setState(() => ({
      contextLeft: parseInt(style.getPropertyValue("left"), 10) - event.clientX,
      contextTop: parseInt(style.getPropertyValue("top"), 10) - event.clientY,
    }))
  }

  public drop = (event: React.DragEvent) => {
    event.persist()
    event.preventDefault()
    const { contextTop, contextLeft } = this.state
    if (typeof contextLeft === "undefined") {
      return
    }
    if (typeof contextTop === "undefined") {
      return
    }
    this.setState(() => ({
      left: event.clientX + contextLeft,
      top: event.clientY + contextTop,
    }))
  }

  public dragOver = (event: React.DragEvent) => event.preventDefault()

  private toggle = () => this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }))

  private showCopyFeedback = () => {
    this.setState(() => ({ copied: true }))
    setTimeout(() => this.setState(() => ({ copied: false })), 1000)
  }

  public render() {
    const { title: debugTitle, values } = this.props
    const { isExpanded, top, left, copied } = this.state

    return (
      <Container
        /**
         * We initially style the component to be relative to the bottom and the right.
         * Once we have a top and left position, reset the bottom and the right.
         */
        style={top && left ? { top, left, bottom: "initial", right: "initial" } : {}}
        draggable
        onDragStart={this.dragStart}
        onDragOver={this.dragOver}
        onDragEnd={this.drop}
        className={this.props.className}
      >
        <Header onClick={() => this.toggle()}>
          <Title>{debugTitle}</Title>
          <Icons>
            <CopyToClipboard
              text={JSON.stringify({ currentUrl: isClient() ? window.location.href : "", debug: values }, null, 2)}
              onCopy={this.showCopyFeedback}
            >
              <CopyIcon onClick={e => e.stopPropagation()} />
            </CopyToClipboard>
            {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
            {copied && <Tooltip position="top">Copied</Tooltip>}
          </Icons>
        </Header>
        {isExpanded && (
          <ConfigTableContainer>
            <ConfigTable>
              <tbody>{makeRowsFromConfig(values)}</tbody>
            </ConfigTable>
          </ConfigTableContainer>
        )}
      </Container>
    )
  }
}

export default Debug
