import { operational, expandColor } from "../index"

describe("operational theme", () => {
  it("has a title typography element", () => {
    const heading1 = operational.typography.heading1
    expect(typeof heading1 === "object" && heading1 !== null).toBe(true)
  })
})

describe("expandColor", () => {
  it("expands a custom hex value", () => {
    expect(expandColor("#FFFFFF", operational)).toBe("#FFFFFF")
  })

  it("expands a known theme color key", () => {
    expect(expandColor("warning", operational)).toBe("#FFAE00")
  })

  it("returns null for an unrecognized color key", () => {
    expect(expandColor("warningXYZ", operational)).toBe(null)
  })

  it("returns null for a falsy color", () => {
    expect(expandColor(undefined, operational)).toBe(null)
  })
})
