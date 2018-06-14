Tables simply render a semantic HTML table structure based on raw data.

### Usage

```js
<Table columns={["Name", "Title"]} rows={[["Max", "Carpenter"], ["Moritz", "Baker"]]} />
```

### With external data to format

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
  columns={["", "Name", "Last updated", "Tags", "Collaborators"]}
  rows={data.map(item => [
    <Icon name="Box" color="info" />,
    item.name,
    item.lastUpdated,
    item.tags.map((tag, i) => <Chip key={i}>{tag}</Chip>),
    <AvatarGroup avatars={item.collaborators} />,
  ])}
  onRowClick={(row, i) => console.log({ row, i })}
  rowActionName="view details"
/>
```

### With \_\_experimentalRowActions

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
  columns={["", "Name", "Last updated", "Tags", "Collaborators"]}
  rows={data.map(item => [
    <Icon name="Box" color="info" />,
    item.name,
    item.lastUpdated,
    item.tags.map((tag, i) => <Chip key={i}>{tag}</Chip>),
    <AvatarGroup avatars={item.collaborators} />,
  ])}
  onRowClick={(row, i) => console.log({ row, i })}
  __experimentalRowActions={data.map(item => (
    <>
      <Button color="info">details</Button>
      <Button color="error">delete</Button>
    </>
  ))}
/>
```

### Without data

```jsx
;<Table columns={["", "Name", "Last updated", "Tags", "Collaborators"]} rows={[]} />
```
