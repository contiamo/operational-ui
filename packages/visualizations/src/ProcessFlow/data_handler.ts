import Node from "./node"
import NodeAccessors from "./node_accessors"
import Link from "./link"
import LinkAccessors from "./link_accessors"
import { bind, map, forEach, find, times, extend } from "lodash/fp"
import { TNode, TLink, IJourney, IData, IInputData, ILinkAttrs, TAccessors, IState, IBreakdown } from "./typings"

class DataHandler {
  journeys: IJourney[]
  nodes: TNode[]
  links: TLink[]
  nodeAccessors: TAccessors
  linkAccessors: TAccessors
  state: IState

  constructor(state: IState) {
    this.state = state
  }

  prepareData(): IData {
    const data = this.state.current.get("data")
    const accessors: any = this.state.current.get("accessors")
    this.journeys = accessors.data.journeys(data)
    this.setNodeAccessors(accessors.node)
    this.setLinkAccessors(accessors.link)
    this.initializeNodes(data)
    this.initializeLinks(data)
    this.computeBreakdowns()
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

  setNodeAccessors(accessors: TAccessors) {
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

  computeLinks(): void {
    forEach((journey: IJourney): void => {
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
    })(this.journeys)
  }

  computeBreakdowns(): void {
    forEach((node: TNode): void => {
      node.inputsBreakdown = map((link: TLink): IBreakdown => {
        const size: number = link.size()
        return {
          label: link.source().label(),
          size: size,
          percentage: Math.round(size * 100 / node.size())
        }
      })(node.targetLinks)
      node.outputsBreakdown = map((link: TLink): IBreakdown => {
        const size: number = link.size()
        return {
          label: link.target().label(),
          size: size,
          percentage: Math.round(size * 100 / node.size())
        }
      })(node.sourceLinks)
    })(this.nodes)
  }
}

export default DataHandler
