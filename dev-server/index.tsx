import * as React from "react"
import { render } from "react-dom"
import OperationalUI, { Card, CardSection } from "../src"

const App = () => (
  <OperationalUI>
    <div style={{ width: 400, height: 300, margin: 20 }}>
      <Card
        stackSections="horizontal"
        sections={
          <>
            <CardSection title="Title 1" actions={["action1", "action2"]}>
              asdf
            </CardSection>
            <CardSection title="Title 2">asdf</CardSection>
          </>
        }
      />
    </div>
  </OperationalUI>
)

render(<App />, document.getElementById("app"))
