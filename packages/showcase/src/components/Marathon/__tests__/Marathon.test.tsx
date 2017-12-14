import * as React from "react"
import { render } from "enzyme"
import { wrapTheme } from "@operational/utils"
import { operational } from "@operational/theme"

import ThemelessMarathon from "../Marathon"

const Marathon = wrapTheme(operational)(ThemelessMarathon)

describe("Marathon Component", () => {
  it("Should render", () => {
    const renderedComponent = render(<Marathon />)
    expect(renderedComponent).toMatchSnapshot()
  })
})
