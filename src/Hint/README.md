The `Hint` component simply renders a question icon + a hover tooltip.

### Usage

```jsx
import * as React from "react"
import { Hint } from "@operational/components"
;<Hint tooltipPosition="smart">Can I be helpful?</Hint>
```

### Usage with neighboring content

```jsx
import * as React from "react"
import { Hint } from "@operational/components"
;<>
  <span>I am a confusing piece of text</span>
  <Hint right>Pretty confusing..</Hint>
</>
```
