import * as React from "react"
import { withTheme } from "glamorous"
import { forEach } from "lodash/fp"
import { Theme } from "@operational/theme"

export interface IProps {
  style?: {}
  className?: string
  facade: any
  accessors?: any
  data?: any
  config?: any
}

export interface IPropsWithTheme extends IProps {
  theme: Theme
}

class VisualizationWrapperInternal extends React.Component<IPropsWithTheme, {}> {
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
    // Work with the theme here
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

const VisualizationWrapper = (props: IPropsWithTheme) => <VisualizationWrapperInternal {...props} />

const WrappedVisualizationWrapper = withTheme(VisualizationWrapper) as React.SFC<IProps>

export default WrappedVisualizationWrapper
