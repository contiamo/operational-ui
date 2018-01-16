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
  minHeight: 58,
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
          return !child.props.__isRecordDetails || this.state.isExpanded ? child : null
        })}
        <Button
          css={{
            position: "absolute",
            right: 12,
            top: 12
          }}
          color="info"
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
