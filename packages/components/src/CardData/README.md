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
;<CardData title="Details" data={myData} titleFormatter={title => title.toUppercase()} />
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

### With `pick`

```jsx
// const myData = {
//   deployedSha: "oiuhaeg",
//   deployed: "last Friday",
//   updated: "tomorrow",
//   repo: "https://git.com/hellp.git",
// }
// ;<CardData
//   title="Details"
//   data={myData}
//   pick=["repo", "deployed"]
//   valueFormatters={{
//     deployedSha: val => "******",
//     repo: val => val.split(".com")[1],
//   }}
// />
```
