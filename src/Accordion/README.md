## Accordion

Accordion component impelmented (mostly) according to [WAI-ARIA specification](https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html). By default takes all available hegith and divides it between opes sections equally.

### Simple usage

```jsx
import * as React from "react"
import { Accordion, AccordionSection } from "@operational/components"

const MyComponent = () => (
  <div style={{ height: 400 }}>
    <Accordion>
      <AccordionSection title="Section 1" expanded>
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

;<MyComponent />
```
