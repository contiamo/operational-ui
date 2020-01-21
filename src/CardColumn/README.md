Card columns are used to group content within a card into vertical columns.

# Basic Usage

Here's how you can easily use this component.

```jsx
import * as React from "react"
import { Card, CardColumns, CardColumn } from "@operational/components"
;<Card title="Bundle Information">
  <CardColumns>
    <CardColumn title="Contributor">@tejasq</CardColumn>
    <CardColumn title="Other Contributor">@imogenf</CardColumn>
    <CardColumn title="Also other Contributor">@stereobooster</CardColumn>
    <CardColumn title="Yet another Contributor">@fabien0102</CardColumn>
  </CardColumns>
</Card>
```

# With JSX title and actions

Here's how you can easily use this component.

```jsx
import * as React from "react"
import { Card, CardColumns, CardColumn, Button } from "@operational/components"
;<Card title="Bundle Information">
  <CardColumns>
    <CardColumn
      title="Data Sources"
      action={
        <Button condensed color="primary">
          Add
        </Button>
      }
    >
      I am a table
    </CardColumn>
  </CardColumns>
</Card>
```

# With Tabs

Card columns can be used with tabs when required. Here's how.

```jsx
import * as React from "react"
import { Card, CardColumns, CardColumn, Code } from "@operational/components"

const myData = {
  _page: 1,
  _pageSize: 1,
}
const myEndpointUrl = "https://me.now.sh/my-service"

const tab1 = {
  name: "CURL",
  children: (
    <Code syntax="bash">{`curl \\
    '${myEndpointUrl}' \\
    -H 'content-type: application/json' \\
    -H "Authorization: Bearer $SERVICE_ACCOUNT_TOKEN" \\
    -H 'accept: */*' \\
    --data-binary '${JSON.stringify(myData, null, 2)}'`}</Code>
  ),
}

const tab2 = {
  name: "JSON",
  children: <Code syntax="javascript">{JSON.stringify(myData, null, 2)}</Code>,
}

const MyComponent = () => {
  const [playgroundBodyType, setPlaygroundBodyType] = React.useState("CURL")

  return (
    <Card title="Some Versions of Snippets">
      <CardColumns>
        <CardColumn
          title="Request Body"
          activeTabName={playgroundBodyType}
          onTabChange={setPlaygroundBodyType}
          tabs={[tab1, tab2]}
        />
      </CardColumns>
    </Card>
  )
}

;<MyComponent />
```
