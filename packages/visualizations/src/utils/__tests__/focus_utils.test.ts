import { calculateLabelPosition, verticalCenter, horizontalCenter } from "../focus_utils"

describe("focus utils", () => {
  it("calculateLabelPosition, switching sides", () => {
    const label = { width: 100, height: 50 }
    const drawing = { xMin: 25, xMax: 275, yMin: 25, yMax: 275 }
    const offset = 5
    expect(calculateLabelPosition({ x: 145, y: 100 }, label, drawing, offset, "toRight", false).left).toEqual(183)
    expect(calculateLabelPosition({ x: 146, y: 100 }, label, drawing, offset, "toRight", false).left).toEqual(58)
    expect(calculateLabelPosition({ x: 105, y: 100 }, label, drawing, offset, "toLeft", false).left).toEqual(17)
    expect(calculateLabelPosition({ x: 104, y: 100 }, label, drawing, offset, "toLeft", false).left).toEqual(142)
    expect(calculateLabelPosition({ x: 100, y: 55 }, label, drawing, offset, "above", false).top).toEqual(17)
    expect(calculateLabelPosition({ x: 100, y: 54 }, label, drawing, offset, "above", false).top).toEqual(92)
    expect(calculateLabelPosition({ x: 100, y: 195 }, label, drawing, offset, "below", false).top).toEqual(233)
    expect(calculateLabelPosition({ x: 100, y: 196 }, label, drawing, offset, "below", false).top).toEqual(158)
  })

  it("calculateLabelPosition, defaulting to edge", () => {
    const label = { width: 100, height: 50 }
    const drawing = { xMin: 25, xMax: 175, yMin: 25, yMax: 125 }
    const offset = 5
    expect(calculateLabelPosition({ x: 45, y: 100 }, label, drawing, offset, "toRight", false).left).toEqual(83)
    expect(calculateLabelPosition({ x: 46, y: 100 }, label, drawing, offset, "toRight", false).left).toEqual(22)
    expect(calculateLabelPosition({ x: 105, y: 100 }, label, drawing, offset, "toLeft", false).left).toEqual(17)
    expect(calculateLabelPosition({ x: 104, y: 100 }, label, drawing, offset, "toLeft", false).left).toEqual(78)
    expect(calculateLabelPosition({ x: 100, y: 55 }, label, drawing, offset, "above", false).top).toEqual(17)
    expect(calculateLabelPosition({ x: 100, y: 54 }, label, drawing, offset, "above", false).top).toEqual(22)
    expect(calculateLabelPosition({ x: 100, y: 45 }, label, drawing, offset, "below", false).top).toEqual(83)
    expect(calculateLabelPosition({ x: 100, y: 46 }, label, drawing, offset, "below", false).top).toEqual(78)
  })

  it("verticalCenter and horizontalCenter", () => {
    const label = { width: 100, height: 100 }
    const drawing = { xMin: 25, xMax: 275, yMin: 25, yMax: 275 }
    expect(verticalCenter({ x: 100, y: 100 }, label, drawing)).toEqual(75)
    expect(verticalCenter({ x: 100, y: 25 }, label, drawing)).toEqual(25)
    expect(verticalCenter({ x: 100, y: 225 }, label, drawing)).toEqual(200)
    expect(horizontalCenter({ x: 100, y: 100 }, label, drawing)).toEqual(75)
    expect(horizontalCenter({ x: 25, y: 100 }, label, drawing)).toEqual(25)
    expect(horizontalCenter({ x: 225, y: 100 }, label, drawing)).toEqual(200)
  })
})
