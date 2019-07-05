Groups are little bits of content that group relevant data together. They can be [folded](/#!/Foldable).

## Basic Usage

```jsx
import * as React from "react"
import { Group, Autocomplete, UserIcon } from "@operational/components"
;<Group icon={UserIcon} iconColor="primary" title="Users">
  <Autocomplete
    value="Hello"
    onChange={() => console.log("changed")}
    onResultClick={() => alert("You clicked stuff")}
    placeholder="Search for users..."
    fullWidth
  />
</Group>
```
