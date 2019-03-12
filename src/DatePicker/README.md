DatePickers can currently be used to pick an period bound by two day selections.

### Usage

```jsx
import * as React from "react"
import { DatePicker } from "@operational/components"

const ComponentWithDatePicker = () => {
  const [start, setStart] = React.useState("2017-10-03")
  const [end, setEnd] = React.useState("2017-10-18")

  return (
    <DatePicker
      start={start}
      end={end}
      min="2017-10-01"
      max="2017-11-30"
      placeholder="Pick a date"
      onChange={newState => {
        setStart(newState.start)
        setEnd(newState.end)
      }}
    />
  )
}

;<ComponentWithDatePicker />
```
