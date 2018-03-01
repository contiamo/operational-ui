import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"
import Button from "./Button"

export interface Props {
  css?: {}
  className?: string
  children?: React.ReactNode
  controls?: React.ReactNode
  initiallyExpanded?: boolean
}

export interface State {
  isExpanded: boolean
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "record",
  position: "relative",
  border: `1px solid ${theme.colors.gray20}`
}))

const HeaderContainer = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${theme.spacing / 2}px ${theme.spacing}px`,
  height: 48
}))

class Record extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isExpanded: Boolean(props.initiallyExpanded)
    }
  }

  render() {
    return (
      <Container css={this.props.css} className={this.props.className}>
        <HeaderContainer>
          {React.Children.map(this.props.children, (child: any, index: number) => {
            return child.props.__isRecordHeader ? child : null
          })}
          {this.props.controls ? (
            this.props.controls
          ) : (
            <Button
              color={this.state.isExpanded ? "#FFF" : "info"}
              condensed
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
          )}
        </HeaderContainer>
        {React.Children.map(this.props.children, (child: any, index: number) => {
          return child.props.__isRecordBody && this.state.isExpanded ? child : null
        })}
      </Container>
    )
  }
}

export default Record
