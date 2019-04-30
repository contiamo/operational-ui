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

### With react-beautiful-dnd

This tree component have `Droppable` and `Draggable` implemented from [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd/).

To offer the most flexibility as possible in your drag & drop implementation, we are just spreading `draggableProps` and `droppableProps`.

```js
import * as React from "react"
import { Button, Card, Tree, Title } from "@operational/components"
import { DragDropContext } from "react-beautiful-dnd"

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const getMessage = item => {
  switch (item) {
    case "Dough":
      return "Always a good start!"
    case "Jalapeño":
      return "Hot! 🌶"
    case "Pineapples":
      return "Really?!"
    case "Cheese":
      return "Oh yeah! 😎"
    default:
      return "Yum!"
  }
}
const PlaceHolder = ({ isDraggingOver, draggingOverWith }) => (
  <div style={{ minHeight: 30, border: "1px dashed gray", padding: 8, borderRadius: 3 }}>
    {isDraggingOver ? getMessage(draggingOverWith) : "Drag your stuff here"}
  </div>
)

const PizzaMaker = () => {
  const [inventory, setInventory] = React.useState([
    "Cheese",
    "Pepperoni",
    "Dough",
    "Mozzarella",
    "Tomato sauce",
    "Flour",
    "Pineapples",
    "Jalapeño",
    "Artichokes",
    "Cauliflower",
    "Crushed red pepper",
    "Blue cheese",
    "Garlic",
    "Olive Oil",
    "Beef",
    "Pork",
  ])
  const [ingredients, setIngredients] = React.useState([])

  const onDragEnd = React.useCallback(result => {
    if (result.destination) {
      switch (result.destination.droppableId) {
        case "inventory":
          if (result.source.droppableId === "inventory") {
            // reorder
            setInventory(prev => reorder(prev, result.source.index, result.destination.index))
          } else {
            // ingredients -> inventory
            setIngredients(prev => prev.filter(i => i !== result.draggableId))
            setInventory(prev => [
              ...prev.slice(0, result.destination.index),
              result.draggableId,
              ...prev.slice(result.destination.index),
            ])
          }
          break
        case "ingredients":
          if (result.source.droppableId === "ingredients") {
            // reorder
            setIngredients(prev => reorder(prev, result.source.index, result.destination.index))
          } else {
            // inventory -> ingredients
            setInventory(prev => prev.filter(i => i != result.draggableId))
            setIngredients(prev => [
              ...prev.slice(0, result.destination.index),
              result.draggableId,
              ...prev.slice(result.destination.index),
            ])
          }
          break
      }
    }
  }, [])

  const cook = React.useCallback(() => {
    if (ingredients.includes("Mozzarella")) {
      alert("What an amazing pizza!")
    } else if (ingredients.includes("Pineapples")) {
      alert("Why are you doing this to a pizza?!")
    } else if (ingredients.includes("Jalapeño")) {
      alert("Tasty!")
    } else {
      alert("Not bad ^^")
    }
  })

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Title>Let's make a pizza!</Title>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", grgridGap: 8, marginTop: 8 }}>
        <Card title="Inventory">
          <Tree
            droppableProps={{ droppableId: "inventory" }}
            trees={inventory.map(item => ({
              key: item,
              label: item,
              draggableProps: { draggableId: item },
            }))}
            placeholder={PlaceHolder}
          />
        </Card>
        <Card title="Ingredients">
          <Tree
            droppableProps={{ droppableId: "ingredients" }}
            trees={ingredients.map(item => ({
              key: item,
              label: item,
              draggableProps: { draggableId: item },
            }))}
            placeholder={PlaceHolder}
          />
        </Card>
        <Button fullWidth color="primary" onClick={cook} disabled={ingredients.length === 0}>
          Cook! 🍕
        </Button>
      </div>
    </DragDropContext>
  )
}
;<PizzaMaker />
```
