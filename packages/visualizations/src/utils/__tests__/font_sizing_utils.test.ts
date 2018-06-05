import { approxZero } from "../font_sizing_utils"

describe("font sizing utils", () => {
  it("approxZero", () => {
    const upperLimit: number = 51
    const stepFunction = (x: number) => upperLimit - x
    expect(approxZero(stepFunction, 100)).toEqual(50)
  })
})
