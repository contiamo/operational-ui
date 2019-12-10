Specialized input for advanced search ux.

### Simple usage

```jsx
import * as React from "react"
import { SearchInput } from "@operational/components"

const MyComponent = () => {
  const [search, setSearch] = React.useState("")

  return (
    <SearchInput
      value={search}
      placeholder="Search for data…"
      onChange={values => {
        setSearch(values.search)
      }}
      onClear={() => setSearch("")}
    />
  )
}

;<MyComponent />
```

### With categories

```jsx
import * as React from "react"
import { SearchInput } from "@operational/components"

const MyComponent = () => {
  const [search, setSearch] = React.useState("")
  const [category, setCategory] = React.useState("all")

  return (
    <SearchInput
      value={search}
      placeholder="Search for data…"
      onChange={values => {
        setSearch(values.search)
        setCategory(values.category)
      }}
      category={category}
      categories={["all", "datasource", "table"]}
      onClear={() => {
        setSearch("")
        setCategory("all")
      }}
    />
  )
}

;<MyComponent />
```
