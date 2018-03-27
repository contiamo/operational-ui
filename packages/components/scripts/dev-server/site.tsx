import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"
import { render } from "react-dom"
import { operational } from "@operational/theme"
import { lighten } from "@operational/utils"

import {
  OperationalUI,
  operationalTheme,
  Input,
  Button,
  Select,
  Layout,
  DatePicker,
  Grid,
  Switch,
  Record,
  Progress,
  Breakdown,
  RecordHeader,
  RecordBody,
  Breadcrumb,
  Breadcrumbs,
  Card,
  Heading1Type,
  Header,
  Table,
  Sidenav,
  CardHeader
} from "../../src"

interface State {
  is: boolean
  value: string | null
  start?: string
  end?: string
}

const Records = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  "& > *": {
    marginTop: -1
  }
}))

class Site extends React.Component<{}, State> {
  state: State = {
    is: true,
    value: null,
    start: null,
    end: null
  }

  render() {
    return (
      <OperationalUI withBaseStyles>
        <Layout>
          <Sidenav expanded />
          <Header>
            <Breadcrumbs>
              <Breadcrumb>One</Breadcrumb>
              <Breadcrumb>Two</Breadcrumb>
              <Breadcrumb>Three</Breadcrumb>
            </Breadcrumbs>
          </Header>
          <Grid type="3x2">
            <Card css={{ position: "relative" }}>
              <CardHeader>
                Card One
                <Button color="info" condensed css={{ marginRight: 0 }}>
                  Go somewhere
                </Button>
              </CardHeader>
              <glamorous.Div css={{ margin: "20px 0" }}>
                <Input value="1234" label="5678" />
              </glamorous.Div>
              <Button color="info">Button one</Button>
            </Card>
            <Card css={{ position: "relative" }}>
              <CardHeader>Card Two</CardHeader>
              <Switch
                on={this.state.is}
                onChange={() => {
                  this.setState(prevState => ({
                    is: !prevState.is
                  }))
                }}
              />
            </Card>
            <Card css={{ position: "relative" }}>
              <CardHeader>Card Three</CardHeader>
              <DatePicker
                label="31"
                start={this.state.start}
                end={this.state.end}
                onChange={newDates => {
                  this.setState(prevState => ({
                    ...newDates
                  }))
                }}
              />
              <Input value="1234" label="5678" css={{ marginTop: 20 }} />
            </Card>
            <Card css={{ position: "relative" }}>
              <CardHeader>Card Four</CardHeader>
            </Card>
            <Card css={{ position: "relative" }}>
              <CardHeader>Card Five</CardHeader>
            </Card>
            <Card css={{ position: "relative" }}>
              <CardHeader>Card Six</CardHeader>
            </Card>
          </Grid>
        </Layout>
      </OperationalUI>
    )
  }
}

render(<Site />, document.getElementById("app"))
