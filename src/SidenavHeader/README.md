Used as headers (top-level links) inside a `Sidenav`.

### Usage

```jsx
import * as React from "react"
import { SidenavHeader } from "@operational/components"
;<SidenavHeader label="Chapter One" />
```

### Usage with icon

```jsx
import * as React from "react"
import { SidenavHeader } from "@operational/components"
;<SidenavHeader label="Chapter One" icon="User" />
```

### Usage with items

```jsx
import * as React from "react"
import { SidenavHeader, SidenavItem } from "@operational/components"
;<SidenavHeader active label="Chapter One">
  <SidenavItem icon="CaretUp" label="Settings" />
  <SidenavItem icon="ChevronLeft" label="Code" />
  <SidenavItem icon="User" label="Account" />
</SidenavHeader>
```

### Usage with links

Using a `to` prop navigates automatically, and render proper anchor tags with hrefs. See `OperationalUI` docs for a one-time configuration you need to do to have pushstate navigation working out-of-the-box.

```jsx
import * as React from "react"
import { SidenavHeader } from "@operational/components"
;<SidenavHeader label="Chapter One" to="/one" />
```
