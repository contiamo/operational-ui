import { contiamoTheme } from "../index"

describe("contiamoTheme", () => {
  it("has a title typography element", () => {
    const heading1 = contiamoTheme.typography.heading1
    expect(typeof heading1 === "object" && heading1 !== null).toBe(true)
  })
})
