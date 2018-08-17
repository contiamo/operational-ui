import { render } from "enzyme"
import * as React from "react"
import { Message as ThemelessMessage } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const Message = wrapDefaultTheme(ThemelessMessage)

describe("Message Component", () => {
  it("Should render", () => {
    const renderedComponent = render(<Message />)
    expect(renderedComponent).toMatchSnapshot()
  })
})
