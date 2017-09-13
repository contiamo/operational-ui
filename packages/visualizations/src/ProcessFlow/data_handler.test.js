import node from "./node"
import dataHandler from "./data_handler"

test("setNodeAccessors", () => {
  const handler = new dataHandler()
  const accessors = {
    color: node => (node.id === "2" ? "green" : "purple"),
    colorGroup: node => "group " + node.id,
    id: node => "node" + node.id,
    label: node => "Node id: " + node.id,
    size: node => 5,
    stroke: node => "blue",
  }
  handler.setNodeAccessors(accessors)
  let testNode = new node({ id: "1" }, accessors)
  expect(testNode.color()).toBe("purple")
  expect(testNode.colorGroup()).toBe("group 1")
  expect(testNode.id()).toBe("node1")
  expect(testNode.label()).toBe("Node id: 1")
  expect(testNode.size()).toBe(5)
  expect(testNode.stroke()).toBe("blue")
})
