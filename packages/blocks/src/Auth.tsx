import * as React from "react"
import glamorous from "glamorous"

import { Theme } from "@operational/theme"
import { Input, TitleType, Button } from "@operational/components"

export interface IProps {
  css?: {}
  className?: string
  username?: string
  password?: string
  passwordConfirmation?: string
  processing?: string
  error?: string
  title?: string
  onSubmit?: () => void
  onChange?: (change: {}) => void
}

export interface IState {}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "auth",
  backgroundColor: theme.colors.sidenavBackground,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}))

const Content = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  backgroundColor: theme.colors.white,
  padding: `${theme.spacing}px ${theme.spacing}px`,
  width: "100%",
  maxWidth: 480
}))

const InputContainer = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  margin: `${2 * theme.spacing}px 0`,
  display: "block"
}))

export default class Auth extends React.Component<IProps, IState> {
  render() {
    return (
      <Container css={this.props.css} className={this.props.className}>
        <Content>
          {this.props.title ? <TitleType>{this.props.title}</TitleType> : null}
          {this.props.username ? (
            <InputContainer>
              <Input
                value={this.props.username}
                label="User name"
                onChange={(v: string) => {
                  this.props.onChange &&
                    this.props.onChange({
                      username: v
                    })
                }}
              />
            </InputContainer>
          ) : null}
          {this.props.password ? (
            <InputContainer>
              <Input
                value={this.props.password}
                placeholder="******"
                type="password"
                label="Password"
                onChange={(v: string) => {
                  this.props.onChange &&
                    this.props.onChange({
                      password: v
                    })
                }}
              />
            </InputContainer>
          ) : null}
          {this.props.passwordConfirmation ? (
            <InputContainer>
              <Input
                value={this.props.passwordConfirmation}
                placeholder="******"
                type="password"
                label="Password confirmation"
                onChange={(v: string) => {
                  this.props.onChange &&
                    this.props.onChange({
                      passwordConfirmation: v
                    })
                }}
              />
            </InputContainer>
          ) : null}
          <Button
            color="info"
            type="submit"
            onClick={() => {
              this.props.onSubmit && this.props.onSubmit()
            }}
          >
            Submit
          </Button>
        </Content>
      </Container>
    )
  }
}
