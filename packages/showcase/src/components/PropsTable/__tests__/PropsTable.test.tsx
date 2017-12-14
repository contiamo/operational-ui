import * as React from "react"
import { render } from "enzyme"
import { wrapTheme } from "@operational/utils"
import { operational } from "@operational/theme"

import ThemelessPropsTable from "../PropsTable"

const PropsTable = wrapTheme(operational)(ThemelessPropsTable)

const sampleProps = [
  {
    name: "Hello",
    defaultValue: "false"
  }
]

describe("PropsTable", () => {
  it("Should render correctly without props", () => {
    expect(render(<PropsTable />)).toMatchSnapshot()
  })
  it("Should render correctly with props", () => {
    expect(render(<PropsTable props={sampleProps} />)).toMatchSnapshot()
  })
})
