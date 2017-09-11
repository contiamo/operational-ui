import { hexOrColor, readableTextColor, darken } from "../color"

describe("Color utils", () => {
  it("Should give me a hex code or a color presented by name", () => {
    expect(hexOrColor("red")("#fff")).toEqual("#fff")
  })
  it("Should give me a readable text color against a presented background color", () => {
    expect(readableTextColor("black")(["white", "black"])).toEqual("#ffffff")
    expect(readableTextColor("white")(["white", "black"])).toEqual("#000000")
  })
  it("Should darken a color by a percentage", () => {
    expect(darken("#ffffff")(50)).toEqual("#808080")
  })
})
