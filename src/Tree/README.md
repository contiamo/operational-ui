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
          initiallyOpen: true,
          childNodes: [
            {
              label: "City",
              tag: "D",
              disabled: true,
              childNodes: [],
            },
            {
              label: "County",
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
<Tree
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
              label: "County",
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

### Reordering

Tree items can be reordered using drag-and-drop. For this feature, we recommend using [react-beautiful-dnd]() from our friends at [Atlassian]() since we use it internally. Optionally, remove the `draggable` prop on the Tree component and add your own `onDragStart|End|...` properties to child nodes if you'd like to use native HTML drag/drop features.

```jsx
initialState = {
  courses: ["Appetizer", "Soup", "Spaghetti", "Cake"],
}

const reorder = (result, startIndex, endIndex) => {
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const remove = i => list => list.filter((_, j) => i !== j)

const { DragDropContext } = require("react-beautiful-dnd")

;<DragDropContext
  onDragEnd={result => setState({ courses: reorder(state.courses, result.source.index, result.destination.index) })}
>
  <Tree
    draggable
    trees={state.courses.map(course => ({
      tag: "C",
      label: course,
    }))}
  />
</DragDropContext>
```
