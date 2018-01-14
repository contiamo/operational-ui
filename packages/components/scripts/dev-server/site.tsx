import * as React from "react"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"
import * as c from "../../src/index"

import {
  OperationalUI,
  operationalTheme,
  InfoTile,
  Card,
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
            <Record>
              <RecordSummary>
                <Heading1Type>Deutsche Bahn (German Railway Company)</Heading1Type>
              </RecordSummary>
              <RecordDetails>
                <InfoTile label="Founded">1994</InfoTile>
                <InfoTile label="Employees">~300,000</InfoTile>
                <InfoTile label="Annual Revenue">A lot!</InfoTile>
              </RecordDetails>
            </Record>
          </Card>
        </div>
      </OperationalUI>
    )
  }
}

injectStylesheet(baseStylesheet(operationalTheme))
render(<Site />, document.getElementById("app"))
