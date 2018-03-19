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
  value: string | null
}

const Records = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  "& > *": {
    marginTop: -1
  }
}))

class Site extends React.Component<{}, State> {
  state: State = {
    isOpen: true,
    value: null
  }
  render() {
    console.log(this.state.value)
    return (
      <OperationalUI withBaseStyles>
        <Layout>
          <Sidenav />
          <Header />
          <Grid type="3x2">
            <Card css={{ position: "relative" }}>
              <CardHeader>Hello</CardHeader>
              <Progress />
              <Input label="1234" css={{ width: 500 }} value={this.state.value} onChange={(newVal) => {
                this.setState(prevState => ({
                  value: newVal
                }))
              }}/>
            </Card>
          </Grid>
        </Layout>
      </OperationalUI>
    )
  }
}

render(<Site />, document.getElementById("app"))
