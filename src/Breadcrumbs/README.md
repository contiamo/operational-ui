Breadcrumbs are typically a series of links showing the path to a particular page, and linking to each parent. Operational UI's breadcrumbs add a few extra functionality, such as icon and context menu support.

Using a `to` prop navigates automatically, and render proper anchor tags with hrefs. See `OperationalUI` docs for a one-time configuration you need to do to have pushstate navigation working out-of-the-box.

### Usage - single item

When there is only one level above the current page, the breadcrumb should function like the back button in the browser, as while also indicating the name of the page above it.

```jsx
import * as React from "react"
import { Breadcrumbs, Breadcrumb } from "@operational/components"
;<Breadcrumbs>
  <Breadcrumb to="/#">Home</Breadcrumb>
</Breadcrumbs>
```

### Usage - multiple items

When more than one level exists above the current page, the breadcrumb displays all of the parent levels in order. All of those listed should be clickable and navigate to the page in question.

```jsx
import * as React from "react"
import { Breadcrumbs, Breadcrumb } from "@operational/components"
;<Breadcrumbs>
  <Breadcrumb to="/#">Home</Breadcrumb>
  <Breadcrumb to="/#">Components</Breadcrumb>
  <Breadcrumb to="/#/Components/Breadcrumb">Breadcrumb</Breadcrumb>
</Breadcrumbs>
```
