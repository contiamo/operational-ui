import * as React from "react"
import { render } from "enzyme"
import { Modal as ThemelessModal } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const Modal = wrapDefaultTheme(ThemelessModal)

describe("Modal Component", () => {
  it("Should render", () => {
    const renderedComponent = render(<Modal>i love you</Modal>)
    expect(renderedComponent).toMatchSnapshot()
  })
})
