Creates a debounced [state,setState] method that delays setting the new state until after desired milliseconds have elapsed since the last time an attempt to update the state was made.

## Basic Usage

```jsx
import React, { useState, useEffect } from "react"

const MyComponent = ({ defaultValue }) => {
  const [value, setValue] = useState(defaultValue)
  const debouncedText = useDebounce(value, 2000)

  return (
    <div>
      <input defaultValue={defaultValue} onChange={e => setValue(e.target.value)} />
      <p>Debounced value: {debouncedText}</p>
      <p>Current value: {value}</p>
    </div>
  )
}

;<MyComponent defaultValue="Hello world" />
```
