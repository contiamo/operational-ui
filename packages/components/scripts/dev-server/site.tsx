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
  Breakdown,
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
              <Progress />
              <Input label="1234" css={{ width: 500 }} value="123" />
              <Breakdown fill={0.5} label="33.15323">Abcd</Breakdown>
            </Card>
          </Grid>
        </Layout>
      </OperationalUI>
    )
  }
}

render(<Site />, document.getElementById("app"))
