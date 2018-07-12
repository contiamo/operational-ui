import { colorMapper } from "../color"

describe("ColorMapper", () => {
  it("should deterministically assign colors to strings", () => {
    const colors = ["#fff", "#000", "#ccc", "#333", "#666", "#999"]
    const mapToColor = colorMapper(colors)
    expect(mapToColor("Tejas")).toEqual("#666")
    expect(mapToColor("Imogen")).toEqual("#666")
    expect(mapToColor("Peter")).toEqual("#999")
    expect(mapToColor("Fabien")).toEqual("#666")
    expect(mapToColor("Kasi")).toEqual("#333")
    expect(mapToColor("Michael")).toEqual("#ccc")
    expect(mapToColor("Tejas")).toEqual("#666")
    expect(mapToColor("Ian")).toEqual("#000")
    expect(mapToColor("Chris")).toEqual("#ccc")
    expect(mapToColor("Lucia")).toEqual("#333")
    expect(mapToColor("Nick")).toEqual("#ccc")
    expect(mapToColor("Nic")).toEqual("#333")
  })
})
