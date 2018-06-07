import { drop, dropRight, forEach, indexOf, map, uniq } from "lodash/fp"
import { Journey } from "../ProcessFlow/typings"

type Path = string[]

type NodesList = string[]

interface Node {
  linkedToFrom: string[]
}

interface Nodes {
  [id: string]: Node
}

const nodes: Nodes = {}

function findNode(nodeId: string): Node {
  if (!nodes[nodeId]) {
    nodes[nodeId] = { linkedToFrom: [] }
  }
  return nodes[nodeId]
}

function getSourcesRecursively(sources: NodesList): NodesList {
  const numberOfLinks: number = sources.length
  let sourcesList: NodesList = sources
  forEach(
    (sourceId: string): void => {
      sourcesList = sourcesList.concat(findNode(sourceId).linkedToFrom)
    },
  )(sources)
  const uniqueSources = uniq(sourcesList)

  return uniqueSources.length > numberOfLinks ? getSourcesRecursively(uniqueSources) : uniqueSources
}

function isLinkedToFrom(sourceId: string, targetId: string): boolean {
  const sourceNodes: NodesList = findNode(sourceId).linkedToFrom
  const sourceLinkedToFrom: NodesList = getSourcesRecursively(sourceNodes)
  return sourceId === targetId || sourceLinkedToFrom.indexOf(targetId) > -1
}

function removeLoops(path: Path): Path {
  let i = 1,
    newPath: Path = path
  function checkForLoops(pathLeft: Path): void {
    let suffix = ""
    const sourceNodeId: string = pathLeft[0],
      targetNodeId: string = pathLeft[1]
    let remainingPath = drop(1)(pathLeft)
    if (isLinkedToFrom(sourceNodeId, targetNodeId)) {
      suffix = "+"
      remainingPath = map((nodeId: string): string => nodeId + suffix)(remainingPath)
      newPath = dropRight(newPath.length - i)(newPath).concat(remainingPath)
    }
    const targetNode: Node = findNode(targetNodeId + suffix)
    targetNode.linkedToFrom = uniq(targetNode.linkedToFrom.concat(dropRight(newPath.length - i)(newPath)))
    i = i + 1
    if (remainingPath.length > 1) {
      checkForLoops(remainingPath)
    }
  }
  checkForLoops(newPath)
  return newPath
}

export default (journeys: Journey[]): Journey[] => {
  forEach(
    (journey: Journey): void => {
      journey.path = removeLoops(journey.path)
    },
  )(journeys)
  return journeys
}
