A component that displays information intended to convey meaningful information about the current running environment to the end-user.

## Usage

```jsx
import * as React from "react"
import { Debug } from "@operational/components"
;<Debug
  title="Operational UI"
  style={{ position: "static" }}
  values={{
    version: "8.1.0",
    built: "2018-09-14 19:30:00",
    branch: "master",
    config: {
      labs: {
        color: "red",
        backend: "https://dog.ceo/api",
      },
    },
  }}
/>
```
