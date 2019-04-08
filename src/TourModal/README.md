# Main Screen

```jsx
import * as React from "react"
import { TourModal, Button, Title, Body, Icon } from "@operational/components"

const MyComponent = () => {
  const [isTourRunning, setIsTourRunning] = React.useState(false)

  return isTourRunning ? (
    <TourModal
      center
      image={<Icon size={70} name="Contiamo" />}
      onQuit={() => setIsTourRunning(false)}
      onContinue={() => {
        alert("Just kidding!")
        setIsTourRunning(false)
      }}
    >
      <Title>Hi and welcome to the Contiamo Data Hub,</Title>
      <Body>
        we would like to get you started with a quick walkthrough. We promise that it will only take two minutes.
      </Body>
      <Body>The goal is that you understand these core concepts:</Body>
      <Body>In the next screens we will look at each of them briefly.</Body>
    </TourModal>
  ) : (
    <Button onClick={() => setIsTourRunning(true)}>View Full Example</Button>
  )
}

;<MyComponent />
```

# Supporting Screen

```jsx
import * as React from "react"
import { TourModal, Button, Title, Body } from "@operational/components"

const MyComponent = () => {
  const [isTourRunning, setIsTourRunning] = React.useState(false)

  return isTourRunning ? (
    <TourModal onQuit={() => setIsTourRunning(false)} onContinue={() => alert("Just kidding!")}>
      <Title>Schemas</Title>
      <Body>
        A Schema is an abstracted view of data from the underlying physical data sources. You can think of it as a
        virtual database.
      </Body>

      <Body>
        You can combine data from multiple sources and can transform it into the right representation for your use case.
      </Body>

      <Body>
        Once you have created a Schema, you can run <b>Queries</b> against it.
      </Body>
    </TourModal>
  ) : (
    <Button onClick={() => setIsTourRunning(true)}>View Compact Example</Button>
  )
}

;<MyComponent />
```
