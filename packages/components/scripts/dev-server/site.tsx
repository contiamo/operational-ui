import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"
import { render } from "react-dom"

import {
  OperationalUI,
  operationalTheme,
  Input,
  Button,
  Layout,
  Grid,
  Record,
  Progress,
  RecordHeader,
  RecordBody,
  Card,
  Heading1Type,
  Header,
  Table,
  Sidenav,
  CardHeader
} from "../../src"

interface State {
  isOpen: boolean
}

const Records = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  "& > *": {
    marginTop: -1
  }
}))

class Site extends React.Component<{}, State> {
  state = {
    isOpen: true
  }
  render() {
    return (
      <OperationalUI withBaseStyles>
        <Layout>
          <Sidenav />
          <Header />
          <Grid type="3x2">
            <Card css={{ position: "relative" }}>
              <CardHeader>Hello</CardHeader>
              <Progress
                error={this.state.isOpen ? "Loading error" : null}
                onRetry={() => {
                  this.setState(prevState => ({
                    isOpen: false
                  }))
                }}
              />
            </Card>
          </Grid>
        </Layout>
      </OperationalUI>
    )
  }
}

render(<Site />, document.getElementById("app"))
