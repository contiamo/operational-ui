import { ProcessFlow } from "contiamo-visualizations"
import { IMarathon } from "../../../../components/Marathon/Marathon"

const data1: any = {
  journeys: [
    { path: ["1", "2", "3", "4"], size: 1500 },
    { path: ["1", "2", "3", "5", "4"], size: 1200 },
    { path: ["1", "7", "5", "8"], size: 700 },
    { path: ["9", "2", "3", "8"], size: 600 },
    { path: ["1", "2", "5", "6", "10"], size: 230 },
    { path: ["1", "2", "3", "6", "11"], size: 130 },
    { path: ["1", "2", "3", "4", "10"], size: 290 },
    { path: ["1", "2", "3", "12", "10"], size: 120 },
    { path: ["1", "2", "3", "4", "13"], size: 620 }
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
    { id: "13", group: "end" }
  ]
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
    { path: ["1", "2", "3", "4", "13"], size: 620 }
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
    { id: "13", group: "end" }
  ]
}

const marathon = ({ test, afterAll, container }: IMarathon): void => {
  const viz: ProcessFlow = new ProcessFlow(container)

  test("Renders a process flow with no data", () => {
    viz.draw()
  })

  test("Renders a process flow with an empty dataset", () => {
    viz.data({})
    viz.draw()
  })

  test("Adds data", () => {
    viz.data(data1)
    viz.draw()
  })

  test("Updates the data", () => {
    viz.data(data2)
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export default { marathon, title: "data updates" }
