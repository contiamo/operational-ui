import * as React from "react"
import { render } from "enzyme"
import { Message as ThemelessMessage } from "../index"
import wrapDefaultTheme from "../utils/wrap-default-theme"
const Message = wrapDefaultTheme(ThemelessMessage)
describe("Message Component", () => {
  it("Should render", () => {
    const renderedComponent = render(<Message />)
    expect(renderedComponent).toMatchSnapshot()
  })
})
