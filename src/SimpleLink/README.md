Simple links combine a short label and an icon to create colored links that are less prominent than buttons.

### Usage

```jsx
import * as React from "react"
import { SimpleLink, OpenIcon } from "@operational/components"
;<>
  <SimpleLink left icon={OpenIcon}>
    Default
  </SimpleLink>
  <SimpleLink left icon={OpenIcon} color="success">
    Success
  </SimpleLink>
  <SimpleLink left icon={OpenIcon} color="#000000">
    Custom color
  </SimpleLink>
  <SimpleLink left to="https://github.com" icon={OpenIcon}>
    With link
  </SimpleLink>
</>
```
