import * as React from "react"
import { render, mount } from "enzyme"
import { Filter } from "../index"

// @todo: add comprehensive tests once API expands
describe("Filter", () => {
  it("Is a function", () => {
    expect(typeof Filter).toBe("function")
  })
})
