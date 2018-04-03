import * as React from "react"
import glamorous, { Div } from "glamorous"
import { operational, Theme } from "@operational/theme"
import { render } from "react-dom"
import { lighten } from "@operational/utils"

import {
  OperationalUI,
  operationalTheme,
  Input,
  Icon,
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
  SidenavHeader,
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

const Content = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  backgroundColor: theme.colors.white,
  position: "relative"
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
          <Sidenav expanded css={{}}>
            <Div css={{ width: "100%", position: "relative" }}>
              <SidenavHeader
                label="Pantheon"
                icon={<Icon name="Pantheon" size={36} />}
                css={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                  boxSizing: "border-box"
                }}
              />
              <Div
                css={{
                  width: 60,
                  height: 60,
                  right: -300,
                  top: 0,
                  backgroundColor: "teal",
                  position: "absolute",
                  overflow: "auto",
                  zIndex: 10000
                }}
              />
            </Div>
            <SidenavHeader label="Saved Queries" icon="Send" />
            <SidenavHeader label="Data Sources" icon="Database" />
            <SidenavHeader label="Schemas" icon="Code" />
            <SidenavHeader label="Executed Queries" icon="Clipboard" />
          </Sidenav>
          <Header
            css={{
              boxSizing: "border-box",
              boxShadow: "none"
            }}
          >
            <Breadcrumbs>
              <Breadcrumb>One</Breadcrumb>
              <Breadcrumb>Two</Breadcrumb>
              <Breadcrumb>Three</Breadcrumb>
            </Breadcrumbs>
          </Header>
          <Content />
        </Layout>
      </OperationalUI>
    )
  }
}

render(<Site />, document.getElementById("app"))
