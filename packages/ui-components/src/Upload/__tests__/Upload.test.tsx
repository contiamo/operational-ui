import * as React from "react"
import { render } from "enzyme"

import ThemelessUpload from "../Upload"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"

const Upload = wrapDefaultTheme(ThemelessUpload)

describe("Upload Component", () => {
  it("Should render", () => {
    const renderedComponent = render(<Upload />)
    expect(renderedComponent).toMatchSnapshot()
  })
})
