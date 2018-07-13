import { ProcessFlow } from "@operational/visualizations"
import { MarathonEnvironment } from "../../Marathon"

const data = {
  journeys: [
    {
      path: ["5", "10", "4"],
      size: 122054,
    },
    {
      path: ["5", "7", "10", "4"],
      size: 118325,
    },
    {
      path: ["5", "7", "4"],
      size: 77356,
    },
    {
      path: ["5", "7", "6", "4"],
      size: 41014,
    },
    {
      path: ["5", "791", "4"],
      size: 38696,
    },
    {
      path: ["9", "5", "4"],
      size: 36091,
    },
    {
      path: ["9", "5", "7", "6", "4"],
      size: 34405,
    },
    {
      path: ["5", "10", "27", "1"],
      size: 32414,
    },
    {
      path: ["30", "22", "20", "1"],
      size: 30753,
    },
    {
      path: ["9", "5", "7", "4"],
      size: 27341,
    },
    {
      path: ["5", "10", "55", "1"],
      size: 26573,
    },
    {
      path: ["5", "7", "15", "10", "4"],
      size: 24780,
    },
    {
      path: ["21", "14", "4"],
      size: 22196,
    },
    {
      path: ["21", "14", "32", "1"],
      size: 19242,
    },
    {
      path: ["5", "1", "20+", "1+"],
      size: 18020,
    },
  ],
  nodes: [
    {
      label: "Main_10002_1",
      group: "start",
      id: "5",
      size: 0,
    },
    {
      label: "VIVR_10000",
      group: "10",
      id: "10",
      size: 0,
    },
    {
      label: "Abandoned",
      group: "end",
      id: "4",
      size: 0,
    },
    {
      label: "Main_20001",
      group: "7",
      id: "7",
      size: 0,
    },
    {
      label: "CatchAll_10001",
      group: "6",
      id: "6",
      size: 0,
    },
    {
      label: "MainVIVR_10001",
      group: "source",
      id: "791",
      size: 0,
    },
    {
      label: "Main_10001",
      group: "start",
      id: "9",
      size: 0,
    },
    {
      label: "Mobile_Prem_10001",
      group: "27",
      id: "27",
      size: 0,
    },
    {
      label: "Call",
      group: "end",
      id: "1",
      size: 0,
    },
    {
      label: "HiCard_MAIN_10002",
      group: "start",
      id: "30",
      size: 0,
    },
    {
      label: "HiCard_MAIN_10003",
      group: "22",
      id: "22",
      size: 0,
    },
    {
      label: "HiCard_MAIN_20000",
      group: "20",
      id: "20",
      size: 0,
    },
    {
      label: "Mobile_20101",
      group: "55",
      id: "55",
      size: 0,
    },
    {
      label: "Main_31000",
      group: "15",
      id: "15",
      size: 0,
    },
    {
      label: "Main_10000",
      group: "start",
      id: "21",
      size: 0,
    },
    {
      label: "Main_20000",
      group: "14",
      id: "14",
      size: 0,
    },
    {
      label: "Main_30000",
      group: "32",
      id: "32",
      size: 0,
    },
    {
      label: "HiCard_MAIN_20000",
      group: "20",
      id: "20+",
      size: 0,
    },
    {
      label: "Call",
      group: "end",
      id: "1+",
      size: 0,
    },
  ],
}

export const marathon = ({ test, afterAll, container }: MarathonEnvironment): void => {
  const viz: ProcessFlow = new ProcessFlow(container)

  test("Renders a process flow", () => {
    viz.data(data)
    viz.config({ width: undefined, horizontalNodeSpacing: undefined })
    viz.draw()
  })

  test("Renders a process flow", () => {
    viz.config({ width: 500, horizontalNodeSpacing: 500 })
    viz.draw()
  })

  afterAll(() => {
    viz.close()
  })
}

export const title = "Undefined Config Options"

// Must match the file name so we can link to the code on GitHub
export const slug = "case06"
