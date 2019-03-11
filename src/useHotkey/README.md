### Assign a callback to some keystroke

```jsx
const useRef = require("react").useRef

const Component1 = () => {
  const container = useRef(null)
  useHotkey(container, { key: "enter" }, () => {
    alert("⏎")
  })

  return (
    <div ref={container}>
      <Input value="Some value..." label="Set focus in me and hit ⏎" />
    </div>
  )
}

;<Component1 />
```

### Can be used with key modifiers

```jsx
const useRef = require("react").useRef

const Component2 = () => {
  const container = useRef(null)
  useHotkey(container, { key: "p", ctrl: true, shift: true }, () => {
    alert("Ctrl + Shift + P")
  })

  return (
    <div ref={container}>
      <Input value="Some value..." label="Set focus in me and hit Ctrl + Shift + P" />
    </div>
  )
}

;<Component2 />
```
