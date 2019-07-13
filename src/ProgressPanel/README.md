Progress panels indicate progress on a list of steps making up a larger process such as an installation or deployment.

### Usage

```jsx
import * as React from "react"
import { ProgressPanel } from "@operational/components"
;<ProgressPanel
  items={[
    {
      status: "success",
      title: "Something",
    },
    {
      status: "failure",
      title: "Something",
      error: "Failed to fetch your account data",
    },
    {
      status: "running",
      title: "Something",
    },
    {
      status: "waiting",
      title: "Something",
    },
  ]}
/>
```

### Usage with aliases

```jsx
import * as React from "react"
import { ProgressPanel } from "@operational/components"
;<ProgressPanel
  items={[
    {
      status: "done",
      title: "Something",
    },
    {
      status: "failed",
      title: "Something",
      error: "Failed to fetch your account data",
    },
    {
      status: "running",
      title: "Something",
    },
    {
      status: "todo",
      title: "Something",
    },
  ]}
/>
```

### Inside a card

```jsx
import * as React from "react"
import { Card, ProgressPanel, CardColumns, CardColumn, Button, RemoveIcon } from "@operational/components"
;<>
  <Card title="Progress panel">
    <ProgressPanel
      items={[
        {
          status: "done",
          title: "Something",
        },
      ]}
    />
    <CardColumns>
      <CardColumn title="Danger zone">
        <Button color="error" icon={RemoveIcon}>
          Destroy Editor
        </Button>
      </CardColumn>
    </CardColumns>
  </Card>
  <Card title="Progress panel">
    <ProgressPanel
      items={[
        {
          status: "done",
          title: "Something",
        },
      ]}
    />
  </Card>
</>
```
