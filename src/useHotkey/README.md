## Usage

This hook can be used to assign a callback to some keystroke

```jsx
const useRef = require("react").useRef
const keyCodes = require("../utils").keyCodes

const Component = () => {
  const scope1 = useRef(null)
  useHotkey(scope1, keyCodes.enter, () => {
    alert("⏎")
  })

  const scope2 = useRef(null)
  useHotkey(
    scope2,
    keyCodes.enter,
    () => {
      alert("⌘ + ⏎")
    },
    false,
    false,
    false,
    true,
  )

  const scope3 = useRef(null)
  useHotkey(scope3, keyCodes.esc, () => {
    alert("Esc")
  })

  const scope4 = useRef(null)
  useHotkey(
    scope4,
    80,
    () => {
      alert("Ctrl + P")
    },
    true,
  )

  useHotkey(
    scope4,
    84,
    () => {
      alert("Alt + T")
    },
    false,
    false,
    true,
  )

  useHotkey(
    scope4,
    79,
    () => {
      alert("Shift + O")
    },
    false,
    true,
  )

  const scope5 = useRef(null)
  useHotkey(
    scope5,
    keyCodes.backspace,
    () => {
      alert("Ctrl + Shift + Alt + ⌫")
    },
    true,
    true,
    true,
  )

  return (
    <Form>
      <div ref={scope1}>
        <Input value="Some value..." label="Set focus in me and hit ⏎" />
      </div>

      <div ref={scope2}>
        <Input value="Some value..." label="Set focus in me and hit ⌘ + ⏎" />
      </div>

      <div ref={scope3}>
        <Input value="Some value..." label="Set focus in me and hit Esc" />
      </div>

      <div ref={scope4}>
        <Input
          value="Multiple keystrokes work here..."
          label="Set focus in me and hit Ctrl + P, Shift + O, Alt (option) + T"
        />
      </div>

      <div ref={scope5}>
        <Input value="Multiple key modifiers required here..." label="Set focus in me and hit Ctrl + Shift + Alt + ⌫" />
      </div>
    </Form>
  )
}

;<Component />
```
