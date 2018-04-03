import * as React from "react"
import glamorous, { Div } from "glamorous"
import { operational, Theme } from "@operational/theme"
import { render } from "react-dom"
import { lighten } from "@operational/utils"
import Showcase from "./Showcase"

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
  ContextMenu,
  ContextMenuItem,
  Switch,
  Record,
  Progress,
  Breadcrumb,
  Breadcrumbs,
  Card,
  Heading1Type,
  Header,
  Sidenav,
  SidenavHeader,
  CardHeader
} from "../../src"

interface State {
  is: boolean
  value: string[]
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
  position: "relative",
  padding: "40px 20px"
}))

class Site extends React.Component<{}, State> {
  state: State = {
    is: true,
    value: [],
    start: null,
    end: null
  }

  render() {
    return (
      <OperationalUI withBaseStyles>
        <Layout>
          <Sidenav expanded css={{}}>
            <SidenavHeader
              label="Pantheon"
              icon={<Icon name="Pantheon" size={36} />}
              css={{
                borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                boxSizing: "border-box"
              }}
            />
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
          <Content>
            <Select
              label="abcd"
              options={[
                {
                  label: "123",
                  value: "123"
                },
                {
                  label: "456",
                  value: "456"
                }
              ]}
              value={this.state.value}
              filterable
              onChange={(newValue: string[]) => {
                this.setState(prevState => ({
                  value: newValue
                }))
              }}
            />
            <ContextMenu css={{ marginTop: 40 }}>
              this is inside a context menu
              <ContextMenuItem>abcd</ContextMenuItem>
            </ContextMenu>
          </Content>
        </Layout>
      </OperationalUI>
    )
  }
}

render(<Showcase />, document.getElementById("app"))
