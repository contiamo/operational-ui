import * as React from "react"
import { forEach } from "lodash/fp"

class Wrapper extends React.Component {
  viz: any
  containerNode: HTMLElement
  props: {
    facade: any,
    accessors?: any,
    data?: any,
    config?: any
  }

  render() {
    return <div className="Visualization" ref={containerNode => this.containerNode = containerNode} />
  }

  componentDidMount() {
    this.viz = new this.props.facade(this.containerNode)
    this.updateViz()
    this.viz.draw()
  }

  componentDidUpdate() {
    this.updateViz()
    this.viz.draw()
  }

  updateViz() {
    this.viz.data(this.props.data || {})
    forEach.convert({ cap: false })((accessors: any, key: string): void => {
      this.viz.accessors(key, accessors)
    })(this.props.accessors)
    this.viz.config(this.props.config || {})
  }

  componentWillUnmount() {
    this.viz.close()
  }
}

export default Wrapper
