Using a CardHeader component is the standard way to add a title element to the card. This may include not just the card title, but also navigation on the right-hand side.
Passing `title` and `action` props to the `Card` component can be used as a shortcut.

### Usage

```jsx
<Card>
  <CardHeader>Title for my card</CardHeader>
  <p>Content for my card</p>
</Card>
```

### With `action` prop

```jsx
<Card>
  <CardHeader
    action={
      <div>
        <Button condensed>Button</Button>
        <Button condensed color="primary">
          Button <Icon name="Plus" />
        </Button>
        <a href="#">
          Link <Icon name="ExternalLink" />
        </a>
      </div>
    }
  >
    Title for my card
  </CardHeader>
  <p>Content for my card</p>
</Card>
```

### With `title` prop

```jsx
<Card>
  <CardHeader title="Title for my card" />
  <p>Content for my card</p>
</Card>
```

### With component as title

```jsx
<Card>
  <CardHeader
    action={
      <div>
        <Button condensed>Button</Button>
        <a href="#">Link</a>
      </div>
    }
    title={
      <>
        This is a{" "}
        <span style={{ color: "#feb901" }}>
          <strong>
            <em>
              <u>special</u>
            </em>{" "}
            ✨
          </strong>
        </span>{" "}
        title
      </>
    }
  />
  <p>Here is a bare card with custom padding.</p>
  <img alt="Cat" src="https://images.unsplash.com/photo-1491485880348-85d48a9e5312?w=500" />
</Card>
```
