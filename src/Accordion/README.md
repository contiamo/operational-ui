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
          {() => (
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
          )}
        </AccordionSection>
        <AccordionSection title="Section 2">Content 2</AccordionSection>
        <AccordionSection title="Section 3">Content 3</AccordionSection>
      </Accordion>
    </div>
  )
}

;<MyComponent />
```
