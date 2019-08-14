Tooltips give helpful hints about actions an end-user can perform. They are designed to be reusable, elegant and unobtrusive. Tooltips are great for UX, so we try to make them as versatile as possible.

### Usage

```jsx
import * as React from "react"
import { Tooltip } from "@operational/components"
const MyComponent = () => {
  const [isTooltipVisible, setIsTooltipVisible] = React.useState(0)

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        onMouseEnter={e => setIsTooltipVisible(1)}
        onMouseLeave={e => setIsTooltipVisible(0)}
        style={{ position: "relative", border: "1px solid black", margin: 20, padding: 5, width: 80 }}
      >
        <p>I am a box full of mysteries.</p>
        {isTooltipVisible === 1 && <Tooltip position="top">All is clearer with tooltips</Tooltip>}
        {isTooltipVisible === 1 && <Tooltip position="right">Even short ones</Tooltip>}
      </div>
      <div
        onMouseEnter={e => setIsTooltipVisible(2)}
        onMouseLeave={e => setIsTooltipVisible(0)}
        style={{ position: "relative", border: "1px solid black", margin: 20, padding: 5, width: 80 }}
      >
        <p>I am a box full of mysteries.</p>
        {isTooltipVisible === 2 && <Tooltip position="bottom">Bottom-positioned tooltip</Tooltip>}
        {isTooltipVisible === 2 && <Tooltip position="left">Tooltip from the left</Tooltip>}
        {isTooltipVisible === 2 && <Tooltip position="right">Tooltip from the right</Tooltip>}
      </div>
    </div>
  )
}
;<MyComponent />
```
