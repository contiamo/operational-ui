Specialized input for advanced search UX.

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
  const [category, setCategory] = React.useState("All")

  return (
    <div style={{ minHeight: 300 }}>
      <SearchInput
        value={search}
        placeholder="Search for data…"
        onChange={values => {
          setSearch(values.search)
          setCategory(values.category)
        }}
        category={category}
        categories={["All", "Datasource", "Table"]}
        onClear={() => {
          setSearch("")
          setCategory("All")
        }}
      />
    </div>
  )
}

;<MyComponent />
```

### In sidebar (with readonly & condensed)

```jsx
import * as React from "react"
import { SearchInput } from "@operational/components"

const MyComponent = () => {
  const [search, setSearch] = React.useState("")
  const [readonly, setReadonly] = React.useState(true)

  return (
    <div style={{ width: 200 }}>
      <SearchInput
        value={readonly ? "Filtered by search" : search}
        placeholder="Search for data…"
        readonly={readonly}
        condensed
        onChange={values => {
          setSearch(values.search)
        }}
        onClear={() => {
          setSearch("")
          setReadonly(false)
        }}
      />
    </div>
  )
}

;<MyComponent />
```
