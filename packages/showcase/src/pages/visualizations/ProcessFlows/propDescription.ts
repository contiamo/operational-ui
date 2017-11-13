export default {
  Config: [
    {
      name: "borderColor",
      description:
        "Color of border surrounding nodes and links. Should be the same color as the visualization background.",
      defaultValue: "#fff",
      type: "string",
      optional: true
    },
    {
      name: "duration",
      description: "Speed at which transitions are animated",
      defaultValue: "1e3",
      type: "number",
      optional: true
    },
    {
      name: "focusElement",
      description:
        'Node or link to be manually focussed. Object with properties "type" ("node" or "link") and "matchers" (desired values of node/link properties)',
      defaultValue: "",
      type: "object",
      optional: true
    },
    {
      name: "height",
      description: "Visualization height",
      defaultValue: "Infinity",
      type: "number",
      optional: true
    },
    {
      name: "hidden",
      description: "Hide/show the visualization div",
      defaultValue: "false",
      type: "boolean",
      optional: true
    },
    {
      name: "highlightColor",
      description: "Color with with nodes/links are highlighted on hover",
      defaultValue: "#1499CE",
      type: "string",
      optional: true
    },
    {
      name: "horizontalNodeSpacing",
      description: "Horizontal distance between nodes, if width is set to Infinity",
      defaultValue: "100",
      type: "number",
      optional: true
    },
    {
      name: "labelOffset",
      description: "Distance between nodes/links and corresponding text/focus labels",
      defaultValue: "2",
      type: "number",
      optional: true
    },
    {
      name: "linkBorderWidth",
      description: "Width of border on either side of links (to facilitate hovering)",
      defaultValue: "4",
      type: "number",
      optional: true
    },
    {
      name: "maxLinkWidth",
      description: "Width of largest links",
      defaultValue: "8",
      type: "number",
      optional: true
    },
    {
      name: "maxNodeSize",
      description: "Size of largest nodes in square pixels",
      defaultValue: "1500",
      type: "number",
      optional: true
    },
    {
      name: "minLinkWidth",
      description: "Width of smallest links",
      defaultValue: "1",
      type: "number",
      optional: true
    },
    {
      name: "minNodeSize",
      description: "Size of smallest nodes in square pixels",
      defaultValue: "100",
      type: "number",
      optional: true
    },
    {
      name: "nodeBorderWidth",
      description: "Width of border around nodes",
      defaultValue: "10",
      type: "number",
      optional: true
    },
    {
      name: "showLinkFocusLabels",
      description: "Enable/disable focus labels on link hover",
      defaultValue: "true",
      type: "boolean",
      optional: true
    },
    {
      name: "showNodeFocusLabels",
      description: "Enable/disable focus labels on node hover",
      defaultValue: "true",
      type: "boolean",
      optional: true
    },
    {
      name: "uid",
      description:
        "Unique identifier for the visualization, normally generated automatically from the visualization name",
      defaultValue: "",
      type: "string",
      optional: true
    },
    {
      name: "verticalNodeSpacing",
      description: "Vertical distance between nodes, if height is set to Infinity",
      defaultValue: "100",
      type: "number",
      optional: true
    },
    {
      name: "visualizationName",
      description: "Name of visualization",
      defaultValue: "processflow",
      type: "string",
      optional: true
    },
    {
      name: "width",
      description: "Visualization width",
      defaultValue: "Infinity",
      type: "number",
      optional: true
    }
  ],
  DataAccessors: [
    {
      name: "nodes",
      description: "Provides the attribute name for accessing nodes in the input data",
      defaultValue: "data.nodes",
      type: "string",
      optional: true
    },
    {
      name: "journeys",
      description: "Provides the attribute name for accessing journeys in the input data",
      defaultValue: "data.journeys",
      type: "string",
      optional: true
    }
  ],
  NodeAccessors: [
    {
      name: "color",
      description: "Node fill color",
      defaultValue: 'node.color || "#fff"',
      type: "string",
      optional: true
    },

    {
      name: "shape",
      description: "Node shape",
      defaultValue: 'node.shape || "squareDiamond"',
      type: "string",
      optional: true
    },

    {
      name: "size",
      description: "Value for determining node size",
      defaultValue: "node.size || 1",
      type: "number",
      optional: true
    },

    {
      name: "stroke",
      description: "Color of node border",
      defaultValue: 'node.stroke || "#000"',
      type: "string",
      optional: true
    },

    {
      name: "id",
      description: "Unique ID - defaults to a new unique string.",
      defaultValue: 'node.id || uniqueId("node")',
      type: "string",
      optional: true
    },

    {
      name: "label",
      description: "Label to display next to node/on focus labels",
      defaultValue: 'node.label || node.id || ""',
      type: "string",
      optional: true
    },

    {
      name: "labelPosition",
      description: "Node label position",
      defaultValue: 'node.labelPosition || "right"',
      type: "string",
      optional: true
    }
  ],
  LinkAccessors: [
    {
      name: "dash",
      description: 'Dash length of link. "<dashLength> <gapLength>". 0 is solid line',
      defaultValue: 'link.dash || "0"',
      type: "string",
      optional: true
    },
    {
      name: "label",
      description: "Label to display next to link.",
      defaultValue: 'link.label || link.source.label() + " → " + link.target.label() || ""',
      type: "string",
      optional: true
    },
    {
      name: "size",
      description: "Value for determining width of link",
      defaultValue: "link.size || 1",
      type: "number",
      optional: true
    },
    {
      name: "stroke",
      description: "Color of link",
      defaultValue: 'link.stroke || "#bbb"',
      type: "string",
      optional: true
    },
    {
      name: "source",
      description: "Node at which the link starts",
      defaultValue: "link.source || undefined",
      type: "node",
      optional: true
    },
    {
      name: "sourceId",
      description: "ID of node at which the link starts",
      defaultValue: "link.sourceId || undefined",
      type: "string",
      optional: true
    },
    {
      name: "target",
      description: "Node at which the link ends",
      defaultValue: "link.target || undefined",
      type: "node",
      optional: true
    },
    {
      name: "targetId",
      description: "ID of node at which the link ends",
      defaultValue: "link.targetId || undefined",
      type: "string",
      optional: true
    }
  ]
}
