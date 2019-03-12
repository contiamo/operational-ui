Groups are little bits of content that group relevant data together. They can be [folded](/#!/Foldable).

## Basic Usage

```jsx
import * as React from "react"
import { Group, Autocomplete } from "@operational/components"
;<Group icon="User" iconColor="primary" title="Users">
  <Autocomplete
    value="Hello"
    onChange={() => console.log("changed")}
    onResultClick={() => alert("You clicked stuff")}
    placeholder="Search for users..."
    fullWidth
  />
</Group>
```
