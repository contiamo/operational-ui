Cards are used to group and lay out content on the interface - in fact, non-scrolling interfaces with a number of cards laid out in a grid are the most common use-cases of this project.

### Usage

Simply add any content inside the card.

```jsx
<Card>
  <p>Here is a bare card with custom padding.</p>
  <img alt="Cat" src="https://images.unsplash.com/photo-1491485880348-85d48a9e5312?w=500" />
</Card>
```

### With title & action

```jsx
<Card
  title="Card title"
  action={() => (
    <>
      More details: <a href="#card">click here</a>{" "}
    </>
  )}
>
  <p>Here is a bare card with custom padding.</p>
  <img alt="Cat" src="https://images.unsplash.com/photo-1491485880348-85d48a9e5312?w=500" />
</Card>
```

### With data and title

```jsx
const myData = {
  deployedSha: "oiuhaeg",
  deployed: "last Friday",
  updated: "tomorrow",
  repo: "https://git.com/hello.git",
}
;<Card data={myData} title="Details" />
```

### With a title formatter

```jsx
const myData = {
  deployedSha: "oiuhaeg",
  deployed: "last Friday",
  updated: "tomorrow",
  repo: "https://git.com/hello.git",
}
;<Card title="Details" data={myData} keyFormatter={title => `-- ${title} --`} />
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
  repo: "https://git.com/hello.git",
  status: "deployed",
}
;<Card
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
  repo: "https://git.com/hello.git",
}
;<Card
  title="Details"
  data={myData}
  keys={["repo", "deployed"]}
  valueFormatters={{
    deployedSha: val => "******",
    repo: val => val.split(".com")[1],
  }}
/>
```
