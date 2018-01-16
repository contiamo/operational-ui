import * as React from "react"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"

import {
  OperationalUI,
  operationalTheme,
  InfoTile,
  Button,
  Card,
  Input,
  Record,
  RecordSummary,
  RecordDetails,
  Heading1Type,
  ContextMenu,
  ContextMenuItem
} from "../../src/index"

class Site extends React.Component<{}, {}> {
  state = {
    selected: ["1"]
  }
  render() {
    return (
      <OperationalUI>
        <div style={{ padding: 20 }}>
          <Card>
            <div>
              <Input value="Hello" css={{marginRight: 8}} />
              <Button color="warning">Submit</Button>
            </div>
          </Card>
        </div>
      </OperationalUI>
    )
  }
}

injectStylesheet(baseStylesheet(operationalTheme))
render(<Site />, document.getElementById("app"))
