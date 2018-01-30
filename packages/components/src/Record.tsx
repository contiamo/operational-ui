import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"
import Button from "./Button"

export interface IProps {
  css?: {}
  className?: string
  children?: React.ReactNode
}

export interface IState {
  isExpanded: boolean
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "record",
  position: "relative",
  border: `1px solid ${theme.colors.gray20}`
}))

export default class Record extends React.Component<IProps, IState> {
  state = {
    isExpanded: false
  }
  render() {
    return (
      <Container css={this.props.css} className={this.props.className}>
        {React.Children.map(this.props.children, (child: any, index: number) => {
          return !child.props.__isRecordBody || this.state.isExpanded ? child : null
        })}
        <Button
          color="info"
          css={{
            position: "absolute",
            top: 24,
            right: 12,
            marginRight: 0,
            transform: "translate3d(0, -50%, 0)"
          }}
          onClick={() => {
            this.setState(prevState => ({
              isExpanded: !prevState.isExpanded
            }))
          }}
        >
          {this.state.isExpanded ? "Hide details" : "Details"}
        </Button>
      </Container>
    )
  }
}
