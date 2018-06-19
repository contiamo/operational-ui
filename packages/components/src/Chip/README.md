Most commonly used for filters, these elements represent small bits of information that give a sense of context
to the user. Chips can be interactive, or simply informative. They can take on any color passed through `props`,
along with a symbol for the button that will be displayed if click behavior is detected.

### Usage

```jsx
<div style={{ display: "flex" }}>
  <Chip>Hello!</Chip>
  <Chip
    colorIndex="1"
    icon="X"
    onIconClick={() => window.alert("Buonasera")}
    onClick={() => window.alert("Good evening!")}
  >
    Ciao!
  </Chip>
  <Chip
    colorIndex="2"
    icon="X"
    onIconClick={() => window.alert("Buonasera")}
    onClick={() => window.alert("Good evening!")}
  >
    Ciao!
  </Chip>
  <Chip
    color="primary"
    icon="X"
    onIconClick={() => window.alert("Buonasera")}
    onClick={() => window.alert("Good evening!")}
  >
    Ciao!
  </Chip>
</div>
```
