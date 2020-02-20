### In an Accordion

```jsx
import * as React from "react"
import constants from "../utils/constants"

import {
  ExternalIcon,
  Accordion,
  Tree,
  AccordionSection,
  VirtualIcon,
  PhysicalTableIcon,
  WandIcon,
  SchemaIcon,
  AddIcon,
  DimensionIcon,
  WarningIcon,
  UserIcon,
} from "@operational/components"

import Spinner from "../Spinner/Spinner"

const MyComponent = () => {
  const [expanded, setExpanded] = React.useState([true])
  const onToggle = index => {
    const newExpanded = [...expanded]
    newExpanded[index] = !newExpanded[index]
    setExpanded(newExpanded)
  }

  return (
    <div style={{ height: 550 }}>
      <Accordion expanded={expanded} onToggle={onToggle}>
        <AccordionSection
          title={
            <div>
              <ExternalIcon size={12} color="primary" left />
              My Tree
            </div>
          }
        >
          <Tree
            trees={[
              {
                label: "Store",
                strong: true,
                icon: VirtualIcon,
                initiallyOpen: true,
                childNodes: [
                  {
                    label: "Region",
                    icon: PhysicalTableIcon,
                    initiallyOpen: true,
                    childNodes: [
                      {
                        label: "City",
                        fontSize: constants.font.size.tiny,
                        tag: "C",
                        disabled: true,
                        childNodes: [],
                      },
                      {
                        label: "Country",
                        fontSize: constants.font.size.tiny,
                        tagColor: "primary",
                        tag: "D",
                        childNodes: [],
                      },
                    ],
                  },
                ],
              },
              {
                label: "Legal Entity",
                strong: true,
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
                    tagColor: "#2C363F",
                    childNodes: [],
                  },
                ],
              },
              {
                label: "db_01",
                strong: true,
                icon: VirtualIcon,
                initiallyOpen: true,
                childNodes: [
                  {
                    label: "Tables",
                    icon: PhysicalTableIcon,
                    initiallyOpen: true,
                    childNodes: [
                      {
                        icon: AddIcon,
                        label: "Add table",
                        fontSize: constants.font.size.tiny,
                        strong: true,
                        iconColor: "primary",
                        fontColor: "primary",
                      },
                      {
                        label: "loading...",
                        icon: Spinner,
                        iconColor: "primary",
                        fontSize: constants.font.size.tiny,
                        emphasized: true,
                      },
                    ],
                  },
                  {
                    label: "Functions",
                    icon: WandIcon,
                    initiallyOpen: true,
                    childNodes: [
                      {
                        label: "None",
                        fontSize: constants.font.size.tiny,
                        emphasized: true,
                      },
                    ],
                  },
                  {
                    label: "Structures",
                    icon: SchemaIcon,
                    initiallyOpen: true,
                    childNodes: [
                      {
                        label: "Load more...",
                        fontColor: "primary",
                      },
                    ],
                  },
                ],
              },
              {
                label: "db_hr_2019",
                strong: true,
                monospace: true,
                icon: UserIcon,
                initiallyOpen: true,
                childNodes: [
                  {
                    label: "Region",
                    icon: PhysicalTableIcon,
                    monospace: true,
                  },
                  {
                    label: "loading...",
                    monospace: true,
                    icon: Spinner,
                    iconColor: "primary",
                  },
                ],
              },
              {
                label: "db_marketing",
                strong: true,
                icon: UserIcon,
                initiallyOpen: true,
                childNodes: [
                  {
                    label: "Region",
                    icon: PhysicalTableIcon,
                  },
                  {
                    label: "loading...",
                    icon: Spinner,
                    iconColor: "primary",
                  },
                ],
              },
              {
                label: "db_error_01",
                strong: true,
                icon: DimensionIcon,
                initiallyOpen: true,
                childNodes: [
                  {
                    label: "Load failed. Click to retry.",
                    icon: WarningIcon,
                    iconColor: "error",
                    emphasized: true,
                  },
                ],
              },
              {
                label: "Load failed. Click to retry.",
                icon: WarningIcon,
                iconColor: "error",
                emphasized: true,
              },
            ]}
          />
        </AccordionSection>
      </Accordion>
    </div>
  )
}

;<MyComponent />
```

<!-- ### Usage

The tree component renders a tree structure with collapsable nodes in a filetree-like design. Defined items in the tree can have a custom click and a context-click handler.

The tree component is also keyboard accessible:

- <kbd>Tab</kbd> navigates to the next node
- <kbd>Shift</kbd>+<kbd>Tab</kbd> navigates to the previous node
- <kbd>Space</kbd> triggers the `onClick` handler, usually expanding a node
- <kbd>Alt</kbd>+<kbd>Enter</kbd> triggers the right-click action

