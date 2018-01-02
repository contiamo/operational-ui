import * as React from "react"
import { forEach } from "lodash/fp"

export interface IProps {
  style?: {}
  className?: string
  facade: any
  accessors?: any
  data?: any
  config?: any
}

class VisualizationWrapper extends React.Component<IProps, {}> {
  viz: any
  containerNode: HTMLElement

  render() {
    return (
      <div
        style={this.props.style}
        className={`${this.props.className ? `${this.props.className} ` : ""}Visualization`}
        ref={containerNode => (this.containerNode = containerNode)}
      />
    )
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

export default VisualizationWrapper
