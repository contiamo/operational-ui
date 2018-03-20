# Getting Started with Operational UI

Let's start creating a simple interface snippet. Operational UI encourages keeping content organized in cards, on a lightgray background.

## 1. Cards with things in them

Here is a simple way to get a nice app layout started:


```
<OperationalUI>
  <Grid type="3x2">
    <Card><Button color="info">Press me</Button></Card>
    <Card>
      <CardHeader>Header</CardHeader>
      <p>Content</p>
    </Card>
    <Card>
      <Spinner />
    </Card>
  </Grid>
</OperationalUI>
```

## 2. Application Layout</h2>

Operational UI makes it easy to give an opinionated navigational frame to your interface:

```js
<OperationalUI withBaseStyles>
  <Layout>
    <Sidenav />
    <Header>
      <Breadcrumbs>
        <Breadcrumb>Home</Breadcrumb>
        <Breadcrumb>Customers</Breadcrumb>
      </Breadcrumbs>
    </Header>
    <Grid type="3x2">
      <Card><CardHeader>Hello</CardHeader></Card>
    </Grid>
  </Layout>
</OperationalUI>
```

## Add a visualization

Visualizations are at the heart of Operational interfaces, and we try to have them work as seamlessly as
possible. That said, for something as complicated as the process flow visualization below, brace yourselves for
a bit of a <a href="/visualizations/process-flow">learning curve</a>.

```js
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
```

