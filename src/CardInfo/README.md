The `CardInfo` component allows cards to display a window of information to a user that is visually localized to a `Card` in order to indicate some type of status.

### Usage

```jsx
<Card style={{ width: 320 }} title="A Card with Basic Info">
  <CardInfo>Hello!</CardInfo>
</Card>
```

### Running State

`CardInfo` also supports a prop that renders a progress bar in order to communicate to a user that something is currently in progress.

```jsx
<div style={{ display: "flex" }}>
  <Card style={{ width: 320 }} title="A Card with Long Running Info">
    <CardInfo running>
      Deployment in Progress...<br />
      started 3.5s ago<br />
      <br />
      <a href="/#!/CardInfo">
        see deployment logs <Icon size={12} name="Open" />
      </a>
    </CardInfo>
  </Card>

  <Card style={{ width: 240, marginLeft: 16 }} title="A Card with a really long word">
    <CardInfo running>Supercalifragilisticexpialidocious</CardInfo>
  </Card>

  <Card style={{ width: 320, marginLeft: 16 }} title="A Card with a message that is too long">
    <CardInfo running>This is a long message. I certainly hope the loading spinner does not eclipse the text.</CardInfo>
  </Card>
</div>
```
