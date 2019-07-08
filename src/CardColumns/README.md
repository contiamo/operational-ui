The `CardColumns` component is used as a wrapper around groups of `CardColumn` components. Additional elements can be rendered in a card before or after a group of columns.

### Usage

```jsx
import * as React from "react"
import { Card, CardColumns, CardColumn, AvatarGroup, Avatar, Chip } from "@operational/components"
;<Card title="Bundle information">
  <p>Here is the information available about this bundle.</p>
  <CardColumns>
    <CardColumn title="Contributors">
      <AvatarGroup avatars={[{ name: "Alice Bernoulli" }, { name: "Clarence Dermot" }]} />
    </CardColumn>
    <CardColumn title="Tags">
      <Chip>agent-view</Chip>
      <Chip>production</Chip>
    </CardColumn>
  </CardColumns>
</Card>
```

### With a smaller card

```jsx
import * as React from "react"
import { Card, CardColumns, CardColumn, AvatarGroup, Avatar, Chip } from "@operational/components"
;<div style={{ width: 280 }}>
  <Card title="Bundle information">
    <p>Here is the information available about this bundle.</p>
    <CardColumns columns={1}>
      <CardColumn title="Contributors">
        <AvatarGroup avatars={[{ name: "Alice Bernoulli" }, { name: "Clarence Dermot" }]} />
      </CardColumn>
      <CardColumn title="Tags">
        <Chip>agent-view</Chip>
        <Chip>production</Chip>
      </CardColumn>
    </CardColumns>
  </Card>
</div>
```

### With an image

```jsx
import * as React from "react"
import { Card, CardColumns, CardColumn, Chip } from "@operational/components"
;<div style={{ width: 280 }}>
  <Card title="Bundle information">
    <p>Here is the information available about this bundle.</p>
    <CardColumns columns={1}>
      <CardColumn title="Contributors">
        <img src="https://i.imgflip.com/1g4xbh.jpg" />
      </CardColumn>
      <CardColumn title="Tags">
        <Chip>agent-view</Chip>
        <Chip>production</Chip>
      </CardColumn>
    </CardColumns>
  </Card>
</div>
```

### With content on the right

```jsx
import * as React from "react"
import { Card, CardColumns, CardColumn, Textarea, Code, Button } from "@operational/components"
;<Card title="Playground">
  <CardColumns>
    <CardColumn title="Input">
      <Textarea code value="hello-word" />
    </CardColumn>
    <CardColumn title="Schema">
      <Code
        syntax="json"
        src={{
          items: {
            type: "integer",
          },
          type: "array",
        }}
      />
    </CardColumn>
  </CardColumns>
  <CardColumns>
    <CardColumn>
      <Button color="primary">Send Request</Button>
    </CardColumn>
    <CardColumn contentRight>
      <Button color="grey" icon="Open">
        curl/code
      </Button>
    </CardColumn>
  </CardColumns>
</Card>
```

### With an exact number of columns

Change the following to `columns={4}` on line 3 to see the columns shift.

```jsx
import * as React from "react"
import { Card, CardColumns, CardColumn, AvatarGroup, Avatar, Chip } from "@operational/components"
;<Card title="Bundle information">
  <p>Here is the information available about this bundle.</p>
  <CardColumns columns={3}>
    <CardColumn title="Contributors">
      <AvatarGroup avatars={[{ name: "Alice Bernoulli" }, { name: "Clarence Dermot" }]} />
    </CardColumn>
    <CardColumn title="Tags">
      <Chip>agent-view</Chip>
      <Chip>production</Chip>
    </CardColumn>
    <CardColumn title="Tags">
      <Chip>agent-view</Chip>
      <Chip>production</Chip>
    </CardColumn>
    <CardColumn title="Tags">
      <Chip>agent-view</Chip>
      <Chip>production</Chip>
    </CardColumn>
  </CardColumns>
</Card>
```
