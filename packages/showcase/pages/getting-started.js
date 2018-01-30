import * as React from "react"
import {
  OperationalUI,
  Button,
  ButtonGroup,
  Breadcrumbs,
  Breadcrumb,
  Grid,
  Sidenav,
  SidenavHeader,
  SidenavItem,
  Spinner,
  Header,
  Card,
  CardHeader,
  Input
} from "@operational/components"
import { VisualizationWrapper, ProcessFlow } from "@operational/visualizations"

import Layout from "../components/Layout"
import Playground from "../components/Playground"

const simpleSnippet = `
<OperationalUI>
  <Grid css={{padding: 12, backgroundColor: "#F1F1F1"}} columns={[240, 240]} rows={[120, 120]}>
    <Card><Button color="info">Press me</Button></Card>
    <Card><Input label="Impress me" value="I will!" /></Card>
    <Card>
      <CardHeader>Header</CardHeader>
      <p>Content</p>
    </Card>
    <Card>
      <Spinner />
    </Card>
  </Grid>
</OperationalUI>
`

const layoutSnippet = `
<OperationalUI>
  <div style={{width: "100vw", height: "100vh", display: "flex", backgroundColor: "#F1F1F1"}}>
    <Sidenav>
      <SidenavHeader icon="Labs" label="Labs" />
    </Sidenav>
    <div style={{width: "100%", height: "100%"}}>
      <Header>
        <Breadcrumbs>
          <a href="/home"><Breadcrumb>Home</Breadcrumb></a>
          <a href="/projects"><Breadcrumb>Projects</Breadcrumb></a>
        </Breadcrumbs>
      </Header>
      <Grid css={{padding: 12, width: "calc(100% - 12px)", height: "calc(100% - 64px)"}} columns={["50%", "50%"]} rows={["50%", "50%"]}>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </Grid>
    </div>
  </div>
</OperationalUI>
`

const vizSnippet = `
(() => {
  class Flow extends React.Component {
    state = {
      config: {
        maxNodeSize: 800,
        nodeBorderWidth: 4
      },
      data: {
        journeys: [{ path: ["1", "3", "4"], size: 1500 }, { path: ["2", "3", "4"], size: 1200 }],
        nodes: [{ id: "1", group: "start" }, { id: "2", group: "start" }, { id: "3" }, { id: "4", group: "end" }]
      },
      accessors: {
        node: {
          color: (node: any) => {
            if (node.group === "start") {
              return "lightgreen"
            }
            if (node.group === "end") {
              return "lightcoral"
            }
            return "#fff"
          },
          shape: (node: any) => {
            if (node.group === "start") {
              return "square"
            }
            if (node.group === "end") {
              return "circle"
            }
            return "squareDiamond"
          },
          stroke: (node: any) => {
            return node.group ? "none" : "#000"
          }
        },
        link: {
          stroke: (link: any) => {
            if (link.source.attributes.group === "start") {
              return "lightgreen"
            }
            if (link.target.attributes.group === "end") {
              return "lightcoral"
            }
            return "#bbb"
          }
        }
      }
    }

    render() {
      return (
        <OperationalUI>
          <VisualizationWrapper
            facade={ProcessFlow}
            data={this.state.data}
            accessors={this.state.accessors}
            config={this.state.config}
          />
        </OperationalUI>
      )
    }
  }

  return (
    <Flow />
  )
})()
`

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <CardHeader>Getting Started with Operational UI</CardHeader>

      <p>
        Let's start creating a simple interface snippet. Operational UI encourages keeping content organized in cards,
        on a lightgray background.
      </p>

      <h2>1. Cards with things in them</h2>

      <p>Here is a simple way to get a nice app layout started:</p>

      <Playground snippet={simpleSnippet} scope={{ OperationalUI, Grid, Card, CardHeader, Button, Input, Spinner }} />

      <h2 id="layout">2. Application Layout</h2>

      <p>Operational UI makes it easy to give an opinionated navigational frame to your interface:</p>

      <Playground
        snippet={layoutSnippet}
        scope={{
          Breadcrumb,
          Breadcrumbs,
          Button,
          Card,
          CardHeader,
          Grid,
          Header,
          Input,
          OperationalUI,
          Sidenav,
          SidenavHeader
        }}
      />

      <h2>Add a visualization</h2>
      <p>
        Visualizations are at the heart of Operational interfaces, and we try to have them work as seamlessly as
        possible. That said, for something as complicated as the process flow visualization below, brace yourselves for
        a bit of a <a href="/visualizations/process-flow">learning curve</a>.
      </p>
      <Playground snippet={vizSnippet} scope={{ ProcessFlow }} components={{ OperationalUI, VisualizationWrapper }} />
    </Card>
  </Layout>
)
