Buttons are used heavily throughout an operational interface, and they often require a fair amount of customization. They exist independently or in groups, and can shrink to a condensed mode if space is short. These buttons can also take on any number of colors required.

### Simple usage

Using buttons is as simple as including the component with a text node as a child. Colors may be specified as hex strings, or as a pre-defined color key from the theme.

```jsx
import * as React from "react"
import { Button } from "@operational/components"
;<>
  <div style={{ marginBottom: 10 }}>
    <Button>Default</Button>
    <Button color="grey">Grey</Button>
    <Button color="basic">Basic</Button>
    <Button color="primary">Primary</Button>
    <Button color="success">Success</Button>
    <Button color="error">Error</Button>
    <Button color="warning">Warning</Button>
    <Button color="#ff0000">Custom color</Button>
    <Button textColor="#300" color="#ff0000">
      Custom text color
    </Button>
  </div>
  <div style={{ marginBottom: 10 }}>
    <Button disabled>Default</Button>
    <Button disabled color="grey">
      Grey
    </Button>
    <Button disabled color="basic">
      Basic
    </Button>
    <Button disabled color="primary">
      Primary
    </Button>
    <Button disabled color="success">
      Success
    </Button>
    <Button disabled color="error">
      Error
    </Button>
    <Button disabled color="warning">
      Warning
    </Button>
    <Button disabled color="#ff0000">
      Custom color
    </Button>
  </div>
  <div style={{ marginBottom: 10 }}>
    <Button color="grey" icon="Open">
      Icon
    </Button>
    <Button color="success" icon="Labs">
      Icon
    </Button>
    <Button loading>Loading</Button>
    <Button color="primary" loading>
      Loading
    </Button>
    <Button condensed icon="Open">
      Icon
    </Button>
    <Button condensed loading>
      Loading
    </Button>
  </div>
  <div style={{ marginBottom: 10 }}>
    <Button iconPosition="start" color="grey" icon="Open">
      Icon
    </Button>
    <Button iconPosition="start" color="success" icon="Labs">
      Icon
    </Button>
    <Button iconPosition="start" loading>
      Loading
    </Button>
    <Button iconPosition="start" color="primary" loading>
      Loading
    </Button>
    <Button iconPosition="start" condensed icon="Open" iconColor="success">
      Icon
    </Button>
    <Button iconPosition="start" condensed loading>
      Loading
    </Button>
  </div>
  <div style={{ marginBottom: 10 }}>
    <Button disabled color="grey" icon="Open">
      Icon
    </Button>
    <Button disabled color="success" icon="Labs">
      Icon
    </Button>
    <Button disabled loading>
      Loading
    </Button>
    <Button disabled color="primary" loading>
      Loading
    </Button>
    <Button disabled condensed icon="Open">
      Icon
    </Button>
    <Button disabled condensed loading>
      Loading
    </Button>
  </div>
  <div style={{ backgroundColor: "#1499ce", padding: 5 }}>
    <Button color="ghost">Ghost</Button>
    <Button color="ghost" icon="Open">
      Ghost with icon
    </Button>
    <Button color="ghost" icon="Open" condensed>
      Ghost condensed
    </Button>
  </div>
  <div style={{ backgroundColor: "#1499ce", padding: 5 }}>
    <Button disabled color="ghost">
      Ghost
    </Button>
    <Button disabled color="ghost" icon="Open">
      Ghost with icon
    </Button>
    <Button disabled color="ghost" icon="Open" condensed>
      Ghost condensed
    </Button>
  </div>
</>
```

### Usage with links

Using a `to` prop navigates automatically, and render proper anchor tags with hrefs. See `OperationalUI` docs for a one-time configuration you need to do to have pushstate navigation working out-of-the-box.

```jsx
import * as React from "react"
import { Button } from "@operational/components"
;<Button to="/some-url">Button One</Button>
```

### Neighbor Behavior

`Button`s placed next to other elements need to space their surroundings correctly, whereas individual `Button`s don't displace anything.

```jsx
import * as React from "react"
import { Card, Button } from "@operational/components"
;<Card
  action={
    <>
      <Button condensed>I should have a right margin</Button>
      <Button color="primary" condensed>
        I should not have a right margin
      </Button>
    </>
  }
>
  My friend is a huge chicken
</Card>
```

### Full-width Buttons

```jsx
import * as React from "react"
import { Button } from "@operational/components"
;<Button fullWidth color="grey">
  I want to lose weight
</Button>
```
