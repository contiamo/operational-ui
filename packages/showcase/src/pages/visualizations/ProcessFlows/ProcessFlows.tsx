import * as React from "react"
import { Card, CardHeader } from "@operational/components"

import Marathon from "../../../components/Marathon/Marathon"
import * as cases from "./cases/index"

export interface IProps {
  match: {
    params: {
      case?: string
    }
  }
}

const ProcessFlowCases: React.SFC<IProps> = (props: IProps) => {
  const case_: string = props.match.params.case
  return (
    <Card>
      <CardHeader>Process Flow Visualization</CardHeader>
      <Marathon test={(cases as any)[case_].marathon} timeout={2e3} />
    </Card>
  )
}

export { ProcessFlowCases }
