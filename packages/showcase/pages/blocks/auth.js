import * as React from "react"
import glamorous from "glamorous"
import { Card, Button, Heading2Type, Input, Icon } from "@operational/components"
import { Auth } from "@operational/blocks"

import Layout from "../../components/Layout"
import Table from "../../components/PropsTable"
import Playground from "../../components/Playground"

const CloseIcon = glamorous.div({
  position: "fixed",
  top: 20,
  right: 20,
  width: 60,
  height: 60,
  padding: 10,
  cursor: "pointer",
  zIndex: 10001,
  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  }
})

class AuthExpand extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isExpanded: false,
      username: "paul@...",
      password: "123"
    }
  }
  render() {
    return (
      <div>
        <Button
          color="info"
          onClick={() => {
            this.setState(p => ({
              isExpanded: true
            }))
          }}
        >
          Log in
        </Button>
        {this.state.isExpanded ? (
          <Auth
            title="Log in"
            username={this.state.username}
            password={this.state.password}
            css={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 10000
            }}
            onChange={c => {
              this.setState(p => c)
            }}
            onSubmit={e => {
              window.alert("Submitted!")
            }}
          />
        ) : null}
        {this.state.isExpanded ? (
          <CloseIcon
            style={{}}
            onClick={() => {
              this.setState(p => ({
                isExpanded: false
              }))
            }}
          >
            <Icon name="X" size={40} color="#FFF" />
          </CloseIcon>
        ) : null}
      </div>
    )
  }
}

const propDescription = [
  {
    name: "title",
    description: "Auth form title, e.g. 'Log in' or 'Reset password'",
    type: "string",
    defaultValue: "",
    optional: true
  },
  {
    name: "username",
    description:
      "User name input field value. The corresponding input field is not rendered if not present (supply empty string if there is no value but the form field should be displayed).",
    type: "string",
    defaultValue: "",
    optional: true
  },
  {
    name: "password",
    description:
      "Password input field value. The corresponding input field is not rendered if not present (supply empty string if there is no value but the form field should be displayed).",
    type: "string",
    defaultValue: "",
    optional: true
  },
  {
    name: "passwordConfirmation",
    description:
      "Password confirmation input field value. The corresponding input field is not rendered if not present (supply empty string if there is no value but the form field should be displayed).",
    type: "string",
    defaultValue: "",
    optional: true
  },
  {
    name: "processing",
    description:
      "Set this boolean prop to indicate that the form data is being processed. This fades the form, disables user interaction and renders a spinner.",
    type: "boolean",
    defaultValue: "false",
    optional: true
  },
  {
    name: "error",
    description: "Authentication error message.",
    type: "string",
    defaultValue: "",
    optional: true
  }
]

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>
        The Auth block supports general authentication needs. It expects generic props for username, password,
        passwordConfirmation etc., rendering corresponding form fields only they are supplied. The onChange callback
        takes care of sending updates to the parent, and onSubmit is called every time the component is submitted.
      </p>

      <p>
        Auth is purely presentational. It can display loading states and error messages, but it doesn't handle side
        effects or internal state.
      </p>

      <p>Try out the component by expanding the auth block below:</p>
      <AuthExpand />

      <Heading2Type>Props</Heading2Type>
      <Table props={propDescription} />
    </Card>
  </Layout>
)
