Top bars are used as lower-level navigation elements for widgets inside applications. They have their own sub-elements such as buttons or select boxes, which it lays out on the left and right with automatically inserted separators.

### Usage

```jsx
import * as React from "react"
import {
  Topbar,
  TopbarSelect,
  TopbarButton,
  TopbarSeparator,
  styled,
  NoIcon,
  UndoIcon,
  RedoIcon,
  SaveIcon,
  PlayIcon,
} from "@operational/components"

const Label = styled("div")`
  padding: 0 8px 0 16px;
  font-weight: bold;
`

const Grid = styled("div")`
  grid-template-columns: auto auto;
  display: grid;
  grid-gap: 20px;
  padding-right: 20px;
`

const [activeFruit, setActiveFruit] = React.useState("apples")

;<Topbar
  left={
    <>
      <Label>Editor</Label>
      <TopbarSeparator />
      <TopbarSelect
        label="Fruit"
        selected={activeFruit}
        items={["apples", "oranges"].map(name => ({ label: name }))}
        onChange={item => setActiveFruit(String(item.label))}
      />
      <TopbarButton icon={NoIcon}>Clear</TopbarButton>
      <TopbarSeparator />
      <TopbarButton icon={UndoIcon}>Undo</TopbarButton>
      <TopbarButton icon={RedoIcon} disabled>
        Redo
      </TopbarButton>
    </>
  }
  right={
    <Grid>
      <TopbarButton flavor="outline" icon={SaveIcon}>
        Save as …
      </TopbarButton>
      <TopbarButton flavor="filled" icon={PlayIcon}>
        View results
      </TopbarButton>
    </Grid>
  }
/>
```
