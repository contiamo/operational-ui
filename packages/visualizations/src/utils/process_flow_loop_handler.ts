import { drop, dropRight, forEach, indexOf, map, uniq } from "lodash/fp"

export type TPath = string[]

export type TNodesList = string[]

export interface IJourney {
  path: TPath
  size: number
}

export interface INode {
  linkedToFrom: string[]
}

export interface INodes {
  [id: string]: INode
}

const nodes: INodes = {}

function findNode(nodeId: string): INode {
  if (!nodes[nodeId]) {
    nodes[nodeId] = { linkedToFrom: [] }
  }
  return nodes[nodeId]
}

function getSourcesRecursively(sources: TNodesList): TNodesList {
  const numberOfLinks: number = sources.length
  let sourcesList: TNodesList = sources
  forEach((sourceId: string): void => {
    sourcesList = sourcesList.concat(findNode(sourceId).linkedToFrom)
  })(sources)
  const uniqueSources = uniq(sourcesList)

  return uniqueSources.length > numberOfLinks ? getSourcesRecursively(uniqueSources) : uniqueSources
}

function isLinkedToFrom(sourceId: string, targetId: string): boolean {
  const sourceNodes: TNodesList = findNode(sourceId).linkedToFrom
  const sourceLinkedToFrom: TNodesList = getSourcesRecursively(sourceNodes)
  return sourceId === targetId || sourceLinkedToFrom.indexOf(targetId) > -1
}

function removeLoops(path: TPath): TPath {
  let i = 1,
    newPath: TPath = path
  function checkForLoops(pathLeft: TPath): void {
    let suffix = ""
    const sourceNodeId: string = pathLeft[0],
      targetNodeId: string = pathLeft[1]
    let remainingPath = drop(1)(pathLeft)
    if (isLinkedToFrom(sourceNodeId, targetNodeId)) {
      suffix = "+"
      remainingPath = map((nodeId: string): string => nodeId + suffix)(remainingPath)
      newPath = dropRight(newPath.length - i)(newPath).concat(remainingPath)
    }
    const targetNode: INode = findNode(targetNodeId + suffix)
    targetNode.linkedToFrom = uniq(targetNode.linkedToFrom.concat(dropRight(newPath.length - i)(newPath)))
    i = i + 1
    if (remainingPath.length > 1) {
      checkForLoops(remainingPath)
    }
  }
  checkForLoops(newPath)
  return newPath
}

export default (journeys: IJourney[]): IJourney[] => {
  forEach((journey: IJourney): void => {
    journey.path = removeLoops(journey.path)
  })(journeys)
  return journeys
}
