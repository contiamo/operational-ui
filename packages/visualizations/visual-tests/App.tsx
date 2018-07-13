import * as React from "react"
import styled from "react-emotion"
import { Sunburst, VisualizationWrapper } from "@operational/visualizations"

import {
  OperationalUI,
  OperationalStyleConstants,
  Layout,
  Button,
  Icon,
  Card,
  CardHeader,
  HeaderBar,
  Sidenav,
  SidenavHeader,
  SidenavItem,
  Small,
  ContiamoLogo,
  Page,
} from "@operational/components"

import Marathon, { MarathonEnvironment } from "./Marathon"
import MarathonRenderer from "./MarathonRenderer"
import allTestCases, { fromHash, toHash } from "./TestCases"

export interface State {
  group: number
  test: number
  isLooping: boolean
  isIdle: boolean
}

const TestToggle = styled("span")(
  ({ theme, active }: { theme?: OperationalStyleConstants; active: boolean }): {} => ({
    display: "inline-block",
    marginRight: 16,
    padding: "2px 4px",
    cursor: "pointer",
    borderRadius: active ? 2 : 0,
    color: active ? theme.color.white : theme.color.primary,
    backgroundColor: active ? theme.color.primary : theme.color.white,
    borderBottom: "1px solid currentColor",
  }),
)

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    const indicesFromHash = fromHash(window.location.hash)(allTestCases)
    this.state = {
      group: indicesFromHash ? indicesFromHash.groupIndex : 0,
      test: indicesFromHash ? indicesFromHash.testIndex : 0,
      isLooping: false,
      isIdle: false,
    }
  }

  componentDidMount() {
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
      test: indicesFromHash.testIndex,
    }))
  }

  syncRoute() {
    const hash = toHash({
      groupIndex: this.state.group,
      testIndex: this.state.test,
    })(allTestCases)
    if (hash !== window.location.hash) {
      history.pushState(null, null, hash)
    }
  }

  loop() {
    const reachedEnd = this.state.test >= allTestCases[this.state.group].children.length - 1
    setTimeout(() => {
      this.setState(prevState => ({
        test: reachedEnd ? 0 : prevState.test + 1,
      }))
    }, 2000)
  }

  render() {
    const test = allTestCases[this.state.group].children[this.state.test].marathon
    return (
      <OperationalUI withBaseStyles>
        <Layout
          header={<HeaderBar main={<h3>Visual Tests</h3>} logo={<ContiamoLogo />} />}
          sidenav={
            <Sidenav>
              {allTestCases.map((test, groupIndex) => (
                <SidenavHeader
                  key={groupIndex}
                  label={test.title}
                  active
                  onToggle={() => {
                    this.setState(() => ({
                      group: groupIndex,
                      test: 0,
                    }))
                  }}
                >
                  {test.children.map((test, testIndex) => (
                    <SidenavItem
                      key={testIndex}
                      active={groupIndex === this.state.group && testIndex === this.state.test}
                      onClick={() => {
                        this.setState(() => ({
                          test: testIndex,
                        }))
                      }}
                      label={test.title}
                    />
                  ))}
                </SidenavHeader>
              ))}
            </Sidenav>
          }
          main={
            <Page
              title="Canvas"
              actions={
                <>
                  <Button
                    icon="Open"
                    condensed
                    color="ghost"
                    to={`https://github.com/contiamo/operational-ui/tree/master/packages/visual-tests/src/TestCases/${
                      allTestCases[this.state.group].folder
                    }/${allTestCases[this.state.group].children[this.state.test].slug}.ts`}
                  >
                    View Code
                  </Button>
                  <Button
                    condensed
                    color={this.state.isLooping ? "white" : "info"}
                    onClick={() => {
                      if (!this.state.isLooping && this.state.isIdle) {
                        this.loop()
                      }
                      this.setState(prevState => ({
                        isLooping: !prevState.isLooping,
                        isIdle: !prevState.isLooping ? false : prevState.isIdle,
                      }))
                    }}
                  >
                    {this.state.isLooping ? "Pause" : "Loop"}
                  </Button>
                </>
              }
            >
              <Card>
                <Marathon
                  test={test}
                  onCompleted={() => {
                    if (!this.state.isLooping && !this.state.isIdle) {
                      this.setState(prevState => ({
                        isIdle: true,
                      }))
                      return
                    }
                    if (this.state.isLooping) {
                      this.loop()
                    }
                  }}
                  timeout={2000}
                >
                  {MarathonRenderer}
                </Marathon>
              </Card>
            </Page>
          }
        />
      </OperationalUI>
    )
  }
}

export default App
