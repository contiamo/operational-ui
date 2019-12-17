Pagination is a predictable and expressive way to handle datasets that don't fit in a single view. They are a straightforward alternative to infinite scrolling and lazy-loading interface elements, which take a long time to get cross-browser effective and accessible. This page describes how to use Operational UI's paginators.

## Basic Usage

```jsx
import * as React from "react"
import { Paginator } from "@operational/components"

const MyComponent = () => {
  const [page, setPage] = React.useState(1)
  return <Paginator itemCount={258} itemsPerPage={50} page={page} onChange={setPage} />
}

;<MyComponent />
```

## Compact mode

```jsx
import * as React from "react"
import { Paginator } from "@operational/components"

const MyComponent = () => {
  const [page, setPage] = React.useState(1)
  return <Paginator compact itemCount={2} itemsPerPage={1} page={page} onChange={setPage} />
}

;<MyComponent />
```
