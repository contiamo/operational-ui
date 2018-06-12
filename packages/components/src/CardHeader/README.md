Using a CardHeader component is the standard way to add a title element to the card. This may include not just the card title, but also navigation on the right-hand side.
Passing `title` and `actionComponents` props to the `Card` component can be used as a shortcut.

### Usage

```jsx
<Card>
    <CardHeader>
      Title for my card
      <div>
        <Button condensed>Button</Button>
        <a href="#">Link</a>
      </div>

</CardHeader>
    <p>Here is a bare card with custom padding.</p>
    <img alt="Cat" src="https://images.unsplash.com/photo-1491485880348-85d48a9e5312?w=500" />
</Card>
```
