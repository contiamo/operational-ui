The way to give more structure to your page

### Usage

In this case `PageArea` is implicit

```jsx
import * as React from "react"
import { PageContent, Card } from "@operational/components"
;<PageContent>
  <Card title="Bundles" />
</PageContent>
```

### With 2 columns

```jsx
import * as React from "react"
import { PageContent, PageArea, Card } from "@operational/components"
;<PageContent areas="main side">
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
import * as React from "react"
import { PageContent, PageArea, Card } from "@operational/components"
;<PageContent areas="side main">
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
import * as React from "react"
import { PageContent, PageArea, Card } from "@operational/components"
;<PageContent areas="side main" fill>
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
import * as React from "react"
import { PageContent, PageArea, Card } from "@operational/components"
;<PageContent areas="side main" padding="small">
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
import * as React from "react"
import { PageContent, Card } from "@operational/components"
;<PageContent noPadding fill>
  <Card title="My bundle" />
</PageContent>
```

### Inside tabs

```jsx
import * as React from "react"
import { PageContent, Page, PageArea, Card } from "@operational/components"

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
;<Page title="Bundle detail" tabs={[{ name: "overview", children: <Overview /> }]} />
```
