export default `
<div style={{display: 'flex', marginTop: 16 }}>
  <Button color="#5F8E2C">Button 1</Button>
  <Button>Button 2</Button>
  <Button modifiers={["space"]}>Group 1</Button>
  <Button active modifiers={["group"]}>Group 2</Button>
  <Button modifiers={["group"]}>Group 3</Button>
</div>
`
