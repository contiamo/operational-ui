The `CardColumns` component is used as a wrapper around groups of `CardColumn` components. Additional elements can be rendered in a card before or after a group of columns.

### Usage

```jsx
<Card title="Bundle information">
  <p>Here is the information available about this bundle.</p>
  <CardColumns>
    <CardColumn title="Contributors">
      <AvatarGroup>
        <Avatar name="Alice Bernoulli" />
        <Avatar name="Clarence Dermot" />
      </AvatarGroup>
    </CardColumn>
    <CardColumn title="Tags">
      <Chip>agent-view</Chip>
      <Chip>production</Chip>
    </CardColumn>
  </CardColumns>
</Card>
```

### With a smaller card

```jsx
<div style={{ width: 280 }}>
  <Card title="Bundle information">
    <p>Here is the information available about this bundle.</p>
    <CardColumns>
      <CardColumn title="Contributors">
        <AvatarGroup>
          <Avatar name="Alice Bernoulli" />
          <Avatar name="Clarence Dermot" />
        </AvatarGroup>
      </CardColumn>
      <CardColumn title="Tags">
        <Chip>agent-view</Chip>
        <Chip>production</Chip>
      </CardColumn>
    </CardColumns>
  </Card>
</div>
```

### With an image

```jsx
<div style={{ width: 280 }}>
  <Card title="Bundle information">
    <p>Here is the information available about this bundle.</p>
    <CardColumns>
      <CardColumn title="Contributors">
        <img src="https://i.imgflip.com/1g4xbh.jpg" />
      </CardColumn>
      <CardColumn title="Tags">
        <Chip>agent-view</Chip>
        <Chip>production</Chip>
      </CardColumn>
    </CardColumns>
  </Card>
</div>
```
