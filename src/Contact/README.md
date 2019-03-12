Sometimes, we'd like to show someone's name and email address. This component lets us show a contact in a consistent way.

## Basic Usage

```jsx
import * as React from "react"
import { Contact } from "@operational/components"
;<>
  <Contact name="Luke Cage" meta="harlems.hero@gmail.com" />
  <br />
  <Contact name="Danny Rand" />
  <br />
  <Contact name="Matt Murdock" meta="+1 173 712 9124" />
</>
```

## With Avatar

In some cases, this component will be required to pair with an `Avatar`. Consider,

```jsx
import * as React from "react"
import { Contact, Avatar } from "@operational/components"

const name = "Kenye Wheelest"
;<div style={{ display: "flex" }}>
  <div style={{ marginRight: 8 }}>
    <Avatar name={name} />
  </div>
  <Contact name={name} meta="kweezy@notformidablelabs.com" />
</div>
```
