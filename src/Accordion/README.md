### Simple usage

```jsx
import * as React from "react"
import { Accordion, AccordionSection } from "@operational/components"

const MyComponent = () => {
  // const [isCollapsed, setIsCollapsed] = React.useState(true)

  return (
    <div style={{ height: 400 }}>
      <Accordion>
        <AccordionSection title="Section 1" id="1" expanded>
          Content 1<br />
          Content 1<br />
          Content 1<br />
          Content 1<br />
          Content 1<br />
          Content 1<br />
          Content 1<br />
          Content 1<br />
          Content 1<br />
          Content 1<br />
          Content 1<br />
          Content 1<br />
          Content 1<br />
        </AccordionSection>
        <AccordionSection title="Section 2" id="2">
          Content 2
        </AccordionSection>
      </Accordion>
    </div>
  )
}

;<MyComponent />
```
