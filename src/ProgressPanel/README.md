Progress panels indicate progress on a list of steps making up a larger process such as an installation or deployment.

### Usage

```jsx
<ProgressPanel
  items={[
    {
      status: "success",
      title: "Something",
    },
    {
      status: "failure",
      title: "Something",
      error: "Failed to fetch your account data",
    },
    {
      status: "running",
      title: "Something",
    },
    {
      status: "waiting",
      title: "Something",
    },
  ]}
/>
```

### Usage with aliases

```jsx
<ProgressPanel
  items={[
    {
      status: "done",
      title: "Something",
    },
    {
      status: "failed",
      title: "Something",
      error: "Failed to fetch your account data",
    },
    {
      status: "running",
      title: "Something",
    },
    {
      status: "todo",
      title: "Something",
    },
  ]}
/>
```

### Inside a card

```jsx
<Card title="Progress panel">
  <ProgressPanel
    items={[
      {
        status: "done",
        title: "Something",
      },
    ]}
  />
  <CardColumns>
    <CardColumn title="Danger zone">
      <Button color="error" icon="Remove">
        Destroy Editor
      </Button>
    </CardColumn>
  </CardColumns>
</Card>
<Card title="Progress panel">
  <ProgressPanel
    items={[
      {
        status: "done",
        title: "Something",
      },
    ]}
  />
</Card>
```
