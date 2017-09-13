import node from "./node"
import nodeAccessors from "./node_accessors"
import link from "./link"
import linkAccessors from "./link_accessors"
import { bind, map, forEach, find, times, extend } from "lodash/fp"
import { TNode, TLink, TJourney, TData, TInputData, TLinkAttrs, TAccessors } from "./typings"

class DataHandler {
  journeys: TJourney[]
  nodes: TNode[]
  links: TLink[]
  nodeAccessors: TAccessors
  linkAccessors: TAccessors

  prepareData(data: TInputData): TData {
    this.journeys = data.journeys
    this.initializeNodes(data)
    this.initializeLinks(data)
    return {
      nodes: this.nodes,
      journeys: this.journeys,
      links: this.links
    }
  }

  initializeNodes(data: TInputData): void {
    this.setNodeAccessors(data.nodeAccessors)
    this.nodes = map(bind(this.addNode, this))(data.nodes)
    forEach(function(node: TNode): void {
      node.sourceLinks = []
      node.targetLinks = []
    })(this.nodes)
    this.calculateNodeSizes()
  }

  findNode(nodeId: string): TNode {
    return find(function(node: TNode): boolean {
      return node.id() === nodeId
    })(this.nodes)
  }

  setNodeAccessors(accessors: TAccessors) {
    this.nodeAccessors = new nodeAccessors()
    this.nodeAccessors.setAccessors(accessors)
  }

  addNode(attrs: {}): TNode {
    extend.convert({ immutable: false })(attrs, { size: 0 })
    return new node(attrs, this.nodeAccessors.accessors)
  }

  calculateNodeSizes(): void {
    const that: DataHandler = this
    forEach(function(journey: TJourney): void {
      forEach(function(nodeId: string): void {
        that.findNode(nodeId).attributes.size += journey.size
      })(journey.path)
    })(this.journeys)
  }

  initializeLinks(data: TInputData): void {
    this.setLinkAccessors(data.linkAccessors)
    this.computeLinks()
  }

  // @TODO why is there a type error if the method output has type TLink?
  findLink(sourceId: string, targetId: string): any {
    const checkIds: any = function(link: TLink): boolean {
      return link.sourceId() === sourceId && link.targetId() === targetId
    }
    return find(checkIds)(this.links)
  }

  setLinkAccessors(accessors: TAccessors): void {
    this.linkAccessors = new linkAccessors()
    this.linkAccessors.setAccessors(accessors)
  }

  addLink(attrs: TLinkAttrs): TLink {
    return new link(attrs, this.linkAccessors.accessors)
  }

  computeLinks(): void {
    this.links = []
    const that: DataHandler = this
    forEach(function(journey: TJourney): void {
      const path: string[] = journey.path
      const computeLink: any = function(i: number): void {
        const sourceId: string = path[i]
        const targetId: string = path[i + 1]
        const sourceNode: TNode = that.findNode(sourceId)
        const targetNode: TNode = that.findNode(targetId)

        const existingLink: TLink = that.findLink(sourceId, targetId)
        if (existingLink) {
          existingLink.attributes.size += journey.size
        } else {
          const linkAttrs: TLinkAttrs = {
            source: sourceNode,
            sourceId: sourceNode.id(),
            target: targetNode,
            targetId: targetNode.id(),
            size: journey.size
          }
          const newLink: TLink = that.addLink(linkAttrs)
          that.links.push(newLink)
          sourceNode.sourceLinks.push(newLink)
          targetNode.targetLinks.push(newLink)
        }
      }
      times(computeLink)(path.length - 1)
    })(this.journeys)
  }
}

export default DataHandler
