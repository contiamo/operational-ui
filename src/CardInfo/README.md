The `CardInfo` component allows cards to display a window of information to a user that is visually localized to a `Card` in order to indicate some type of status.

### Usage

```jsx
<Card style={{ width: 320 }} title="A Card with Info">
  <CardInfo>Hello!</CardInfo>
</Card>
```

### Running State

`CardInfo` also supports a prop that renders a progress bar in order to communicate to a user that something is currently in progress.

```jsx
<Card style={{ width: 320 }} title="A Card with Info">
  <CardInfo running>
    Deployment in Progress...<br />
    started 3.5s ago<br />
    <br />
    <a href="/#!/CardInfo">
      see deployment logs <Icon size={12} name="Open" />
    </a>
  </CardInfo>
</Card>
```
