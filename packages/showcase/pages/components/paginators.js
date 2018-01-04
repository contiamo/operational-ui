import * as React from "react"
import { Paginator, Card, CardHeader, Heading2Type } from "@operational/components"

import Layout from "../../components/Layout"
import Table from "../../components/PropsTable"
import Playground from "../../components/Playground"

const PaginatorSnippet = `
(() => {
  class ComponentWithPaginator extends React.Component {
    state = {
      page: 1
    }

    handleChange(page) {
      this.setState(() => ({ page }))
    }

    render() {
      return <Paginator pageCount={30} page={this.state.page} onChange={page => this.handleChange(page)} />
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <ComponentWithPaginator />
    </div>
  )
})()
`

const propDescription = [
  {
    name: "pageCount",
    description: "Total number of pages.",
    defaultValue: null,
    type: "number",
    optional: false
  },
  {
    name: "maxVisible",
    description: "Maximum amount of pages to be displayed.",
    defaultValue: "3",
    type: "number",
    optional: true
  },
  {
    name: "page",
    description: "Index of the current selected page",
    defaultValue: "1",
    type: "number",
    optional: true
  },
  {
    name: "onChange",
    description:
      "Function to be executed after changing page. Receives a single argument which represents the new page number",
    defaultValue: "void",
    type: "function",
    optional: true
  }
]

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>Simple component to navigate through pages</p>

      <Heading2Type>Usage</Heading2Type>
      <Playground snippet={String(PaginatorSnippet)} components={{ Paginator }} />

      <Heading2Type>Props</Heading2Type>
      <Table props={propDescription} />
    </Card>
  </Layout>
)
