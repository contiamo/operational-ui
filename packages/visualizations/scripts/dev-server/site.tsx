import * as React from "react"
import { render } from "react-dom"
import { forEach } from "lodash/fp"
import { injectStylesheet, baseStylesheet } from "@operational/utils"
import { contiamoTheme } from "@operational/theme"

injectStylesheet(baseStylesheet(contiamoTheme))

const containerNode = document.getElementById("app")

import ProcessFlow from "../../src/ProcessFlow/facade"

const data = {
  journeys: [{ path: ["1", "3", "4"], size: 1500 }, { path: ["2", "3", "4"], size: 1200 }],
  nodes: [{ id: "1", group: "start" }, { id: "2", group: "start" }, { id: "3" }, { id: "4", group: "end" }]
}

const accessors = {
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

const config = {
  maxNodeSize: 800,
  nodeBorderWidth: 4,
  focusElement: { type: "node", matchers: { id: "3" }}
}

const viz = new ProcessFlow(containerNode)

viz.data(data)
forEach.convert({ cap: false })((accessors: any, key: string): void => {
  viz.accessors(key, accessors)
})(accessors)
viz.config(config)

viz.draw()
