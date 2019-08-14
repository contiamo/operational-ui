The `Hint` component simply renders a question icon + a hover tooltip.

### Usage

```jsx
import * as React from "react"
import { Hint } from "@operational/components"
;<Hint tooltipPosition="right">Can I be helpful?</Hint>
```

### Usage with neighboring content

```jsx
import * as React from "react"
import { Hint } from "@operational/components"
;<>
  <span>I am a confusing piece of text</span>
  <Hint right tooltipPosition="right">
    Pretty confusing..
  </Hint>
</>
```

### Extreme Cases

```jsx
import * as React from "react"
import { Hint } from "@operational/components"
;<>
  <div>
    <span>I shouldn't look broken</span>
    <Hint right tooltipPosition="left">
      <ul>
        {Array(1000)
          .fill(null)
          .map((_, index) => (
            <li key={index}>Project {index + 1}</li>
          ))}
      </ul>
    </Hint>
  </div>
  <div>
    <span>I shouldn't either</span>
    <Hint right tooltipPosition="right">
      <img alt="HUGE IMAGE" src="https://placehold.it/1920x1080" />
    </Hint>
  </div>
</>
```
