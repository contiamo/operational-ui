export default {
  data: {
    journeys: [
      {
        path: ["5", "10", "4"],
        size: 118709
      },
      {
        path: ["5", "7", "10", "4"],
        size: 117621
      },
      {
        path: ["5", "7", "4"],
        size: 78091
      },
      {
        path: ["5", "7", "6", "4"],
        size: 41050
      },
      {
        path: ["5", "791", "4"],
        size: 39558
      },
      {
        path: ["9", "5", "4"],
        size: 36235
      },
      {
        path: ["9", "5", "7", "6", "4"],
        size: 33409
      },
      {
        path: ["9", "5", "7", "4"],
        size: 27733
      },
      {
        path: ["30", "22", "20", "1"],
        size: 26777
      },
      {
        path: ["5", "10", "27", "1"],
        size: 24974
      },
      {
        path: ["5", "7", "15", "10", "4"],
        size: 24128
      },
      {
        path: ["21", "14", "4"],
        size: 22451
      },
      {
        path: ["5", "10", "55", "1"],
        size: 20195
      },
      {
        path: ["21", "14", "32", "1"],
        size: 18902
      },
      {
        path: ["5", "1", "20+", "1+"],
        size: 18463
      }
    ],
    nodes: [
      {
        id: "5",
        label: "Main_10002_1",
        group: "start"
      },
      {
        id: "10",
        label: "VIVR_10000"
      },
      {
        id: "4",
        label: "Abandoned",
        group: "end"
      },
      {
        id: "7",
        label: "Main_20001"
      },
      {
        id: "6",
        label: "CatchAll_10001"
      },
      {
        id: "791",
        label: "MainVIVR_10001"
      },
      {
        id: "9",
        label: "Main_10001",
        group: "start"
      },
      {
        id: "30",
        label: "HiCard_MAIN_10002",
        group: "start"
      },
      {
        id: "22",
        label: "HiCard_MAIN_10003"
      },
      {
        id: "20",
        label: "HiCard_MAIN_20000"
      },
      {
        id: "1",
        label: "Call",
        group: "end"
      },
      {
        id: "27",
        label: "Mobile_Prem_10001"
      },
      {
        id: "15",
        label: "Main_31000"
      },
      {
        id: "21",
        label: "Main_10000",
        group: "start"
      },
      {
        id: "14",
        label: "Main_20000"
      },
      {
        id: "55",
        label: "Mobile_20101"
      },
      {
        id: "32",
        label: "Main_30000"
      },
      {
        id: "1+",
        label: "1+",
        group: "end"
      },
      {
        id: "20+",
        label: "20+"
      }
    ]
  },
  accessors: {
    node: {
      labelPosition: (node: any) => {
        const positionBelow: string[] = ["21", "14", "20", "55"]
        return positionBelow.indexOf(node.id) > -1 ? "bottom" : "top"
      }
    }
  }
}
