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
      .map((text, index) => <Card key={index}>{text}</Card>)}
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
      .map((text, index) => <Card key={index}>{text}</Card>)}
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
      .map((text, index) => <Card key={index}>{text}</Card>)}
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

### With dropdown menu

```jsx
const options = [
  { label: "Payroll", onClick: () => {} },
  { label: "All Databases", onClick: () => {} },
  { label: "Sales - Germany only", onClick: () => {} },
  { label: "Sales - global", onClick: () => {} },
  { label: "Reporting", onClick: () => {} },
  { label: "Logistics", onClick: () => {} },
]

const actions = (
  <HeaderMenu items={options} carat align={"right"}>
    Sales / Foodmart
  </HeaderMenu>
)
;<Page title="Settings Page" actions={actions}>
  <Card>Hello, this is page content</Card>
</Page>
```
