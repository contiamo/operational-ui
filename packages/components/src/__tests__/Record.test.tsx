import * as React from "react"
import { render } from "enzyme"

import { Record as ThemelessRecord } from "../index"
import wrapDefaultTheme from "../utils/wrap-default-theme"

const Record = wrapDefaultTheme(ThemelessRecord)

describe("Record Component", () => {
  it("Should render", () => {
    const renderedComponent = render(
      <Record title="Title" controls="controls">
        Some content
      </Record>
    )
    expect(renderedComponent).toMatchSnapshot()
  })
})
