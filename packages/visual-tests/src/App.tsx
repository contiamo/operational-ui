import * as React from "react"
import glamorous from "glamorous"
import { Sunburst, VisualizationWrapper } from "@operational/visualizations"
import { Theme } from "@operational/theme"
import {
  OperationalUI,
  Button,
  Card,
  CardHeader,
  Grid,
  Sidebar,
  SidebarHeader,
  SidebarItem
} from "@operational/components"

import Marathon, { MarathonEnvironment } from "./components/Marathon"

import allTestCases, { fromHash, toHash } from "./TestCases"

export interface State {
  group: number
  test: number
}

const TestToggle = glamorous.span(({ theme, active }: { theme: Theme; active: boolean }): {} => ({
  display: "inline-block",
  marginRight: 16,
  padding: "2px 4px",
  cursor: "pointer",
  borderRadius: active ? 2 : 0,
  color: active ? theme.colors.white : theme.colors.linkText,
  backgroundColor: active ? theme.colors.linkText : theme.colors.white,
  borderBottom: "1px solid currentColor"
}))

class App extends React.Component<{}, State> {
  state = {
    group: 0,
    test: 0
  }

  componentDidMount() {
    this.readRoute()
    window.addEventListener("popstate", () => {
      this.readRoute()
    })
  }

  componentDidUpdate() {
    this.syncRoute()
  }

  readRoute() {
    const indicesFromHash = fromHash(window.location.hash)(allTestCases)
    if (indicesFromHash === null) {
      return
    }
    this.setState(() => ({
      group: indicesFromHash.groupIndex,
      test: indicesFromHash.testIndex
    }))
  }

  syncRoute() {
    const hash = toHash({
      groupIndex: this.state.group,
      testIndex: this.state.test
    })(allTestCases)
    if (hash !== window.location.hash) {
      history.pushState(null, null, hash)
    }
  }

  render() {
    return (
      <OperationalUI withBaseStyles>
        <Grid type="IDE">
          <Card>
            <CardHeader>Tests</CardHeader>
            <Sidebar
              css={{ margin: -12, width: "calc(100% + 24px)", boxShadow: "none", borderTop: "1px solid #f2f2f2" }}
            >
              {allTestCases.map((test, groupIndex) => (
                <SidebarHeader
                  key={groupIndex}
                  label={test.title}
                  open={groupIndex === this.state.group}
                  onToggle={() => {
                    this.setState(() => ({
                      group: groupIndex,
                      test: 0
                    }))
                  }}
                >
                  {test.children.map((test, testIndex) => (
                    <SidebarItem
                      key={testIndex}
                      active={groupIndex === this.state.group && testIndex === this.state.test}
                      onClick={() => {
                        this.setState(() => ({
                          test: testIndex
                        }))
                      }}
                    >
                      {test.title}
                    </SidebarItem>
                  ))}
                </SidebarHeader>
              ))}
            </Sidebar>
          </Card>
          <Card>
            <CardHeader>Canvas</CardHeader>
            <Marathon
              test={
                allTestCases[this.state.group].children[this.state.test].marathon as ((a: MarathonEnvironment) => void)
              }
              timeout={2000}
            />
          </Card>
        </Grid>
      </OperationalUI>
    )
  }
}

export default App
