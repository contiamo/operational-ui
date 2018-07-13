import * as React from "react"
import { operational } from "@operational/theme"
import { defaults, flatten, flow, map, uniq } from "lodash/fp"

const containerNode = document.getElementById("app")

import ProcessFlow from "../../src/ProcessFlow/facade"
import unloop from "../../src/utils/process_flow_loop_handler"

const data = {
  journeys: [
    {
      path: ["8", "61", "68", "10", "24", "59", "31", "14", "154", "41", "53", "15", "85", "48", "47", "6", "9"],
      size: 1,
    },
    {
      path: ["10", "68", "8", "15", "6", "48", "24", "47", "41", "14", "75", "24", "196"],
      size: 1,
    },
    {
      path: ["6", "14", "10", "14", "225", "24", "75", "6", "8", "68", "75", "3", "26"],
      size: 1,
    },
    {
      path: ["59", "31", "6", "14", "75", "8", "41", "47", "48", "53", "85", "61", "31", "68", "10", "31", "24"],
      size: 1,
    },
    {
      path: ["41", "24", "75", "8", "15", "10", "16", "6", "25", "68"],
      size: 1,
    },
    {
      path: ["14", "6", "20", "10", "168", "37", "106", "8", "133", "202", "21"],
      size: 1,
    },
    {
      path: [
        "5",
        "42",
        "2",
        "5",
        "42",
        "59",
        "31",
        "24",
        "6",
        "41",
        "48",
        "31",
        "54",
        "16",
        "68",
        "8",
        "10",
        "53",
        "85",
        "61",
        "47",
        "9",
      ],
      size: 1,
    },
    {
      path: ["15", "8", "25", "68", "193", "225", "10", "6", "16", "24", "54", "9"],
      size: 1,
    },
    {
      path: ["48", "31", "59", "75", "24", "6", "10", "68", "8", "61", "85", "53", "41", "47"],
      size: 1,
    },
    {
      path: ["26", "21", "35", "202", "6", "14", "133", "106", "37", "168", "10", "8"],
      size: 1,
    },
    {
      path: ["10", "8", "54", "59", "31", "24", "85", "53", "47", "48", "61", "41", "16", "68", "6", "9"],
      size: 1,
    },
    {
      path: [
        "53",
        "48",
        "6",
        "61",
        "41",
        "47",
        "85",
        "31",
        "75",
        "24",
        "14",
        "59",
        "31",
        "8",
        "10",
        "68",
        "2",
        "50",
        "34",
      ],
      size: 1,
    },
    {
      path: [
        "17",
        "12",
        "4",
        "10",
        "53",
        "47",
        "48",
        "61",
        "8",
        "68",
        "85",
        "6",
        "16",
        "59",
        "75",
        "31",
        "24",
        "41",
        "12",
        "9",
      ],
      size: 1,
    },
    {
      path: ["10", "106", "199", "16", "6", "202", "203", "10", "21", "37", "168", "8", "15", "20", "9"],
      size: 1,
    },
    {
      path: ["31", "59", "24", "54", "41", "53", "61", "47", "48", "85", "6", "10", "16", "8", "68", "9"],
      size: 1,
    },
  ],
  nodes: [
    {
      label: "Contingency",
      group: "ivr",
      id: "10",
      size: 0,
    },
    {
      label: "CBA_0031",
      group: "ivr",
      id: "68",
      size: 0,
    },
    {
      label: "CatchAll_10001",
      group: "ivr",
      id: "8",
      size: 0,
    },
    {
      label: "Main_20001",
      group: "ivr",
      id: "15",
      size: 0,
    },
    {
      label: "Main_10002_1",
      group: "ivr",
      id: "6",
      size: 0,
    },
    {
      label: "Mandatory_10009",
      group: "ivr",
      id: "48",
      size: 0,
    },
    {
      label: "NonMobile_10001",
      group: "ivr",
      id: "24",
      size: 0,
    },
    {
      label: "Mandatory_10008",
      group: "ivr",
      id: "47",
      size: 0,
    },
    {
      label: "Mandatory_10001",
      group: "ivr",
      id: "41",
      size: 0,
    },
    {
      label: "VIVR_10000",
      group: "ivr",
      id: "14",
      size: 0,
    },
    {
      label: "NonMobile_20013",
      group: "ivr",
      id: "75",
      size: 0,
    },
    {
      label: "Mandatory_10006",
      group: "ivr",
      id: "196",
      size: 0,
    },
    {
      label: "Main_31000",
      group: "ivr",
      id: "25",
      size: 0,
    },
    {
      label: "Home_Adhoc_Menu",
      group: "ivr",
      id: "193",
      size: 0,
    },
    {
      label: "Update Billing Address",
      group: "app",
      id: "225",
      size: 0,
    },
    {
      label: "Main_10001",
      group: "ivr",
      id: "16",
      size: 0,
    },
    {
      label: "NonMobile_20012",
      group: "ivr",
      id: "54",
      size: 0,
    },
    {
      label: "icon",
      group: "icon",
      id: "9",
      size: 0,
    },
    {
      label: "Touch ID Activity Type: 'Authenticate'",
      group: "app",
      id: "3",
      size: 0,
    },
    {
      label: "Main Menu",
      group: "vivr",
      id: "26",
      size: 0,
    },
    {
      label: "SMART_LineTest",
      group: "ivr",
      id: "59",
      size: 0,
    },
    {
      label: "SMART_10053",
      group: "ivr",
      id: "31",
      size: 0,
    },
    {
      label: "Mandatory_10007",
      group: "ivr",
      id: "53",
      size: 0,
    },
    {
      label: "Mandatory_LineTest_10002",
      group: "ivr",
      id: "85",
      size: 0,
    },
    {
      label: "Mandatory_LineTest_10001",
      group: "ivr",
      id: "61",
      size: 0,
    },
    {
      label: "Mobile_10001",
      group: "ivr",
      id: "20",
      size: 0,
    },
    {
      label: "Mobile_Press0_30002",
      group: "ivr",
      id: "168",
      size: 0,
    },
    {
      label: "Mobile_Press0_20004",
      group: "ivr",
      id: "37",
      size: 0,
    },
    {
      label: "MobSrvAuth_30001",
      group: "ivr",
      id: "106",
      size: 0,
    },
    {
      label: "MobSrvAuth_10001",
      group: "ivr",
      id: "133",
      size: 0,
    },
    {
      label: "Mob_VAS_10012",
      group: "ivr",
      id: "202",
      size: 0,
    },
    {
      label: "Mobile_Press0_10001",
      group: "ivr",
      id: "21",
      size: 0,
    },
    {
      label: "Get Local Plan Info",
      group: "app",
      id: "5",
      size: 0,
    },
    {
      label: "VisitVouchers",
      group: "app",
      id: "42",
      size: 0,
    },
    {
      label: "Get Roaming Usage",
      group: "app",
      id: "2",
      size: 0,
    },
    {
      label: "NonMobile_20003",
      group: "ivr",
      id: "154",
      size: 0,
    },
    {
      label: "Mobile_10002",
      group: "ivr",
      id: "35",
      size: 0,
    },
    {
      label: "Roaming Information (Roaming Rates)",
      group: "app",
      id: "50",
      size: 0,
    },
    {
      label: "Roaming UserGuide And Rates",
      group: "app",
      id: "34",
      size: 0,
    },
    {
      label: "Get Bill Summary",
      group: "app",
      id: "17",
      size: 0,
    },
    {
      label: "Get PDF Bill",
      group: "app",
      id: "12",
      size: 0,
    },
    {
      label: "Get Bill Accounts",
      group: "app",
      id: "4",
      size: 0,
    },
    {
      label: "MobSrvAuth_10002",
      group: "ivr",
      id: "199",
      size: 0,
    },
    {
      label: "MobSrvAuth_20001",
      group: "ivr",
      id: "203",
      size: 0,
    },
  ],
}

const journeys = unloop(data.journeys)

const nodeIds = flow(
  map((journey: any): string[] => journey.path),
  flatten,
  uniq,
)(journeys)

const nodes = map((nodeId: string) => {
  const baseId: string = nodeId.split("+")[0]
  const baseNode = data.nodes.find(d => d.id === baseId)
  return defaults(baseNode)({ id: nodeId })
})(nodeIds)

const viz: ProcessFlow = new ProcessFlow(containerNode)

viz.data({ journeys, nodes })

viz.accessors("node", {
  label: (d: any) => `Node id: ${d.id}`,
})

viz.config({
  focusElement: {
    type: "path",
    matchers: {
      path: ["9", "2", "3", "8"],
    },
    hideLabel: false,
  },
})

viz.draw()
