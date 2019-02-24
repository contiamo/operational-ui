Tables simply render a semantic HTML table structure based on raw data.

### Simple usage

You can render a simple use-case of the table by specifying a list of records and supplying the columns as a list of strings which would serve both as column heading and access keys for fields.

```jsx
<Table
  data={[{ name: "Max", profession: "Carpenter" }, { name: "Moritz", profession: "Baker" }]}
  columns={["name", "profession"]}
/>
```

### With Fixed Layout

Tables perform better with a forced fixed layout, since the browser doesn't have to recalculate positions depending on the contents of the table. Here's what the same table looks like with a fixed layout.

```jsx
<Table
  fixedLayout
  data={[{ name: "Max", profession: "Carpenter" }, { name: "Moritz", profession: "Baker" }]}
  columns={["name", "profession"]}
/>
```

### Simple Usage without Header

```jsx
<Table
  headless
  data={[{ name: "Max", profession: "Carpenter" }, { name: "Moritz", profession: "Baker" }]}
  columns={["name", "profession"]}
/>
```

While this approach is convenient, it is not recommended because it makes it too easy to re-use record keys as table headings, and adds a strong coupling between data and view concerns.

We suggest taking the time to think about the best way to describe the data fields and then specifying it explicitly as column headers. The following, slightly more verbose version of the API demonstrates how this can be achieved:

### With explicit data formatting

In this case, simple functions taking an individual record as an argument specify how cells should be rendered in a given column:

```jsx
const data = [
  {
    name: "Mega Deal Dev",
    lastUpdated: "2018-06-06",
    tags: ["agent-view", "production"],
    collaborators: [
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
    ],
  },
  {
    name: "Mega Deal Dev",
    lastUpdated: "2018-06-06",
    tags: ["agent-view", "production"],
    collaborators: [
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
    ],
  },
  {
    name: "Toy Bundle",
    lastUpdated: "2018-06-06",
    tags: ["agent-view", "production"],
    collaborators: [
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
    ],
  },
]
;<Table
  data={data}
  columns={[
    { heading: "", cell: dataEntry => <Icon name="Box" color="info" /> },
    { heading: "Name", cell: dataEntry => dataEntry.name },
    { heading: "Last updated", cell: dataEntry => dataEntry.lastUpdated },
    { heading: "Tags", cell: dataEntry => dataEntry.tags.map((tag, tagIndex) => <Chip key={tagIndex}>{tag}</Chip>) },
    { heading: "Collaborators", cell: dataEntry => <AvatarGroup avatars={dataEntry.collaborators} /> },
  ]}
  onRowClick={(dataEntry, i) => console.log({ dataEntry, i })}
/>
```

### With custom widths per column

We can customize the look of the table by specifying a `width` property on certain columns.

```jsx
const data = [
  {
    name: "Mega Deal Dev",
    lastUpdated: "2018-06-06",
    tags: ["agent-view", "production"],
    collaborators: [
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
    ],
  },
  {
    name: "Mega Deal Dev",
    lastUpdated: "2018-06-06",
    tags: ["agent-view", "production"],
    collaborators: [
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
    ],
  },
  {
    name: "Toy Bundle",
    lastUpdated: "2018-06-06",
    tags: ["agent-view", "production"],
    collaborators: [
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
    ],
  },
]
;<Table
  data={data}
  columns={[
    { heading: "", cell: dataEntry => <Icon name="Box" color="info" /> },
    { heading: "Name", width: 600, cell: dataEntry => dataEntry.name },
    { heading: "Last updated", cell: dataEntry => dataEntry.lastUpdated },
    {
      heading: "Tags",
      width: 100,
      cell: dataEntry => dataEntry.tags.map((tag, tagIndex) => <Chip key={tagIndex}>{tag}</Chip>),
    },
    { heading: "Collaborators", cell: dataEntry => <AvatarGroup avatars={dataEntry.collaborators} /> },
  ]}
  onRowClick={(dataEntry, i) => console.log({ dataEntry, i })}
/>
```

### With icons

```jsx
const data = [
  {
    name: "Mega Deal Dev",
    lastUpdated: "2018-06-06",
    tags: ["agent-view", "production"],
  },
  {
    name: "Mega Deal Dev",
    lastUpdated: "2018-06-06",
    tags: ["agent-view", "production"],
  },
  {
    name: "Toy Bundle",
    lastUpdated: "2018-06-06",
    tags: ["agent-view", "production"],
  },
]
;<Table
  data={data}
  icon={dataEntry => "Building"}
  columns={[
    { heading: "", cell: dataEntry => <Icon name="Box" color="info" /> },
    { heading: "Name", cell: dataEntry => dataEntry.name },
    { heading: "Last updated", cell: dataEntry => dataEntry.lastUpdated },
    { heading: "Tags", cell: dataEntry => dataEntry.tags.map((tag, tagIndex) => <Chip key={tagIndex}>{tag}</Chip>) },
  ]}
  onRowClick={(dataEntry, i) => console.log({ dataEntry, i })}
/>
```

