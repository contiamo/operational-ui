This component displays an indicator of status.

### Usage

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
