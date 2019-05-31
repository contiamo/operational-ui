## Accordion

Accordion component implemented (mostly) according to [WAI-ARIA specification](https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html). By default takes all available height and divides it between opes sections equally.

### Simple usage

```jsx
import * as React from "react"
import { Accordion, useAccordionState } from "@operational/components"

const MyComponent = () => {
  const [sections, onToggle] = useAccordionState([
    {
      key: 1,
      title: "Section 1",
      expanded: true,
      content: () => (
        <>
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
        </>
      ),
    },
    {
      key: 2,
      title: "Section 2",
      expanded: false,
      content: () => <>Content 2</>,
    },
    {
      key: 3,
      title: "Section 3",
      expanded: false,
      content: () => <>Content 3</>,
    },
  ])

  return (
    <div style={{ height: 400 }}>
      <Accordion sections={sections} onToggle={onToggle} />
    </div>
  )
}

;<MyComponent />
```
