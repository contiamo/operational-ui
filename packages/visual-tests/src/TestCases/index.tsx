import pieChartTestCases from "./PieChart"
import processFlowTestCases from "./ProcessFlow"
import sunburstTestCases from "./Sunburst"

import { TestSuiteGroup } from "./types"
import { MarathonEnvironment } from "../components/Marathon"

const testGroups: TestSuiteGroup[] = [
  { title: "Pie Charts", slug: "pie-charts", children: pieChartTestCases },
  { title: "Process Flow", slug: "process-flow-charts", children: processFlowTestCases },
  { title: "Sunburst charts", slug: "sunburst", children: sunburstTestCases }
]

export default testGroups
export { fromHash, toHash } from "./utils"
