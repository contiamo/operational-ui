The way to give more structure to your page

### Usage

In this case `PageArea` is implicit

```jsx
<PageContent>
  <Card title="Bundles" />
</PageContent>
```

### With 2 columns

```jsx
<PageContent areas="main side">
  <PageArea name="main">
    <Card title="My bundle" />
  </PageArea>
  <PageArea name="side">
    <Card title="Deploy functions" />
    <Card title="Sync" />
    <Card title="Repository" />
  </PageArea>
</PageContent>
```

### With 2 columns (reverse areas)

```jsx
<PageContent areas="side main">
  <PageArea name="main">
    <Card title="My bundle">I'm in the right!</Card>
  </PageArea>
  <PageArea name="side">
    <Card title="Deploy functions" />
    <Card title="Sync" />
    <Card title="Repository" />
  </PageArea>
</PageContent>
```

### With 2 columns and full width

```jsx
<PageContent areas="side main" fill>
  <PageArea name="main">
    <Card title="My bundle" />
  </PageArea>
  <PageArea name="side">
    <Card title="Deploy functions" />
    <Card title="Sync" />
    <Card title="Repository" />
  </PageArea>
</PageContent>
```

### With 2 columns and custom padding

```jsx
<PageContent areas="side main" padding="small">
  <PageArea name="main">
    <Card title="My bundle" />
  </PageArea>
  <PageArea name="side">
    <Card title="Deploy functions" />
    <Card title="Sync" />
    <Card title="Repository" />
  </PageArea>
</PageContent>
```

### With no padding

```jsx
<PageContent noPadding fill>
  <Card title="My bundle" />
</PageContent>
```

### Inside tabs

```jsx
const Overview = () => (
  <PageContent areas="side main" fill>
    <PageArea name="main">
      <Card title="My bundle" />
    </PageArea>
    <PageArea name="side">
      <Card title="Deploy functions" />
      <Card title="Sync" />
      <Card title="Repository" />
    </PageArea>
  </PageContent>
)
;<Page title="Bundle detail" compactHeader tabs={[{ name: "overview", children: <Overview /> }]} />
```
