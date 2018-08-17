import { render } from "enzyme"
import * as React from "react"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"
import { Message as ThemelessMessage } from "../Message"

const Message = wrapDefaultTheme(ThemelessMessage)

describe("Message Component", () => {
  it("Should render", () => {
    const renderedComponent = render(<Message />)
    expect(renderedComponent).toMatchSnapshot()
  })
})
