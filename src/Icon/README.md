Operational's SVG icon set packaged as a single component.

### Usage

```jsx
import * as React from "react"
import { Icon } from "@operational/components"
;<>
  <Icon name="Add" size={36} />
  <Icon name="Function" size={36} />
  <Icon name="Funnel" size={36} color="#00bb00" />
  <Icon name="Bundle" size={36} color="error" />
  <p>And here some brand icons:</p>
  <Icon name="OperationalUI" size={36} />
  <Icon name="Pantheon" size={36} colored />
  <Icon name="Labs" size={36} />
</>
```

#### With margins for content

```jsx
import * as React from "react"
import { Icon } from "@operational/components"
;<div style={{ display: "flex", alignItems: "center" }}>
  <Icon name="Add" left /> Play that song!
</div>
```

```jsx
import * as React from "react"
import { Icon } from "@operational/components"
;<div style={{ display: "flex", alignItems: "center" }}>
  I'm on the right! <Icon name="Document" right />
</div>
```
