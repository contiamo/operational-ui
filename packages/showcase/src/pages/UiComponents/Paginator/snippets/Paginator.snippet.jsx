import * as React from "react"
import { Paginator } from "@operational/components"

export default (() => {
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
