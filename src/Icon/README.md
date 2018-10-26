Operational's SVG icon set packaged as a single component.

### Usage

```jsx
<>
  <Icon name="Add" size={36} />
  <Icon name="Function" size={36} />
  <Icon name="Funnel" size={36} color="#00bb00" />
  <Icon name="Bundle" size={36} color="error" />
  <p>And here some brand icons:</p>
  <Icon name="OperationalUI" size={36} />
  <Icon name="Pantheon" size={36} colored />
  <Icon name="Labs" size={36} />
</>
```

#### With margins for content

```jsx
<div style={{ display: "flex", alignItems: "center" }}>
  <Icon name="Add" left /> Play that song!
</div>
```

```jsx
<div style={{ display: "flex", alignItems: "center" }}>
  I'm on the right! <Icon name="Document" right />
</div>
```

### The Icon Set

```jsx
// This import relies on files not exposed by the library, and is used for
// presentation purposes only
const CustomIcons = require("./Icon.Custom")

const icons = Object.keys(CustomIcons)
;<div>
  <Table
    data={icons.sort()}
    columns={[
      { heading: "Name", cell: icon => icon },
      { heading: "Standalone", cell: icon => <Icon name={icon} color="primary" /> },
      {
        heading: "In button",
        cell: icon => (
          <Button color="primary" icon={icon}>
            Button Label
          </Button>
        ),
      },
    ]}
  />
</div>
```
