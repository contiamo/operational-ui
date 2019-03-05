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

### With content on the right

```jsx
<Card title="Playground">
  <CardColumns>
    <CardColumn title="Input">
      <Textarea code value="hello-word" />
    </CardColumn>
    <CardColumn title="Schema">
      <Code
        syntax="json"
        src={{
          items: {
            type: "integer",
          },
          type: "array",
        }}
      />
    </CardColumn>
  </CardColumns>
  <CardColumns>
    <CardColumn>
      <Button color="primary">Send Request</Button>
    </CardColumn>
    <CardColumn contentRight>
      <Button color="grey" icon="Open">
        curl/code
      </Button>
    </CardColumn>
  </CardColumns>
</Card>
```

### With flexColumn

```jsx
<Card title="Playground">
  <CardColumns>
    <CardColumn title="Input">
      <Textarea code value="hello-word" fullWidth />
    </CardColumn>
    <CardColumn title="Schema" flexColumn>
      <Code
        syntax="json"
        src={{
          items: {
            type: "integer",
          },
          type: "array",
        }}
      />
    </CardColumn>
  </CardColumns>
  <CardColumns>
    <CardColumn>
      <Button color="primary">Send Request</Button>
    </CardColumn>
    <CardColumn contentRight>
      <Button color="grey" icon="Open">
        curl/code
      </Button>
    </CardColumn>
  </CardColumns>
</Card>
```

### With columns param

```jsx
<Card title="Bundle information">
  <p>Here is the information available about this bundle.</p>
  <CardColumns columns={3}>
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
