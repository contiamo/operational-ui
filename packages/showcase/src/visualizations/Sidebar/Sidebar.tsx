import * as React from "react"
import { Sidebar, SidebarItem, SidebarLink } from "contiamo-ui-components"

type Props = {
  location?: {
    pathname: string
  }
  css: {}
}

const paths: {
  [key: string]: Array<string>
} = {
  processFlow: ["/case01"],
  barChart: [""],
}

export default ({ location, css }: Props) => (
  <Sidebar css={css}>
    <SidebarItem open={location && paths.processFlow.includes(location.pathname)} label="Process Flow">
      <SidebarLink to="/visualizations/processFlow/case01">Case 1</SidebarLink>
    </SidebarItem>
    <SidebarItem open={location && paths.barChart.includes(location.pathname)} label="Bar chart" />
  </Sidebar>
)
