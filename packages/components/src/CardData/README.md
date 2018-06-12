A simple card abstraction to display some data (object).

### Usage

```jsx
const myData = {
  deployedSha: "oiuhaeg",
  deployed: "last Friday",
  updated: "tomorrow", // 🤔
  repo: "https://git.com/hellp.git",
}
;<CardData data={myData} title="Details" />
```

### With a title formatter

```jsx
const myData = {
  deployedSha: "oiuhaeg",
  deployed: "last Friday",
  updated: "tomorrow",
  repo: "https://git.com/hellp.git",
}
;<CardData title="Details" data={myData} keyFormatter={title => title.toUpperCase()} />
```

### With value formatters

```jsx
const myData = {
  deployedSha: "oiuhaeg",
  deployed: "last Friday",
  updated: "tomorrow",
  repo: "https://git.com/hellp.git",
}
;<CardData
  title="Details"
  data={myData}
  valueFormatters={{
    deployedSha: val => "******",
    repo: val => val.split(".com")[1],
  }}
/>
```

### With `keys`

```jsx
const myData = {
  deployedSha: "oiuhaeg",
  deployed: "last Friday",
  updated: "tomorrow",
  repo: "https://git.com/hellp.git",
}
;<CardData
  title="Details"
  data={myData}
  keys={["repo", "deployed"]}
  valueFormatters={{
    deployedSha: val => "******",
    repo: val => val.split(".com")[1],
  }}
/>
```
