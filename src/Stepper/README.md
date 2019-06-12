This component allows users to flow through a process in a more funnel/wizard style manner.

## Modal test

```jsx
import * as React from "react"
import { TestComp } from "../Stepper/Stepper.tsx"
// import ControlledModal from "./ControlledModal/"

const Comp = () => {
  return <TestComp />
}
;<Comp />
```

## Usage

```jsx
import * as React from "react"
import { Stepper, List, Body, SimpleLink, Card, Button } from "@operational/components"

const MyComponent = () => {
  const [activeSlideIndex, setActiveSlideIndex] = React.useState(0)

  return (
    <Stepper
      activeSlideIndex={activeSlideIndex}
      onStepChange={setActiveSlideIndex}
      steps={[
        {
          title: "Select Your Git Provider",
          content: (
            <Body>
              <List
                items={[
                  {
                    photo: "https://placehold.it/140x60",
                    description: "We will ask you to authenticate yourself with OAuth.",
                    onClick: () => setActiveSlideIndex(1),
                  },
                  {
                    photo: "https://placehold.it/140x60",
                    description: "We will ask you to authenticate yourself with OAuth.",
                    onClick: () => alert("You chose the second item!"),
                  },
                  {
                    title: "Manual Setup",
                    photo: "https://placehold.it/140x60",
                    description:
                      "Provide the URL to any accessible git repository and set up the required keys for access.",
                    onClick: () => alert("You chose the third item!"),
                  },
                ]}
              />
              <Button color="primary" onClick={() => setActiveSlideIndex(1)}>
                Go to Step 2
              </Button>
            </Body>
          ),
        },
        {
          title: "Authenticate",
          content: (
            <Body>
              Welcome to Step 2!{" "}
              <SimpleLink icon="Open" onClick={() => setActiveSlideIndex(2)}>
                Next?
              </SimpleLink>
            </Body>
          ),
        },
        {
          title: "Select Repositories",
          content: (
            <Card
              action={<SimpleLink onClick={() => setActiveSlideIndex(3)}>Next Slide 👉🏾</SimpleLink>}
              title="Step 3: anything goes"
            >
              Any content goes in here and it should just work.
            </Card>
          ),
        },
        {
          title: "Import",
          content: (
            <>
              <Body>Well, that was nice, now let's go back.</Body>
              <Button color="primary" onClick={() => setActiveSlideIndex(0)}>
                Go Back to the First Slide
              </Button>
            </>
          ),
        },
      ]}
    />
  )
}

;<MyComponent />
```

## Usage

```jsx
import * as React from "react"
import { Stepper, List, Body, SimpleLink, Card, Button } from "@operational/components"

const MyComponent = () => {
  const [activeSlideIndex, setActiveSlideIndex] = React.useState(0)

  return (
    <Stepper
      activeSlideIndex={activeSlideIndex}
      onStepChange={setActiveSlideIndex}
      steps={[
        {
          title: "Select Your Git Provider",
          content: (
            <Body>
              <List
                items={[
                  {
                    photo: "https://placehold.it/140x60",
                    description: "We will ask you to authenticate yourself with OAuth.",
                    onClick: () => setActiveSlideIndex(1),
                  },
                  {
                    photo: "https://placehold.it/140x60",
                    description: "We will ask you to authenticate yourself with OAuth.",
                    onClick: () => alert("You chose the second item!"),
                  },
                  {
                    title: "Manual Setup",
                    photo: "https://placehold.it/140x60",
                    description:
                      "Provide the URL to any accessible git repository and set up the required keys for access.",
                    onClick: () => alert("You chose the third item!"),
                  },
                ]}
              />
              <Button color="primary" onClick={() => setActiveSlideIndex(1)}>
                Go to Step 2
              </Button>
            </Body>
          ),
        },
        {
          title: "Authenticate",
          content: (
            <Body>
              Welcome to Step 2!{" "}
              <SimpleLink icon="Open" onClick={() => setActiveSlideIndex(2)}>
                Next?
              </SimpleLink>
            </Body>
          ),
        },
        {
          title: "Select Repositories",
          content: (
            <Card
              action={<SimpleLink onClick={() => setActiveSlideIndex(3)}>Next Slide 👉🏾</SimpleLink>}
              title="Step 3: anything goes"
            >
              Any content goes in here and it should just work.
            </Card>
          ),
        },
        {
          title: "Import",
          content: (
            <>
              <Body>Well, that was nice, now let's go back.</Body>
              <Button color="primary" onClick={() => setActiveSlideIndex(0)}>
                Go Back to the First Slide
              </Button>
            </>
          ),
        },
      ]}
    />
  )
}

;<MyComponent />
```
