import * as React from "react"
import { withTheme } from "glamorous"
import { defaults, forEach } from "lodash/fp"
import { Theme } from "@operational/theme"

export interface Props {
  style?: {}
  className?: string
  facade: any
  accessors?: any
  data?: any
  config?: any
}

export interface PropsWithTheme extends Props {
  theme: Theme
}

class VisualizationWrapperInternal extends React.Component<PropsWithTheme, {}> {
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
    this.viz.config(defaults({ palette: this.props.theme.colors.visualizationPalette })(this.props.config || {}))
  }

  componentWillUnmount() {
    this.viz.close()
  }
}

const VisualizationWrapper = (props: PropsWithTheme) => <VisualizationWrapperInternal {...props} />

const WrappedVisualizationWrapper = withTheme(VisualizationWrapper) as React.SFC<Props>

export default WrappedVisualizationWrapper
