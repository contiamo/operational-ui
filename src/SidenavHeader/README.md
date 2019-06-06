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
import { SidenavHeader, UserIcon } from "@operational/components"
;<SidenavHeader label="Chapter One" icon={UserIcon} />
```

### Usage with items

```jsx
import * as React from "react"
import { SidenavHeader, SidenavItem, CaretUpIcon, ChevronLeftIcon, UserIcon } from "@operational/components"
;<SidenavHeader active label="Chapter One">
  <SidenavItem icon={CaretUpIcon} label="Settings" />
  <SidenavItem icon={ChevronLeftIcon} label="Code" />
  <SidenavItem icon={UserIcon} label="Account" />
</SidenavHeader>
```

### Usage with links

Using a `to` prop navigates automatically, and render proper anchor tags with hrefs. See `OperationalUI` docs for a one-time configuration you need to do to have pushstate navigation working out-of-the-box.

```jsx
import * as React from "react"
import { SidenavHeader } from "@operational/components"
;<SidenavHeader label="Chapter One" to="/one" />
```
