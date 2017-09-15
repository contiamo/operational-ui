import * as React from "react"
import { render } from "enzyme"

import Playground from "../Playground"

describe("Playground Component", () => {
  it("Should initialize properly", () => {
    expect(render(<Playground snippet="">hi</Playground>)).toMatchSnapshot()
  })
})
