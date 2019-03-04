## Usage

This hook is used to attach a callback to a window event.

```jsx
const Example = () => {
  const [pressedKeys, setKeys] = useState([])
  useWindowEventListener("keypress", ev => {
    setKeys([...keys, ev.key])
  })

  return (
    <div>
      <strong>Press any keys: </strong>
      <output>{pressedKeys.join(" > ")}</output>
    </div>
  )
}

;<Example />
```
