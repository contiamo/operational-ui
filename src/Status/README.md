This component displays an indicator of status.

### Usage

```jsx
<div style={{ maxWidth: 200 }}>
  <Card>
    <Status state="success">Deployed</Status>
  </Card>
  <Card>
    <Status state="running">Running</Status>
  </Card>
  <Card>
    <Status state="error">Offline</Status>
  </Card>
  <Card>
    <Status state="neutral">Neutral</Status>
  </Card>
</div>
```

### Deprecated API

```jsx
<div style={{ maxWidth: 200 }}>
  <Card>
    <Status success />Deployed
  </Card>
  <Card>
    <Status running />Running
  </Card>
  <Card>
    <Status error />Offline
  </Card>
  <Card>
    <Status />Neutral
  </Card>
</div>
```
