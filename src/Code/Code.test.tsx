import { render } from "enzyme"
import * as React from "react"
import { Code as ThemelessCode } from "../index"
import wrapDefaultTheme from "../utils/wrap-default-theme"

const Code = wrapDefaultTheme(ThemelessCode)

describe("Code", () => {
  it("Should render", () => {
    expect(
      render(
        <Code syntax="json">
          {`{
  "properties": {
    "startAt": {
      "type": "string",
      "format": "date-time"
    },
    "endAt": {
      "type": "string",
      "format": "date-time"
    }
  }
}`}
        </Code>,
      ),
    ).toMatchSnapshot()
  })
})
