import * as React from "react"
import { Card, CardHeader } from "contiamo-ui-components"
import { ProcessFlow, VisualizationWrapper } from "contiamo-visualizations"
import * as cases from "./cases/index"

interface IProps {
  match: {
    params: {
      case: string
    }
  }
}

const ProcessFlowContainer: React.SFC<IProps> = props => {
  const case_: string = props.match.params.case
  const config: any = (cases as any)[case_].config || {}
  const accessors: any = (cases as any)[case_].accessors || {}
  const data: any = (cases as any)[case_].data || {}
  return (
    <Card>
      <CardHeader>Process Flow Visualization</CardHeader>
      <VisualizationWrapper facade={ProcessFlow} data={data} accessors={accessors} config={config} />
    </Card>
  )
}

export default ProcessFlowContainer
