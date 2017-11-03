import Node from "./node"
import NodeAccessors from "./node_accessors"
import Link from "./link"
import LinkAccessors from "./link_accessors"
import Layout from "./layout"
import { bind, map, forEach, find, times, extend, groupBy, flow, sortBy } from "lodash/fp"
import { TNode, TLink, IJourney, IData, IInputData, ILinkAttrs, TAccessors, IState, IBreakdown, IConfig, TStateWriter } from "./typings"

class DataHandler {
  journeys: IJourney[]
  nodes: TNode[]
  links: TLink[]
  nodeAccessors: TAccessors
  linkAccessors: TAccessors
  state: IState
  stateWriter: TStateWriter
  layout: Layout

  constructor(state: IState, stateWriter: TStateWriter) {
    this.state = state
    this.stateWriter = stateWriter
    this.layout = new Layout(state)
  }

  prepareData(): IData {
    const data = this.state.current.get("data")
    const accessors: any = this.state.current.get("accessors")
    this.journeys = accessors.data.journeys(data)
    this.setNodeAccessors(accessors.node)
    this.setLinkAccessors(accessors.link)
    this.initializeNodes(data)
    this.initializeLinks(data)
    this.layout.computeLayout(this.nodes)
    this.positionNodes()
    return {
      nodes: this.nodes,
      journeys: this.journeys,
      links: this.links,
    }
  }

  initializeNodes(data: IInputData): void {
    const accessors: any = this.state.current.get("accessors")
    this.nodes = map(bind(this.addNode, this))(accessors.data.nodes(data))
    forEach((node: TNode): void => {
      node.sourceLinks = []
      node.targetLinks = []
    })(this.nodes)
    this.calculateNodeSizes()
    this.calculateStartsAndEnds()
  }

  findNode(nodeId: string): TNode {
    const node: TNode = find((node: TNode): boolean => {
      return node.id() === nodeId
    })(this.nodes)
    if (!node) {
      throw new Error("No node with id '" + nodeId + "' defined.")
    }
    return node
  }

  setNodeAccessors(accessors: TAccessors): void {
    this.nodeAccessors = new NodeAccessors()
    this.nodeAccessors.setAccessors(accessors)
  }

  addNode(attrs: {}): TNode {
    extend.convert({ immutable: false })(attrs, { size: 0 })
    return new Node(attrs, this.nodeAccessors.accessors)
  }

  calculateNodeSizes(): void {
    forEach((journey: IJourney): void => {
      forEach((nodeId: string): void => {
        this.findNode(nodeId).attributes.size += journey.size
      })(journey.path)
    })(this.journeys)
  }

  calculateStartsAndEnds(): void {
    forEach((journey: IJourney): void => {
      if (journey.path.length > 1) {
        this.findNode(journey.path[0]).journeyStarts += journey.size
        this.findNode(journey.path[journey.path.length - 1]).journeyEnds += journey.size
      } else {
        this.findNode(journey.path[0]).singleNodeJourneys += journey.size
      }
    })(this.journeys)
  }

  initializeLinks(data: IInputData): void {
    this.links = []
    this.computeLinks()
  }

  // @TODO why is there a type error if the method output has type TLink?
  findLink(sourceId: string, targetId: string): any {
    const checkIds: any = (link: TLink): boolean => {
      return link.sourceId() === sourceId && link.targetId() === targetId
    }
    return find(checkIds)(this.links)
  }

  setLinkAccessors(accessors: TAccessors): void {
    this.linkAccessors = new LinkAccessors()
    this.linkAccessors.setAccessors(accessors)
  }

  addLink(attrs: ILinkAttrs): TLink {
    return new Link(attrs, this.linkAccessors.accessors)
  }

  computeJourneyLinks(journey: IJourney): void {
    const path: string[] = journey.path
    const computeLink: (i: number) => void = (i: number): void => {
      const sourceId: string = path[i]
      const targetId: string = path[i + 1]
      const sourceNode: TNode = this.findNode(sourceId)
      const targetNode: TNode = this.findNode(targetId)

      const existingLink: TLink = this.findLink(sourceId, targetId)
      if (existingLink) {
        existingLink.attributes.size += journey.size
      } else {
        const linkAttrs: ILinkAttrs = {
          source: sourceNode,
          sourceId: sourceNode.id(),
          target: targetNode,
          targetId: targetNode.id(),
          size: journey.size,
        }
        const newLink: TLink = this.addLink(linkAttrs)
        this.links.push(newLink)
        sourceNode.sourceLinks.push(newLink)
        targetNode.targetLinks.push(newLink)
      }
    }
    times(computeLink)(path.length - 1)
  }

  computeLinks(): void {
    forEach(this.computeJourneyLinks)(this.journeys)
  }

  xGridSpacing(): number {
    const config: IConfig = this.state.current.get("config"),
      finiteWidth: boolean = isFinite(config.width),
      xValues: number[] = map((node: TNode): number => node.x)(this.layout.nodes),
      maxX: number = xValues.length > 0 ? Math.max(...xValues) : 0,
      spacing: number = finiteWidth
        ? Math.min(config.width / (maxX + 1), config.horizontalNodeSpacing)
        : config.horizontalNodeSpacing

    this.stateWriter(["width"], finiteWidth ? config.width : spacing * (maxX + 1))
    return spacing
  }

  yGridSpacing(nRows: number): number {
    const config: IConfig = this.state.current.get("config"),
      finiteHeight: boolean = isFinite(config.height),
      spacing: number = isFinite(config.height)
        ? Math.min(config.height / (nRows + 1), config.verticalNodeSpacing)
        : config.verticalNodeSpacing

    this.stateWriter(["height"], finiteHeight ? config.height : spacing * (nRows + 1))
    return spacing
  }

  positionNodes(): void {
    let nodesByRow: {}[] = groupBy("y")(this.layout.nodes)
    const rows: string[] = Object.keys(nodesByRow),
      xGridSpacing: number = this.xGridSpacing(),
      yGridSpacing: number = this.yGridSpacing(rows.length)

    // Assign y values
    forEach((node: TNode): void => {
      node.y = (node.y + 1) * yGridSpacing
    })(this.layout.nodes)

    // Assign x values
    forEach((row: string): void => {
      flow(
        sortBy((node: TNode): number => node.x),
        forEach((node: TNode): void => {
          node.x *= xGridSpacing
        }),
      )(nodesByRow[parseInt(row, 10)])
    })(rows)
  }
}

export default DataHandler
