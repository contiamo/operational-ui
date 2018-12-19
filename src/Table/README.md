Tables simply render a semantic HTML table structure based on raw data.

### Simple usage

You can render a simple use-case of the table by specifying a list of records and supplying the columns as a list of strings which would serve both as column heading and access keys for fields.

```js
<Table
  data={[{ name: "Max", profession: "Carpenter" }, { name: "Moritz", profession: "Baker" }]}
  columns={["name", "profession"]}
/>
```

### Simple Usage without Header

```js
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
initialState = {
  data: [
    { name: "Imogen", tags: ["d3js"] },
    { name: "Tejas", tags: ["lambda"] },
    { name: "Fabien", tags: ["regex"] },
    { name: "Peter", tags: ["webGL"] },
  ],
  nameSortedBy: undefined,
}

const sortData = order =>
  setState({
    data: state.data.sort((a, b) => {
      if (order === "asc") return a.name < b.name ? -1 : 1
      return a.name > b.name ? -1 : 1
    }),
    nameSortedBy: order,
  })
;<Table
  data={state.data}
  columns={[
    { heading: "Name", cell: i => i.name, sortOrder: state.nameSortedBy, onSortClick: sortData },
    { heading: "Tags", cell: i => i.tags.map(t => <Chip key={t}>{t}</Chip>) },
  ]}
/>
```
