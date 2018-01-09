import * as React from "react"
import glamorous from "glamorous"
import { Card, CardHeader, Heading2Type } from "@operational/components"
import { ProcessFlow, VisualizationWrapper } from "@operational/visualizations"

import Layout from "../../../components/Layout"
import Table from "../../../components/PropsTable"
import Playground from "../../../components/Playground"
import Marathon from "../../../components/Marathon"

import testcases from "../../../components/TestCases/ProcessFlow/index"

const TestToggle = glamorous.span(({ theme, active }) => ({
  display: "inline-block",
  marginRight: 16,
  padding: "2px 4px",
  cursor: "pointer",
  borderRadius: active ? 2 : 0,
  color: active ? theme.colors.white : theme.colors.linkText,
  backgroundColor: active ? theme.colors.linkText : theme.colors.white,
  borderBottom: "1px solid currentColor"
}))

export default class TestCases extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      case: 0
    }
  }

  render() {
    return (
      <Layout pathname={this.props.url.pathname}>
        <Card>
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
            <Marathon test={testcases[this.state.case].marathon} timeout={2000} />
          ) : null}
        </Card>
      </Layout>
    )
  }
}
