/**
 * This file is used as a simple standalone dev server for explorations that
 * don't necessarily make it into styleguidist sample code. They may be exploring
 * bugs, used to develop new features, and test combinations of components standalone
 * for production UI's.
 */
import * as React from "react"
import { render } from "react-dom"
import OperationalUI, { Card, CardSection, Tree, TreeProps } from "../src"

class Example extends React.Component<{}, {}> {
  public render() {
    return (
      <OperationalUI>
        <div style={{ width: 600, height: 300, margin: 20 }}>
          <Card title="A simple card" />
        </div>
      </OperationalUI>
    )
  }
}

render(<Example />, document.getElementById("app"))
