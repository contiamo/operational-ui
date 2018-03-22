import * as React from "react"
import glamorous from "glamorous"
import { Sunburst, VisualizationWrapper } from "@operational/visualizations"
import { Theme } from "@operational/theme"
import { OperationalUI, Button, Card, CardHeader, Grid } from "@operational/components"

import Marathon, { IMarathon } from "./components/Marathon"

import allTestCases from "./TestCases"

const testcases = allTestCases[2]

interface State {
  case: number | null
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
    case: 0
  }

  render() {
    return (
      <OperationalUI withBaseStyles>
        <Grid type="IDE">
          <Card>
            <CardHeader>Tests</CardHeader>
          </Card>
          <Card>
            <CardHeader>Canvas</CardHeader>
            {testcases.map((testcase, index) => (
              <TestToggle
                active={index === this.state.case}
                key={index}
                onClick={() => {
                  this.setState(p => ({
                    case: null
                  }))
                  setTimeout(() => {
                    this.setState(p => ({
                      case: index
                    }))
                  }, 50)
                }}
              >
                {testcase.title}
              </TestToggle>
            ))}
            {this.state.case || this.state.case === 0 ? (
              <Marathon test={testcases[this.state.case].marathon as ((a: IMarathon) => void)} timeout={2000} />
            ) : null}
          </Card>
        </Grid>
      </OperationalUI>
    )
  }
}

export default App
