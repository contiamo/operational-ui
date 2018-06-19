This component lays out a typical opinionated page in an application, containing a title, breadcrumbs, control buttons, as well as iconography that helps the user understand how the page fits into the larger context of the application.

This component is typically used inside a layout component along with a sidenav. Check out the [layout docs](./layout.md) to get a sense of this usage.

### Usage

Here is a simple usage example:

```jsx
;<Page title="Settings Page">
  <Card>Hello, this is page content</Card>
</Page>
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
  <Page>
    <Card title={`${n} Tab`} />
  </Page>
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

### With tabs and handlers

```jsx
const Tab = n => () => (
  <Page>
    <Card title={`${n} Tab`} />
  </Page>
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
