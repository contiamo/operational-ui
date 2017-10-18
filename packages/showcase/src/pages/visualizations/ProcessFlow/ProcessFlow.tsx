import * as React from "react"
import { Card, CardHeader } from "contiamo-ui-components"
import * as caseData from "./data/index"
import { ProcessFlow, VisualizationWrapper } from "contiamo-visualizations"

interface IProps {
  match: {
    params: {
      case: string
    }
  }
}

const ProcessFlowContainer: React.SFC<IProps> = props => {
  const case_: string = props.match.params.case
  const config: any = (caseData as any)[case_].config || {}
  const accessors: any = (caseData as any)[case_].accessors || {}
  const data: any = (caseData as any)[case_].data || {}
  return (
    <Card>
      <CardHeader>Process Flow Visualization</CardHeader>
      <VisualizationWrapper facade={ProcessFlow} data={data} accessors={accessors} config={config} />
    </Card>
  )
}

export default ProcessFlowContainer
