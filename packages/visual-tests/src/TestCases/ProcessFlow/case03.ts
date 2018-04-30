import { ProcessFlow } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const data = {
  journeyList: [
    { path: ["1", "2", "3", "4"], size: 1500 },
    { path: ["1", "2", "3", "5", "4"], size: 1200 },
    { path: ["1", "7", "5", "8"], size: 700 },
    { path: ["9", "2", "3", "8"], size: 600 },
    { path: ["1", "2", "5", "6", "10"], size: 230 },
    { path: ["1", "2", "3", "6", "11"], size: 130 },
    { path: ["1", "2", "3", "4", "10"], size: 290 },
    { path: ["1", "2", "3", "12", "10"], size: 120 },
    { path: ["1", "2", "3", "4", "13"], size: 620 },
  ],
  nodeList: [
    { id: "1", group: "start" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
    { id: "8", group: "end" },
    { id: "9", group: "start" },
    { id: "10", group: "end" },
    { id: "11", group: "end" },
    { id: "12" },
    { id: "13", group: "end" },
  ],
}

const groupAccessorValue: any = {
  start: {
    color: "green",
    shape: "diamond",
    size: 500,
    stroke: "darkgreen",
    labelPosition: "top",
  },
  end: {
    color: "red",
    shape: "square",
    size: 800,
    stroke: "darkred",
    labelPosition: "bottom",
  },
}

const dataAccessors: any = {
  nodes: (data: any) => data.nodeList,
  journeys: (data: any) => data.journeyList,
}

const nodeAccessors: any = {
  color: (d: any) => {
    return d.group ? groupAccessorValue[d.group].color : "#fff"
  },
  shape: (d: any) => {
    return d.group ? groupAccessorValue[d.group].shape : "squareDiamond"
  },
  size: (d: any) => {
    return d.group ? groupAccessorValue[d.group].size : d.size || 1
  },
  stroke: (d: any) => {
    return d.group ? groupAccessorValue[d.group].stroke : "#000"
  },
  labelPosition: (d: any) => {
    return d.group ? groupAccessorValue[d.group].labelPosition : "top"
  },
  label: (d: any) => {
    return `${d.id}: an excessively long label to check overlap behaviour`
  },
}

const linkAccessors: any = {
  stroke: (link: any) => (link.size > 1000 ? "blue" : "#bbb"),
  dash: "10 2",
  size: 2,
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new ProcessFlow(container)

  test("Renders viz with data accessors", () => {
    viz.data(data)
    viz.accessors("data", dataAccessors)
    viz.draw()
  })

  test("Adds node accessors", () => {
    viz.accessors("node", nodeAccessors)
    viz.draw()
  })

  test("Adds link accessors", () => {
    viz.accessors("link", linkAccessors)
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title = "Accessor Testing"

// Must match the file name so we can link to the code on GitHub
export const slug = "case03"
