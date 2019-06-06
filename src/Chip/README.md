Most commonly used for filters, these elements represent small bits of information that give a sense of context
to the user. Chips can be interactive, or simply informative. They can take on any color passed through `props`,
along with a symbol for the button that will be displayed if click behavior is detected.

### Usage

```jsx
import * as React from "react"
import { Chip, IconNo } from "@operational/components"
;<div style={{ display: "flex" }}>
  <Chip>Default color</Chip>
  <Chip
    color="basic"
    icon={IconNo}
    onIconClick={() => window.alert("Buonasera")}
    onClick={() => window.alert("Good evening!")}
  >
    With icon
  </Chip>
  <Chip
    color="success"
    icon={IconNo}
    onIconClick={() => window.alert("Buonasera")}
    onClick={() => window.alert("Good evening!")}
  >
    Ciao!
  </Chip>
  <Chip
    color="error"
    icon={IconNo}
    onIconClick={() => window.alert("Buonasera")}
    onClick={() => window.alert("Good evening!")}
  >
    Hello!
  </Chip>
</div>
```
