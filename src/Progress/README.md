The progress element is used for larger loading sections, most typically the entire page.

### Usage in a div

```jsx
import * as React from "react"
import { Progress } from "@operational/components"
;<div style={{ width: 300, height: 240, border: "1px solid #adadad", padding: 20, position: "relative" }}>
  While I patiently wait for my data, this progress bar assures me that things will be ok.
  <Progress />
</div>
```

### Usage inline

```jsx
import * as React from "react"
import { Progress } from "@operational/components"
;<div style={{ width: 300, height: 240, border: "1px solid #adadad", padding: 20, position: "relative" }}>
  While I patiently wait for my data, this progress bar assures me that things will be ok.
  <Progress inline width={150} />
  <Progress inline percentage={0} />
  <Progress inline percentage={33} />
  <Progress inline percentage={100} />
</div>
```
