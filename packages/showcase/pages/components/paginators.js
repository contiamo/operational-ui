import * as React from "react"
import { Paginator, Card, CardHeader } from "@operational/components"

import { Layout, Props, Playground, StaticContent } from "../../components"

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
      <p>
        Pagination is an easy-to-use, predictable and expressive way to handle datasets that don't fit in a single view.
        They are a straightforward alternative to infinite scrolling and lazy-loading interface elements, which take a
        long time to get cross-browser effective and accessible. This page describes how to use Operational UI's
        paginators.
      </p>

      <h2>Usage</h2>
      <Playground snippet={PaginatorSnippet} components={{ Paginator }} />
    </Card>
    <Card />
    <Card>
      <CardHeader>Props</CardHeader>
      <Props props={propDescription} />
    </Card>
  </Layout>
)
