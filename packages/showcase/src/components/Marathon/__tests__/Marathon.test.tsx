import * as React from "react"
import { render } from "enzyme"
import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import ThemelessMarathon from "../Marathon"

const Marathon = wrapTheme(contiamoTheme)(ThemelessMarathon)

describe("Marathon Component", () => {
  it("Should render", () => {
    const renderedComponent = render(<Marathon />)
    expect(renderedComponent).toMatchSnapshot()
  })
})
