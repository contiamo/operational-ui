The way to give more structure to your page

### Usage

In this case `PageArea` is implicit

```jsx
<Page>
  <Card title="Bundles" />
</Page>
```

### With 2 columns

```jsx
<Page areas="main side">
  <PageArea name="main">
    <Card title="My bundle" />
  </PageArea>
  <PageArea name="side">
    <Card title="Deploy functions" />
    <Card title="Sync" />
    <Card title="Repository" />
  </PageArea>
</Page>
```

### With 2 columns and full width

```jsx
<Page areas="side main" fill>
  <PageArea name="main">
    <Card title="My bundle" />
  </PageArea>
  <PageArea name="side">
    <Card title="Deploy functions" />
    <Card title="Sync" />
    <Card title="Repository" />
  </PageArea>
</Page>
```

### Inside tabs

```jsx
const Overview = () => (
  <Page areas="side main" fill>
    <PageArea name="main">
      <Card title="My bundle" />
    </PageArea>
    <PageArea name="side">
      <Card title="Deploy functions" />
      <Card title="Sync" />
      <Card title="Repository" />
    </PageArea>
  </Page>
)
;<Page title="Bundle detail" compactHeader tabs={[{ name: "overview", component: Overview }]} />
```
