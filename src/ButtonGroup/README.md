If used within the button group component, the library takes care to remove intermediate spacings, border radii and makes sure borders don't double up.

### Simple buttons group

```jsx
<ButtonGroup>
  <Button>Group 1</Button>
  <Button active>Group 2</Button>
  <Button>Group 3</Button>
</ButtonGroup>
```

### Condensed mode

Buttons can be condensed, and further grouped to achieve, among other things, this paginator-style look:

```jsx
<ButtonGroup>
  <Button condensed>1</Button>
  <Button condensed color="success">
    2
  </Button>
  <Button condensed>3</Button>
</ButtonGroup>
```
