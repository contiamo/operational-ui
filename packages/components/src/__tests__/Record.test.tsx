import * as React from "react"
import { render } from "enzyme"

import { Record as ThemelessRecord, RecordHeader, RecordBody } from "../index"
import wrapDefaultTheme from "../utils/wrap-default-theme"

const Record = wrapDefaultTheme(ThemelessRecord)

describe("Record Component", () => {
  it("Should render", () => {
    const renderedComponent = render(
      <Record>
        <RecordHeader>Hello</RecordHeader>
        <RecordBody>How do you do?</RecordBody>
      </Record>
    )
    expect(renderedComponent).toMatchSnapshot()
  })
})
