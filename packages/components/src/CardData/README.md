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
;<CardData title="Details" data={myData} keyFormatter={title => `-- ${title} --`} />
```

### With value formatters

```jsx
const DeployedStatus = ({ deployed }) => (
  <div
    style={{
      position: "relative",
      display: "inline-block",
      marginRight: 7,
      borderRadius: "50%",
      width: 8,
      height: 8,
      background: deployed ? "green" : "red",
    }}
  />
)

const myData = {
  deployedSha: "oiuhaeg",
  deployed: "last Friday",
  updated: "tomorrow",
  repo: "https://git.com/hellp.git",
  status: "deployed",
}
;<CardData
  title="Details"
  data={myData}
  valueFormatters={{
    deployedSha: val => "******",
    repo: val => val.split(".com")[1],
    status: val => (
      <div>
        <DeployedStatus deployed={val === "deployed"} />
        {val}
      </div>
    ),
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
