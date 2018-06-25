This component lays out a typical opinionated page in an application, containing a title, breadcrumbs, control buttons, as well as iconography that helps the user understand how the page fits into the larger context of the application.

This component is typically used inside a layout component along with a sidenav. Check out the [layout docs](./layout.md) to get a sense of this usage.

### Usage

Here is a simple usage example:

```jsx
;<Page title="Settings Page">
  <Card>Hello, this is page content</Card>
</Page>
```

### Properly handles grid rows

Here is a simple usage example:

```jsx
;<div style={{ height: 400 }}>
  <Page title="Settings Page">
    {Array(2)
      .fill("Hello, this is page content")
      .map(({ text, index }) => <Card key={index}>{text}</Card>)}
  </Page>
</div>
```

### Sticky Header

Here is a simple usage example:

```jsx
;<div style={{ height: 200 }}>
  <Page title="Settings Page">
    {Array(50)
      .fill("Hello, this is page content")
      .map(({ text, index }) => <Card key={index}>{text}</Card>)}
  </Page>
</div>
```

### With actions

```jsx
/* Always use condensed buttons in page actions */
const actions = (
  <Button condensed icon="ExternalLink" color="ghost">
    Go somewhere else
  </Button>
)
;<Page title="Settings Page" actions={actions}>
  <Card>Hello, this is page content</Card>
</Page>
```

### With tabs

```jsx
const Tab = n => () => (
  <PageContent>
    <Card title={`${n} Tab`} />
  </PageContent>
)
;<Page
  title="Bundle detail"
  tabs={[
    { name: "overview", component: Tab("overview") },
    { name: "jobs", component: Tab("jobs") },
    { name: "functions", component: Tab("functions") },
  ]}
/>
```

### Sticky Header with Tabs

```jsx
const Tab = n => () => (
  <PageContent areas="side main">
    {Array(50)
      .fill("Hello, this is page content")
      .map(({ text, index }) => <Card key={index}>{text}</Card>)}
  </PageContent>
)
;<div style={{ height: 200 }}>
  <Page
    actions={
      <Button condensed icon="ExternalLink" color="ghost">
        Go somewhere else
      </Button>
    }
    title="Bundle detail"
    tabs={[
      { name: "overview", component: Tab("overview") },
      { name: "jobs", component: Tab("jobs") },
      { name: "functions", component: Tab("functions") },
    ]}
  />
</div>
```

### With tabs and handlers

```jsx
const Tab = n => () => (
  <PageContent>
    <Card title={`${n} Tab`} />
  </PageContent>
)
;<Page
  title="Bundle detail"
  activeTabName="jobs"
  onTabChange={console.log}
  tabs={[
    { name: "overview", component: Tab("overview") },
    { name: "jobs", component: Tab("jobs") },
    { name: "functions", component: Tab("functions") },
  ]}
/>
```

### With different layout

```jsx
;<Page title="Side on left!" areas="side main" fill>
  <PageArea name="side">
    <Card title="Side part">I'm on the side part</Card>
  </PageArea>
  <PageArea name="main">
    <Card title="Main part">I'm on the main part</Card>
  </PageArea>
</Page>
```

### With tabs and router

The idea here is to just give strings as tabs, and give the switch responsability to react-router for example.

```jsx
class Routes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentRoute: "overview",
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(name) {
    this.setState({ currentRoute: name })
  }

  render() {
    const Switch = {
      overview: () => <Card title="Overview" />,
      jobs: () => <Card title="Jobs" />,
      functions: () => (
        <Card title="Functions">
          <Button color="primary" onClick={() => this.onChange("functions/myfunction")}>
            Go to function detail
          </Button>
        </Card>
      ),
      "functions/myfunction": () => <Card title="Function Detail" />,
    }[this.state.currentRoute]

    return (
      <Page
        title="With a router"
        onTabChange={this.onChange}
        activeTabName={this.state.currentRoute.split("/")[0]}
        tabs={["overview", "jobs", "functions"]}
      >
        <PageContent>
          <Switch />
        </PageContent>
      </Page>
    )
  }
}

;<Routes />
```
