The tree component renders a tree structure with collapsable nodes in a filetree-like design.

### Usage

```jsx
import * as React from "react"
import { Tree } from "@operational/components"
;<Tree
  trees={[
    {
      label: "Store",
      childNodes: [
        {
          label: "Region",
          initiallyOpen: true,
          childNodes: [
            {
              label: "City",
              tag: "D",
              disabled: true,
              childNodes: [],
            },
            {
              label: "Country",
              color: "primary",
              onClick: () => alert("country was clicked"),
              onRemove: () => alert("node is removed"),
              tag: "D",
              childNodes: [],
            },
          ],
        },
      ],
    },
    {
      label: "Legal Entity",
      initiallyOpen: true,
      childNodes: [
        {
          label: "Limited Liability Company",
          tag: "D",
          childNodes: [],
        },
        {
          label: "Inc.",
          tag: "D",
          color: "#2C363F",
          childNodes: [],
        },
      ],
    },
  ]}
/>
```

### With Highlighting

Certain nodes in the tree can be highlighted like so.

```jsx
import * as React from "react"
import { Tree } from "@operational/components"
;<Tree
  trees={[
    {
      label: "Store",
      highlight: true,
      childNodes: [
        {
          label: "Region",
          initiallyOpen: true,
          childNodes: [
            {
              label: "City",
              tag: "D",
              disabled: true,
              childNodes: [],
            },
            {
              label: "Country",
              color: "primary",
              onRemove: () => {},
              tag: "D",
              childNodes: [],
            },
          ],
        },
      ],
    },
    {
      label: "Legal Entity",
      initiallyOpen: true,
      childNodes: [
        {
          label: "Limited Liability Company",
          tag: "D",
          childNodes: [],
          highlight: true,
        },
        {
          label: "Inc.",
          tag: "D",
          color: "#2C363F",
          childNodes: [],
        },
      ],
    },
  ]}
/>
```
