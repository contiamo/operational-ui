## Accordion

Accordion component implemented (mostly) according to [WAI-ARIA specification](https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html). By default takes all available height and divides it between opes sections equally.

### Simple usage

```jsx
import * as React from "react"
import { Accordion, AccordionSection } from "@operational/components"

const MyComponent = () => {
  const [expanded, setExpanded] = React.useState([true, false, false])
  const onToggle = index => {
    const newExpanded = [...expanded]
    newExpanded[index] = !newExpanded[index]
    setExpanded(newExpanded)
  }
  return (
    <div style={{ height: 400 }}>
      <Accordion expanded={expanded} onToggle={onToggle}>
        <AccordionSection title="Section 1">
          Content 1<br />
          Content 1<br />
          Content 1<br />
          Content 1<br />
          Content 1<br />
          Content 1<br />
          <a href="#">test link</a>
          <br />
          Content 1<br />
          Content 1<br />
          Content 1<br />
          Content 1<br />
          Content 1<br />
          Content 1<br />
          Content 1<br />
        </AccordionSection>
        <AccordionSection title="Section 2">Content 2</AccordionSection>
        <AccordionSection title="Section 3">Content 3</AccordionSection>
      </Accordion>
    </div>
  )
}

;<MyComponent />
```

### With tree

```jsx
import * as React from "react"
import { Accordion, AccordionSection, Tree, OlapIcon } from "@operational/components"

const MyComponent = () => {
  const [expanded, setExpanded] = React.useState([true, false, false])
  const onToggle = index => {
    const newExpanded = [...expanded]
    newExpanded[index] = !newExpanded[index]
    setExpanded(newExpanded)
  }
  return (
    <div style={{ height: 400, width: 200 }}>
      <Accordion expanded={expanded} onToggle={onToggle}>
        <AccordionSection title="Section 1">
          <Tree
            trees={[
              {
                label: "ERP",
                tag: "OR",
                childNodes: [
                  {
                    label: "Region",
                    initiallyOpen: true,
                    onDoubleClick: () => alert("woah you double clicked region amazing"),
                    childNodes: [
                      {
                        label: "City",
                        icon: OlapIcon,
                        iconColor: "primary",
                        disabled: true,
                        childNodes: [],
                      },
                      {
                        label: "Country",
                        color: "primary",
                        onClick: () => alert("country was clicked"),
                        onContextMenu: () => alert("country was right-clicked"),
                        onRemove: () => alert("node is removed"),
                        icon: OlapIcon,
                        childNodes: [],
                      },
                    ],
                  },
                ],
              },
              {
                label: "Legal Entity (with some more text to check overflow)",
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
                    color: "#2C363F",
                    childNodes: [],
                  },
                ],
              },
            ]}
          />
        </AccordionSection>
        <AccordionSection title="Section 2">Content 2</AccordionSection>
        <AccordionSection title="Section 3">Content 3</AccordionSection>
      </Accordion>
    </div>
  )
}

;<MyComponent />
```