### With default row action

```jsx
const data = [
  {
    name: "Mega Deal Dev",
    lastUpdated: "2018-06-06",
    tags: ["agent-view", "production"],
  },
  {
    name: "Mega Deal Dev",
    lastUpdated: "2018-06-06",
    tags: ["agent-view", "production"],
  },
  {
    name: "Toy Bundle",
    lastUpdated: "2018-06-06",
    tags: ["agent-view", "production"],
  },
]
;<Table
  data={data}
  icon={dataEntry => "Building"}
  iconColor={dataEntry => (dataEntry.name.indexOf("Mega") > -1 ? "primary" : "gray")}
  columns={[
    { heading: "", cell: dataEntry => <Icon name="Box" color="info" /> },
    { heading: "Name", cell: dataEntry => dataEntry.name },
    { heading: "Last updated", cell: dataEntry => dataEntry.lastUpdated },
    { heading: "Tags", cell: dataEntry => dataEntry.tags.map((tag, tagIndex) => <Chip key={tagIndex}>{tag}</Chip>) },
  ]}
  onRowClick={(dataEntry, i) => console.log({ dataEntry, i })}
  rowActionName="View Details"
/>
```

### With row actions

Row actions are specified as a function of an individual record, returning action items conforming to the [ContextMenu](/#ContextMenu) API. The function in the `rowActions` prop can return either the action items as an array or the `ActionMenu` node itself.

```jsx
const data = [
  {
    name: "Mega Deal Dev",
    lastUpdated: "2018-06-06",
    tags: ["agent-view", "production"],
    collaborators: [
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
    ],
  },
  {
    name: "Small deal prod",
    lastUpdated: "2018-06-06",
    tags: ["agent-view", "production"],
    collaborators: [
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
    ],
  },
  {
    name: "Toy Bundle",
    lastUpdated: "2018-06-06",
    tags: ["agent-view", "production"],
    collaborators: [
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
      { photo: "https://graph.facebook.com/775278331/picture", name: "Tejas Kumar" },
    ],
  },
]
;<Table
  data={data}
  columns={[
    { heading: "", cell: dataEntry => <Icon name="Box" color="info" /> },
    { heading: "Name", cell: dataEntry => dataEntry.name },
    { heading: "Last updated", cell: dataEntry => dataEntry.lastUpdated },
    { heading: "Tags", cell: dataEntry => dataEntry.tags.map((tag, tagIndex) => <Chip key={tagIndex}>{tag}</Chip>) },
    { heading: "Collaborators", cell: dataEntry => <AvatarGroup avatars={dataEntry.collaborators} /> },
  ]}
  onRowClick={(dataEntry, dataEntryIndex) => alert("You chose " + dataEntry.name)}
  rowActions={dataEntry => [
    {
      label: "Details",
      onClick: () => {
        alert("Details on " + dataEntry.name)
      },
    },
    {
      label: "Delete",
      onClick: () => {
        alert("Deleting " + dataEntry.name)
      },
    },
  ]}
/>
```

### Without data

Tables render a default empty view if no records are specified.

```jsx
<Table columns={["", "Name", "Last updated", "Tags", "Collaborators"]} data={[]} />
```

### With sorting

Tables can be sorted by custom logic, it's totally up to you to implement the sort logic that you need.

```jsx
import * as React from "react"
import { Table, Chip } from "@operational/components"

const MyComponent = () => {
  const [data, setData] = React.useState([
    { name: "Imogen", tags: ["d3js"] },
    { name: "Tejas", tags: ["lambda"] },
    { name: "Fabien", tags: ["regex"] },
    { name: "Peter", tags: ["webGL"] },
  ])
  const [nameSortOrder, setNameSortOrder] = React.useState(undefined)
  const [tagSortOrder, setTagSortOrder] = React.useState(undefined)

  const sortData = (order, key) => {
    if (key === "name") {
      setData(
        data.sort((a, b) => {
          if (order === "asc") return a.name < b.name ? -1 : 1
          return a.name > b.name ? -1 : 1
        }),
      )
      setNameSortOrder(order)
      setTagSortOrder(undefined)
    } else {
      setData(
        data.sort((a, b) => {
          if (order === "asc") return a.tags[0] < b.tags[0] ? -1 : 1
          return a.tags[0] > b.tags[0] ? -1 : 1
        }),
      )
      setNameSortOrder(undefined)
      setTagSortOrder(order)
    }
  }
  return (
    <Table
      data={data}
      columns={[
        {
          heading: "Name",
          cell: i => i.name,
          sortOrder: nameSortOrder,
          onSortClick: order => sortData(order, "name"),
        },
        {
          heading: "Tags",
          cell: i => i.tags.map(t => <Chip key={t}>{t}</Chip>),
          sortOrder: tagSortOrder,
          onSortClick: order => sortData(order, "tag"),
        },
      ]}
    />
  )
}

;<MyComponent />
```
