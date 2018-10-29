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
          draggable: true,
          onDragStart: ev => {
            ev.dataTransfer.effectAllowed = "move"
          },
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

Tree items can be reordered using drag-and-drop. The API for this feature is low-level and assumes that the tree nodes are generated from data available in a different shape in state, making it dangerous and error-prone to update based on a readily reordered set of nodes.

Instead, it provides the paths of the source and target where the nodes are inserted. The client would have to do the actual state update themselves, which is fairly straightforward for a simple flat list, and doable for more complicated use-cases (beware of edge cases).

In the future, this library may provide helpers or sample code to deal with reordering with less boilerplate.

```jsx
initialState = {
  courses: ["Appetizer", "Soup", "Spaghetti", "Cake"],
}

const remove = i => list => list.filter((_, j) => i !== j)
;<Tree
  trees={state.courses.map(course => ({
    tag: "C",
    label: course,
    childNodes: [],
  }))}
  onReorder={(source, target) => {
    const sourceIndex = source[0]
    const targetIndex = target[0]

    /**
     * The following logic swaps the entries at source and target, catering to an edge case where the element is dragged
     * to the end of the list. This logic is for illustration purposes only, and needs a bit more work in order to replicate
     * similar behavior in tools like Photoshop.
     */
    let newCourses

    if (targetIndex === state.courses.length) {
      newCourses = [...remove(sourceIndex)(state.courses), state.courses[sourceIndex]]
    } else {
      newCourses = [...state.courses]
      const swap = newCourses[sourceIndex]
      newCourses[sourceIndex] = newCourses[targetIndex]
      newCourses[targetIndex] = swap
    }

    setState(() => ({ courses: newCourses }))
  }}
/>
```
