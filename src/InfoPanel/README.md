The `InfoPanel` component allows cards to display a window of information to a user that is visually localized to a `Card` in order to indicate some type of status.

### Usage

```jsx
import * as React from "react"
import { Card, InfoPanel } from "@operational/components"
;<Card style={{ width: 320 }} title="An InfoPanel with Basic Info">
  <InfoPanel>Hello!</InfoPanel>
</Card>
```

### Loading State

`InfoPanel` also supports a prop that renders a spinner in order to communicate to a user that something is currently in progress.

```jsx
import * as React from "react"
import { Card, InfoPanel, IconOpen } from "@operational/components"
;<div style={{ display: "flex" }}>
  <Card style={{ width: 320 }} title="An InfoPanel with Long Running Info">
    <InfoPanel loading>
      Deployment in Progress...
      <br />
      started 3.5s ago
      <br />
      <br />
      <a href="/#!/InfoPanel">
        see deployment logs <IconOpen size={12} />
      </a>
    </InfoPanel>
  </Card>

  <Card style={{ width: 240, marginLeft: 16 }} title="An InfoPanel with a Long Word">
    <InfoPanel loading>Supercalifragilisticexpialidocious</InfoPanel>
  </Card>

  <Card style={{ width: 320, marginLeft: 16 }} title="An InfoPanel with a Long Message">
    <InfoPanel loading>
      This is a long message. I certainly hope the loading spinner does not eclipse the text.
    </InfoPanel>
  </Card>
</div>
```
