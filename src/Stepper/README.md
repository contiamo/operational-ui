This component allows users to flow through a process in a more funnel/wizard style manner.

## Usage

```jsx
initialState = { activeSlideIndex: 0 }
;<Stepper
  activeSlideIndex={state.activeSlideIndex}
  onStepChange={activeSlideIndex => setState({ activeSlideIndex })}
  steps={[
    {
      title: "Select Your Git Provider",
      content: (
        <List
          items={[
            {
              photo: "https://placehold.it/140x60",
              description: "We will ask you to authenticate yourself with OAuth.",
              onClick: () => setState({ activeSlideIndex: 1 }),
            },
            {
              photo: "https://placehold.it/140x60",
              description: "We will ask you to authenticate yourself with OAuth.",
              onClick: () => alert("You chose the second item!"),
            },
            {
              title: "Manual Setup",
              photo: "https://placehold.it/140x60",
              description: "Provide the URL to any accessible git repository and set up the required keys for access.",
              onClick: () => alert("You chose the third item!"),
            },
          ]}
        />
      ),
    },
    {
      title: "Authenticate",
      content: (
        <Body>
          Welcome to Step 2!{" "}
          <SimpleLink icon="Open" onClick={() => setState({ activeSlideIndex: 2 })}>
            Next?
          </SimpleLink>
        </Body>
      ),
    },
    {
      title: "Select Repositories",
      content: (
        <Card
          action={<SimpleLink onClick={() => setState({ activeSlideIndex: 3 })}>Next Slide 👉🏾</SimpleLink>}
          title="Anything goes"
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
          <Button color="primary" onClick={() => setState({ activeSlideIndex: 0 })}>
            Go Back to the First Slide
          </Button>
        </>
      ),
    },
  ]}
/>
```
