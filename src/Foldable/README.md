This component does not render UI, but instead manages state for its children, allowing them to fold and unfold. It can support cases where multiple children need to be expanded/collapsed at once, or allow more fine-grained control.

## Basic Usage

Here's how you'd collapse a basic `Group`.

```jsx
<Foldable>
  {({ Toggler, isFolded }) => (
    <Group
      icon="User"
      iconColor="primary"
      collapsed={isFolded}
      title={
        <>
          Users <Toggler />
        </>
      }
    >
      <Autocomplete fullWidth placeholder="Search for users..." />
    </Group>
  )}
</Foldable>
```

## Controlling Multiple Children

This component allows toggling multiple children's "folded" state centrally, here's what that looks like, in case of `CardSection`s that would need to be controlled from one location.

```jsx
<Foldable>
  {({ Toggler, isFolded }) => (
    <Card
      stackSections="horizontal"
      sections={
        <>
          <CardSection
            collapsed={isFolded}
            title={
              <>
                Section 1 <Toggler />
              </>
            }
          >
            Content 1
          </CardSection>
          <CardSection
            collapsed={isFolded}
            title={
              <>
                Section 2 <Toggler />
              </>
            }
          >
            Content 2
          </CardSection>
        </>
      }
    />
  )}
</Foldable>
```

## Granular Foldability

This component _also_ allows you to managed folded state for individual children as well. Here's an example.

```jsx
<Card
  sections={
    <>
      <Foldable>
        {({ Toggler, isFolded }) => (
          <CardSection
            collapsed={isFolded}
            title={
              <>
                Section 1 <Toggler />
              </>
            }
          >
            Content 1
          </CardSection>
        )}
      </Foldable>

      <Foldable>
        {({ Toggler, isFolded }) => (
          <CardSection
            collapsed={isFolded}
            title={
              <>
                Section 2 <Toggler />
              </>
            }
          >
            Content 2
          </CardSection>
        )}
      </Foldable>
    </>
  }
/>
```

## With Initial Open/Closed State

It is also possible to control the initial state of this component like below. If no `initialState` is supplied, we default to everything being _open_.

```jsx
<Foldable initialState="closed">
  {({ Toggler, isFolded }) => (
    <Card
      sections={
        <CardSection
          collapsed={isFolded}
          title={
            <>
              Section 1 <Toggler />
            </>
          }
        >
          Content 1
        </CardSection>
      }
    />
  )}
</Foldable>
```

## Advanced Case: An Accordion

In some cases, you'd want a one component's `isFolded` property to be aware of its surroundings. We might solve this with local component state in React as so.

```jsx
initialState = {
  active: 0,
}
;<div style={{ maxWidth: 430 }}>
  <Foldable>
    {({ Toggler }) => {
      const isFolded = state.active !== 0
      return (
        <Group
          minHeight={400}
          collapsed={isFolded}
          title={
            <>
              Cat <Toggler onClick={() => setState({ active: 0 })} isFolded={isFolded} />
            </>
          }
          icon="User"
          iconColor="primary"
        >
          <Autocomplete fullWidth placeholder="Start typing a cat name..." />
        </Group>
      )
    }}
  </Foldable>

  <div style={{ height: 8 }} />

  <Foldable initialState="closed">
    {({ Toggler }) => {
      const isFolded = state.active !== 1
      return (
        <Group
          collapsed={isFolded}
          title={
            <>
              Cats <Toggler onClick={() => setState({ active: 1 })} isFolded={isFolded} />
            </>
          }
          icon="Users"
          iconColor="primary"
        >
          <img alt="Cats" src="https://media.giphy.com/media/NSU8FiU2QXYc0/giphy.gif" />
        </Group>
      )
    }}
  </Foldable>

  <div style={{ height: 8 }} />

  <Foldable initialState="closed">
    {({ Toggler }) => {
      const isFolded = state.active !== 2

      return (
        <Group
          collapsed={isFolded}
          title={
            <>
              Cat in Suit <Toggler onClick={() => setState({ active: 2 })} isFolded={isFolded} />
            </>
          }
          icon="Jobs"
          iconColor="color.text.lighter"
        >
          <img alt="Cat in Suit" src="https://media.giphy.com/media/L0HAj70HJ3A6A/giphy.gif" />
        </Group>
      )
    }}
  </Foldable>
</div>
```
