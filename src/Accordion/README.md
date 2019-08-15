## Accordion

Accordion component implemented (mostly) according to [WAI-ARIA specification](https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html). By default takes all available height and divides it between opes sections equally.

### Simple usage

```jsx
import * as React from "react"
import { Accordion, AccordionSection, AddIcon, styled } from "@operational/components"

const MyComponent = () => {
  const [expanded, setExpanded] = React.useState([true, false, false])
  const onToggle = index => {
    const newExpanded = [...expanded]
    newExpanded[index] = !newExpanded[index]
    setExpanded(newExpanded)
  }

  const Title = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-right: 8px;
    align-items: center;
  `

  return (
    <div style={{ height: 400 }}>
      <Accordion expanded={expanded} onToggle={onToggle}>
        <AccordionSection
          title={
            <Title>
              Section 1
              <AddIcon
                size={16}
                color="primary"
                onClick={e => {
                  e.stopPropagation()
                  alert("Add")
                }}
              />
            </Title>
          }
        >
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
