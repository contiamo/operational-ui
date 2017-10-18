import * as React from "react"
import { Card, CardHeader } from "contiamo-ui-components"
import { ProcessFlow, VisualizationWrapper } from "contiamo-visualizations"
import Marathon from "../../../components/Marathon/Marathon"
import * as cases from "./cases/index"

import marathon from "./ProcessFlows.marathon"

interface IProps {
  match: {
    params: {
      case?: string
    }
  }
}

const ProcessFlowCase = ({ case: case_ }: { case: string }) => {
  const config: any = (cases as any)[case_].config || {}
  const accessors: any = (cases as any)[case_].accessors || {}
  const data: any = (cases as any)[case_].data || {}
  return <VisualizationWrapper facade={ProcessFlow} data={data} accessors={accessors} config={config} />
}

const ProcessFlowCases: React.SFC<IProps> = (props: IProps) => {
  const case_: string = props.match.params.case
  return (
    <Card>
      <CardHeader>Process Flow Visualization</CardHeader>
      <ProcessFlowCase case={case_} />
    </Card>
  )
}

const ProcessFlowTest: React.SFC<{}> = () => (
  <Card>
    <CardHeader>Process Flow visual test cases</CardHeader>
    <Marathon test={marathon} timeout={2000} />
  </Card>
)

export { ProcessFlowCases, ProcessFlowTest }
