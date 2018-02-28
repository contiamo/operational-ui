import * as React from "react"
import glamorous from "glamorous"

import { Theme } from "@operational/theme"
import { Input, TitleType, Button, Spinner } from "@operational/components"

export interface Props {
  css?: {}
  className?: string
  username?: string
  password?: string
  passwordConfirmation?: string
  error?: string
  title?: string
  processing?: boolean
  onSubmit?: () => void
  onChange?: (change: {}) => void
}

export interface State {}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "auth",
  backgroundColor: theme.colors.sidenavBackground,
  width: "100%",
  height: "100%",
  padding: theme.spacing,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}))

const AuthCard = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  position: "relative",
  label: "authcontent",
  boxShadow: theme.shadows.popup,
  borderRadius: 2,
  backgroundColor: theme.colors.white,
  padding: `${3 * theme.spacing}px ${1.5 * theme.spacing}px`,
  width: "100%",
  maxWidth: 360
}))

const Content = glamorous.div(({ theme, isEnabled }: { theme: Theme; isEnabled: boolean }): {} => ({
  opacity: isEnabled ? 1 : 0.4,
  pointerEvents: isEnabled ? "all" : "none"
}))

const SubmitContainer = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  marginTop: 2.5 * theme.spacing,
  textAlign: "center",
  "& > *": {
    width: "100%"
  }
}))

const InputFields = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  margin: `${1 * theme.spacing}px 0`
}))

const ErrorNotice = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  ...theme.typography.body,
  textAlign: "center",
  color: theme.colors.error
}))

const inputStyle: {} = {
  display: "block",
  margin: "20px 0"
}

/*
 * Checks whether a string value exists or not (same as !!stringValue, except it also returns
 * true for empty string. This is used especially often in this component because this component 
 * renders form fields if any corresponding string value is passed down in props.
 * e.g. props.username === null -> rendern no user name form field at all
 *      props.username === "" -> render empty form field for user name
 */
const isStringValue = (stringValue?: string): boolean => !!stringValue || stringValue === ""

export default class Auth extends React.Component<Props, State> {
  render() {
    return (
      <Container css={this.props.css} className={this.props.className}>
        <AuthCard>
          {this.props.processing ? (
            <Spinner css={{ position: "absolute", top: "calc(50% - 20px)", left: "calc(50% - 20px)", zIndex: 10000 }} />
          ) : null}
          <Content isEnabled={!this.props.processing}>
            {this.props.title ? (
              <TitleType css={{ textAlign: "center", margin: 0 }}>{this.props.title}</TitleType>
            ) : null}
            {this.props.error ? <ErrorNotice>{this.props.error}</ErrorNotice> : null}
            <InputFields>
              {isStringValue(this.props.username) ? (
                <Input
                  css={inputStyle}
                  value={this.props.username}
                  label="User name"
                  onChange={(v: string) => {
                    this.props.onChange &&
                      this.props.onChange({
                        username: v
                      })
                  }}
                />
              ) : null}
              {isStringValue(this.props.password) ? (
                <Input
                  css={inputStyle}
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
              ) : null}
              {isStringValue(this.props.passwordConfirmation) ? (
                <Input
                  css={inputStyle}
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
              ) : null}
            </InputFields>
            <SubmitContainer>
              <Button
                css={{ margin: 0 }}
                color="info"
                type="submit"
                onClick={() => {
                  this.props.onSubmit && this.props.onSubmit()
                }}
              >
                Submit
              </Button>
            </SubmitContainer>
          </Content>
        </AuthCard>
      </Container>
    )
  }
}
