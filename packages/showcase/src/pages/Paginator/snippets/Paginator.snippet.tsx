import * as React from "react"
import { Paginator } from "@contiamo/ui"

export default (() => {
  class ComponentWithPaginator extends React.Component {
    state = {
      page: 1
    }

    handleChange (page: number): void {
      this.setState(() => ({ page }))
    }

    render () {
      return (
        <Paginator
          pageCount={10}
          maxVisible={5}
          selected={this.state.page}
          onChange={page => this.handleChange(page)}
        />
      )
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <ComponentWithPaginator />
    </div>
  )
})()