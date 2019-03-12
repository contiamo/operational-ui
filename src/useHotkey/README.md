### Assign a callback to some keystroke

```jsx
import React, { useRef } from "react"
import { Input } from "@operational/components"

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
import React, { useRef } from "react"
import { Input } from "@operational/components"

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
