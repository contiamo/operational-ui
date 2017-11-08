import {
  drop,
  dropRight,
  forEach,
  indexOf,
  map,
  uniq,
} from "lodash/fp"

export type TPath = string[]

type TNodesList = string[]

export interface IJourney {
  path: TPath
  size: number
}

interface INode {
  linkedToFrom: string[]
}

interface INodes {
  [id: string]: INode;
}

let nodes: INodes = {}

function findNode(nodeId: string): INode {
  if (!nodes[nodeId]) {
    nodes[nodeId] = { linkedToFrom: [] }
  }
  return nodes[nodeId]
}

function getSourcesRecursively(sources: TNodesList): TNodesList {
  const numberOfLinks: number = sources.length
  forEach((sourceId: string): void => {
    forEach((linkedSource: string): void => {
      if (indexOf(linkedSource)(sources) < 0) {
        sources.push(linkedSource)
      }
    })(findNode(sourceId).linkedToFrom)
  })(sources)

  if (sources.length > numberOfLinks) {
    return getSourcesRecursively(sources)
  } else {
    return sources
  }
}

function isLinkedToFrom(sourceId: string, targetId: string): boolean {
  let sourceNodes: TNodesList = findNode(sourceId).linkedToFrom
  const sourceLinkedToFrom: TNodesList = getSourcesRecursively(sourceNodes)
  return sourceLinkedToFrom.indexOf(targetId) > -1
}

function removeLoops(path: TPath): TPath {
  let i = 1
  function checkForLoops(pathLeft: TPath): void {
    let suffix = ""
    let sourceNodeId: string = pathLeft[0]
    let targetNodeId: string = pathLeft[1]
    let remainingPath = drop(1)(pathLeft)
    if (isLinkedToFrom(sourceNodeId, targetNodeId)) {
      suffix = "+"
      remainingPath = map((nodeId: string): string => nodeId + suffix)(remainingPath)
      path = dropRight(path.length - i)(path).concat(remainingPath)
    }
    let targetNode: INode = findNode(targetNodeId + suffix)
    targetNode.linkedToFrom = uniq(targetNode.linkedToFrom.concat(dropRight(path.length - i)(path)))
    i++
    if (remainingPath.length > 1) {
      checkForLoops(remainingPath)
    }
  }
  checkForLoops(path)
  return path
}

export default (journeys: IJourney[]): IJourney[] => {
  forEach((journey: IJourney): void => {
    journey.path = removeLoops(journey.path)
  })(journeys)
  return journeys
}
