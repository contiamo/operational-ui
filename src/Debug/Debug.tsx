import { title } from "case"
import * as React from "react"

import Code from "../Code/Code"
import Icon from "../Icon/Icon"
import styled from "../utils/styled"

export interface DebugProps<T extends {}> {
  title: string
  values: T
  className?: string
  expanded?: boolean
}

export interface DebugState {
  isExpanded: boolean
  top?: number
  left?: number

  // Required for calcuating final drop position.
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

const DebugCode = styled(Code)`
  color: white;
`

const ConfigTable = styled("table")`
  td {
    padding: ${({ theme }) => `${theme.space.small}px ${theme.space.content}px`};
  }

  td:nth-child(odd) {
    font-weight: ${({ theme }) => theme.font.weight.medium};
  }
`

function makeRowsFromObject<T>(object: T) {
  return Object.entries(object).map(([key, value]) => {
    const casedKey = title(key)
    if (value instanceof Object) {
      return (
        <React.Fragment key={key}>
          <tr>
            <td colSpan={2}>{casedKey}</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <DebugCode
                codeTheme={{
                  base00: "transparent",
                  base02: "transparent",
                  base04: "cyan",
                  base07: "orange",
                  base09: "white",
                }}
                syntax="json"
                src={value}
              />
            </td>
          </tr>
        </React.Fragment>
      )
    }
    return (
      <tr key={key}>
        <td>{casedKey}</td>
        <td>{value}</td>
      </tr>
    )
  })
}

const DebugToggler = styled(Icon)`
  margin-left: auto;
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

  public render() {
    const { title: debugTitle, values } = this.props
    const { isExpanded, top, left } = this.state

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
          <Title>{debugTitle}</Title> <DebugToggler name={isExpanded ? "ChevronUp" : "ChevronDown"} />
        </Header>
        {isExpanded && (
          <ConfigTable>
            <tbody>{makeRowsFromObject(values)}</tbody>
          </ConfigTable>
        )}
      </Container>
    )
  }
}

export default Debug
