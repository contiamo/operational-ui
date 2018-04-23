import * as React from "react"
import glamorous from "glamorous"
import { Sunburst, VisualizationWrapper } from "@operational/visualizations"
import { Theme } from "@operational/theme"
import {
  OperationalUI,
  Button,
  Icon,
  Card,
  CardHeader,
  Grid,
  Sidebar,
  SidebarHeader,
  SmallType,
  SidebarItem
} from "@operational/components"

import Marathon, { MarathonEnvironment } from "./components/Marathon"
import allTestCases, { fromHash, toHash } from "./TestCases"

export interface State {
  group: number
  test: number
  isLooping: boolean
  isIdle: boolean
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

const LoopButton = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  width: 60,
  height: 60,
  color: theme.colors.white,
  position: "fixed",
  bottom: theme.spacing * 1.5,
  right: theme.spacing * 1.5,
  backgroundColor: theme.colors.navBackground,
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}))

class App extends React.Component<{}, State> {
  state = {
    group: 0,
    test: 0,
    isLooping: false,
    isIdle: false
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

  loop() {
    const reachedEnd = this.state.test >= allTestCases[this.state.group].children.length - 1
    setTimeout(() => {
      this.setState(prevState => ({
        test: reachedEnd ? 0 : prevState.test + 1
      }))
    }, 2000)
  }

  render() {
    return (
      <OperationalUI withBaseStyles>
        <React.Fragment>
          <LoopButton
            onClick={() => {
              if (!this.state.isLooping && this.state.isIdle) {
                this.loop()
              }
              this.setState(prevState => ({
                isLooping: !prevState.isLooping,
                isIdle: !prevState.isLooping ? false : prevState.isIdle
              }))
            }}
          >
            <Icon name={this.state.isLooping ? "Pause" : "RefreshCcw"} size={30} />
          </LoopButton>
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
              <CardHeader>
                Canvas
                <a
                  href={`https://github.com/contiamo/operational-ui/tree/master/packages/visual-tests/src/TestCases/${
                    allTestCases[this.state.group].folder
                  }/${allTestCases[this.state.group].children[this.state.test].slug}.ts`}
                >
                  <SmallType>View code for this test</SmallType>
                </a>
              </CardHeader>
              <Marathon
                test={allTestCases[this.state.group].children[this.state.test].marathon}
                onCompleted={() => {
                  if (!this.state.isLooping && !this.state.isIdle) {
                    this.setState(prevState => ({
                      isIdle: true
                    }))
                    return
                  }
                  if (this.state.isLooping) {
                    this.loop()
                  }
                }}
                timeout={2000}
              />
            </Card>
          </Grid>
        </React.Fragment>
      </OperationalUI>
    )
  }
}

export default App
