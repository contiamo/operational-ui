import { readableTextColor, darken, lighten, setBrightness } from "../color"

xdescribe("Color utils", () => {
  it("Should give me a readable text color against a presented background color", () => {
    expect(readableTextColor("black", ["white", "black"])).toEqual("#ffffff")
    expect(readableTextColor("white", ["white", "black"])).toEqual("#000000")
  })
  it("Should give white readable color for light saturated background colors", () => {
    expect(readableTextColor("#689F2C", ["white", "black"])).toEqual("#ffffff")
    expect(readableTextColor("#1499CE", ["white", "black"])).toEqual("#ffffff")
    expect(readableTextColor("#FFAE00", ["white", "black"])).toEqual("#ffffff")
    expect(readableTextColor("#DE1A1A", ["white", "black"])).toEqual("#ffffff")
  })

  it("Should darken a color by a percentage", () => {
    expect(darken("#ffffff", 50)).toEqual("#808080")
  })

  it("Should lighten a color by a percentage", () => {
    expect(lighten("#808080", 50)).toEqual("#ffffff")
  })

  it("Should set a color's value", () => {
    expect(setBrightness("#BBB", 187)).toEqual("#bbbbbb")
    expect(setBrightness("#CCC", 150)).toEqual("#888888")
  })
})