Try it yourself!

- "Country" has a click/<kbd>Space</kbd> handler
- "Country" has a right-click/<kbd>Alt</kbd>+<kbd>Enter</kbd> handler

```jsx
import * as React from "react"
import { Tree, OlapIcon, styled } from "@operational/components"

const Wrapper = styled.div`
  font-family: monospace;
`

;<Wrapper>
  <Tree
    trees={[
      {
        label: "ERP",
        tag: "OR",
        childNodes: [
          {
            label: "Region",
            initiallyOpen: true,
            childNodes: [
              {
                label: "City",
                icon: OlapIcon,
                icontagColor: "primary",
                disabled: true,
                childNodes: [],
              },
              {
                label: "Country",
                tagColor: "primary",
                onClick: () => alert("country was clicked"),
                onContextMenu: () => alert("country was right-clicked"),
                icon: OlapIcon,
                childNodes: [],
              },
            ],
          },
        ],
      },
      {
        label: "Legal Entity",
        tag: "D2",
        initiallyOpen: true,
        childNodes: [
          {
            label: "Limited Liability Company",
            icon: OlapIcon,
            childNodes: [],
          },
          {
            label: "Inc.",
            icon: OlapIcon,
            tagColor: "#2C363F",
            childNodes: [],
          },
        ],
      },
    ]}
  />
</Wrapper>
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
              tagColor: "primary",
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
          tagColor: "#2C363F",
          childNodes: [],
        },
      ],
    },
  ]}
/>
```

### With higlighted search

```jsx
import * as React from "react"
import { Tree, Input } from "@operational/components"
const Example = () => {
  const [filter, setFilter] = React.useState("liability")

  return (
    <>
      <Input value={filter} onChange={setFilter} label="Search" />
      <br />
      <Tree
        searchWords={filter.split(" ")}
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
                    tagColor: "primary",
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
                tagColor: "#2C363F",
                childNodes: [],
              },
            ],
          },
        ]}
      />
    </>
  )
}

;<Example />
```

### With custom actions

```jsx
import * as React from "react"
import { Tree, DotMenuIcon, PlusIcon } from "@operational/components"
const Example = () => {
  return (
    <>
      <Tree
        trees={[
          {
            label: "Store",
            initiallyOpen: true,
            actions: <DotMenuIcon size={12} tabIndex={-1} />,
            childNodes: [
              {
                label: "Region",
                actions: (
                  <DotMenuIcon
                    size={20}
                    tabIndex={-1}
                    onClick={e => {
                      e.stopPropagation()
                      console.log("menu")
                    }}
                  />
                ),
                initiallyOpen: true,
                childNodes: [
                  {
                    label: "City",
                    tag: "D",
                    disabled: true,
                    actions: [
                      <PlusIcon size={20} tabIndex={-1} onClick={() => alert("plus")} key="add" />,
                      <DotMenuIcon size={20} tabIndex={-1} onClick={() => alert("menu")} key="more" />,
                    ],
                    childNodes: [],
                  },
                  {
                    label: `Lorem superposés valise pourparlers rêver chiots rendez-vous naissance Eiffel myrtille. Grèves Arc de Triomphe encore pourquoi sentiments baguette pédiluve une projet sentiments saperlipopette vachement le. Brume éphémère baguette Bordeaux en fait sommet avoir minitel.

Nous avoir parole la nous moussant. Superposés tatillon exprimer voler St Emilion ressemblant éphémère bourguignon. Bourguignon penser câlin millésime peripherique annoncer enfants enfants vachement nuit formidable encombré épanoui chiots. Arc truc cacatoès lorem flâner.`,
                    tagColor: "primary",
                    actions: [
                      <PlusIcon size={20} tabIndex={-1} onClick={() => alert("plus")} key="add" />,
                      <DotMenuIcon size={20} tabIndex={-1} onClick={() => alert("menu")} key="more" />,
                    ],
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
                label: "Limited Liability Company",
                tag: "D",
                childNodes: [],
              },
              {
                label: "Inc.",
                tag: "D",
                tagColor: "#2C363F",
                childNodes: [],
              },
            ],
          },
        ]}
      />
    </>
  )
}

;<Example />
```

### With react-beautiful-dnd

This tree component have `Droppable` and `Draggable` implemented from [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd/).

To offer the most flexibility as possible in your drag & drop implementation, we are just spreading `draggableProps` and `droppableProps`.

FIXME: https://github.com/styleguidist/react-styleguidist/issues/1278

```jsx
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
  const [ingredients, setIngredients] = React.useState<string[]>([])

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
  }, [])

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
``` -->
