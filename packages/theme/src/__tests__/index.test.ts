import { operational } from "../index"

describe("operational theme", () => {
  it("has a title typography element", () => {
    const heading1 = operational.typography.heading1
    expect(typeof heading1 === "object" && heading1 !== null).toBe(true)
  })
})
