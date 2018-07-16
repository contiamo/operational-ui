The tree component renders a tree structure with collapsable nodes in a filetree-like design.

### Usage

```jsx
<Tree
  trees={[
    {
      label: "Store",
      childNodes: [
        {
          label: "Region",
          childNodes: [
            {
              label: "City",
              tag: "D",
              childNodes: [],
            },
            {
              label: "County",
              tag: "D",
              childNodes: [],
            },
          ],
        },
      ],
    },
    {
      label: "Legal Entity",
      childNodes: [
        {
          label: "LLC",
          tag: "D",
          childNodes: [],
        },
        {
          label: "Inc.",
          tag: "D",
          childNodes: [],
        },
      ],
    },
  ]}
/>
```
