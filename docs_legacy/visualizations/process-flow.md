# Process Flows

Process flow visualizations are designed to show the paths taken through a set of process steps (represented by nodes).

Processes are assumed to be linear, i.e. there should be a set order in which steps can be passed through. If, for instance, "Step A" sometimes comes before "Step B" and sometimes after, this is condsidered to be a loop. The visualization will throw an error if there are loops in the data. Loops can be removed from the data before it is passed to the visualization by passing it through the ProcessFlowLoopHandler component of the "@operational/visualizations" package.

## Usage

Here is a simple usage scenario for the process flow:

```js
class Flow extends React.Component {
  state = {
    config: {
      maxNodeSize: 800,
      nodeBorderWidth: 4
    },
    data: {
      journeys: [{ path: ["1", "3", "4"], size: 1500 }, { path: ["2", "3", "4"], size: 1200 }],
      nodes: [{ id: "1", group: "start" }, { id: "2", group: "start" }, { id: "3" }, { id: "4", group: "end" }]
    },
    accessors: {
      node: {
        color: (node: any) => {
          if (node.group === "start") {
            return "lightgreen"
          }
          if (node.group === "end") {
            return "lightcoral"
          }
          return "#fff"
        },
        shape: (node: any) => {
          if (node.group === "start") {
            return "square"
          }
          if (node.group === "end") {
            return "circle"
          }
          return "squareDiamond"
        },
        stroke: (node: any) => {
          return node.group ? "none" : "#000"
        }
      },
      link: {
        stroke: (link: any) => {
          if (link.source.attributes.group === "start") {
            return "lightgreen"
          }
          if (link.target.attributes.group === "end") {
            return "lightcoral"
          }
          return "#bbb"
        }
      }
    }
  }
  render() {
    return (
      <VisualizationWrapper
        facade={ProcessFlow}
        data={this.state.data}
        accessors={this.state.accessors}
        config={this.state.config}
      />
    )
  }
}
`

For more complicated use-cases, check out our collection of [visual test cases](/visualizations/process-flow/testcases).

## Data

The input data should be an object with properties 'journeys' and 'nodes' (alternative names can only be used if the data accessors are then set accordingly: see below).

`data.journeys` is an array of objects, with each object representing a single journey. Each journey object should have the following properties:
* path - an array of node id strings
* size - the journey count

`data.nodes` is an array of node objects. All nodes referenced in a journey path must be included here. Every node object must have an 'id' property that corresponds to the ids used in the journey paths.

## Accessors

Accessors are used to tell the visualization about data structure (data accessors), and to determine how individual nodes and individual links should be rendered (node and link accessors). Rendering options that must apply to all nodes and links are set via the config.

Accessors can take 2 forms: a function with single parameter 'd', or a constant value, which is transformed within the visualization into function which returns the given constant. Custom accessors must be exhaustive: if the returned values are dependent on some condition(s), all possible outcomes of the condition(s) must be explicitly dealt with.

## Data Accessors

Data accessors are required if the nodes and journeys can not be accessed from the input data via the properties 'nodes' and 'journeys'.

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| nodes | Provides the attribute name for accessing nodes in the input data | string | d => d.nodes | Yes |
| journeys | Provides the attribute name for accessing journeys in the input data | string | d => d.journeys | Yes |

## Node Accessors

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| color | Node fill color | string | `d => d.color || "#fff"` | Yes |
| shape | Node shape | string | d => d.shape || "squareDiamond" | Yes |
| size | Value for determining node size | number | `d => d.size || 1` | Yes |
| stroke | Color of node border | string | d => d.stroke || "#000" | Yes |
| id | Unique ID - defaults to a new unique string. | string | `d => d.id || uniqueId("node")` | Yes |
| label | Label to display next to node/on focus labels | string | `d => d.label || d.id || ""` | Yes |
| labelPosition | Node label position - "auto", "top", "bottom", "left", "right" or "middle" | string | `d => d.labelPosition || "auto"` | Yes |

## Link Accessors

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| dash | Dash length of link. "<dashLength> <gapLength>". 0 is solid line | string | d => d.dash || "0" | Yes |
| label | Label to display next to link. | string | `d => d.label || d.source.label() + " → " + d.target.label() || ""` | Yes |
| size | Value for determining width of link | number | d => d.size || 1 | Yes |
| stroke | Color of link | string | `d => d.stroke || "#bbb"` | Yes |
| source | Node at which the link starts | node | `d => d.source || undefined` | Yes |
| sourceId | ID of node at which the link starts | string | `d => d.sourceId || undefined` | Yes |
| target | Node at which the link ends | node | `d => d.target || undefined` | Yes |
| targetId | ID of node at which the link ends | string | `d => d.targetId || undefined` | Yes |

## Config

| Name | Description | Type | Default | Required | 
| :--- | :--- | :--- | :---| :--- |
| borderColor | Color of border surrounding nodes and links. Should be the same color as the visualization background. | string | #fff | Yes |
| duration | Speed at which transitions are animated | number | 1e3 | Yes |
| focusElement | Node, link or path to be manually focussed. Object with properties "type" ("node", "link" or "path") and "matchers" (desired values of node/link properties) | object |  | Yes |
| height | Visualization height | number | Infinity | Yes |
| hidden | Hide/show the visualization div | boolean | false | Yes |
| highlightColor | Color with with nodes/links are highlighted on hover | string | #1499CE | Yes |
| horizontalNodeSpacing | Horizontal distance between nodes, if width is set to Infinity | number | 100 | Yes |
| labelOffset | Distance between nodes/links and corresponding text/focus labels | number | 2 | Yes |
| linkBorderWidth | Width of border on either side of links (to facilitate hovering) | number | 4 | Yes |
| maxLinkWidth | Width of largest links | number | 8 | Yes |
| maxNodeSize | Size of largest nodes in square pixels | number | 1500 | Yes |
| minLinkWidth | Width of smallest links | number | 1 | Yes |
| minNodeSize | Size of smallest nodes in square pixels | number | 100 | Yes |
| nodeBorderWidth | Width of border around nodes | number | 10 | Yes |
| showLinkFocusLabels | Enable/disable focus labels on link hover | boolean | true | Yes |
| showNodeFocusLabels | Enable/disable focus labels on node hover | boolean | true | Yes |
| uid | Unique identifier for the visualization, normally generated automatically from the visualization name | string |  | Yes |
| verticalNodeSpacing | Vertical distance between nodes, if height is set to Infinity | number | 100 | Yes |
| visualizationName | Name of visualization | string | processflow | Yes |
| width | Visualization width | number | Infinity | Yes |
