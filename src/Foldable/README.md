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
