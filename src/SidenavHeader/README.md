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
import { SidenavHeader, IconUser } from "@operational/components"
;<SidenavHeader label="Chapter One" icon={IconUser} />
```

### Usage with items

```jsx
import * as React from "react"
import { SidenavHeader, SidenavItem, IconCaretUp, IconChevronLeft, IconUser } from "@operational/components"
;<SidenavHeader active label="Chapter One">
  <SidenavItem icon={IconCaretUp} label="Settings" />
  <SidenavItem icon={IconChevronLeft} label="Code" />
  <SidenavItem icon={IconUser} label="Account" />
</SidenavHeader>
```

### Usage with links

Using a `to` prop navigates automatically, and render proper anchor tags with hrefs. See `OperationalUI` docs for a one-time configuration you need to do to have pushstate navigation working out-of-the-box.

```jsx
import * as React from "react"
import { SidenavHeader } from "@operational/components"
;<SidenavHeader label="Chapter One" to="/one" />
```
