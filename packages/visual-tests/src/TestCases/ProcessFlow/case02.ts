import { ProcessFlow } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const data1 = {
  journeys: [
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
  nodes: [
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

const data2: any = {
  journeys: [
    { path: ["1", "2", "3", "4"], size: 1500 },
    { path: ["1", "2", "3", "5", "4"], size: 1200 },
    { path: ["1", "7", "5", "8"], size: 700 },
    { path: ["9", "2", "3", "8"], size: 600 },
    { path: ["1", "2", "5", "6", "11"], size: 230 },
    { path: ["1", "2", "3", "6", "11"], size: 130 },
    { path: ["1", "2", "3", "4", "11"], size: 290 },
    { path: ["1", "2", "3", "12", "11"], size: 120 },
    { path: ["1", "2", "3", "4", "13"], size: 620 },
    { path: ["4"], size: 23 },
  ],
  nodes: [
    { id: "1", group: "start" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
    { id: "8", group: "end" },
    { id: "9", group: "start" },
    { id: "11", group: "end" },
    { id: "12" },
    { id: "13", group: "end" },
  ],
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz = new ProcessFlow(container)

  test("Focuses a link", () => {
    viz.data(data1)
    viz.config({
      focusElement: {
        type: "link",
        matchers: { sourceId: "3", targetId: "5" },
      },
    })
    viz.accessors("node", {
      label: (node: any) => `Node ${node.id}`,
    })
    viz.draw()
  })

  test("Removes focus", () => {
    viz.config({ focusElement: {} })
    viz.draw()
  })

  test("Focuses a node", () => {
    viz.data(data2)
    viz.config({
      focusElement: {
        type: "node",
        matchers: { id: "3" },
      },
    })
    viz.accessors("node", {
      label: (node: any) => `Node ${node.id}`,
      content: (node: any) => [
        { key: "Description", value: "This is a node." },
        { key: "Comment", value: "This comment is boring." },
      ],
    })
    viz.draw()
  })

  test("Focuses a journey", () => {
    viz.config({
      focusElement: {
        type: "path",
        matchers: { path: ["9", "2", "3", "8"] },
      },
    })
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title = "Element Focussing"

// Must match the file name so we can link to the code on GitHub
export const slug = "case02"
