Simple links combine a short label and an icon to create colored links that are less prominent than buttons.

### Usage

```jsx
import * as React from "react"
import { SimpleLink, IconOpen } from "@operational/components"
;<>
  <SimpleLink left icon={IconOpen}>
    Default
  </SimpleLink>
  <SimpleLink left icon={IconOpen} color="success">
    Success
  </SimpleLink>
  <SimpleLink left icon={IconOpen} color="#000000">
    Custom color
  </SimpleLink>
  <SimpleLink left to="https://github.com" icon={IconOpen}>
    With link
  </SimpleLink>
</>
```
