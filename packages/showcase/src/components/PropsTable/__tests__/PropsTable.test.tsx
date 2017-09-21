import * as React from "react"
import { shallow } from "enzyme"

import ThemelessPropsTable from "../PropsTable"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"

const PropsTable = wrapDefaultTheme(ThemelessPropsTable)

const sampleProps = [
  {
    name: "Hello",
    defaultValue: "false"
  }
]

describe("PropsTable", () => {
  it("Should render correctly without props", () => {
    expect(shallow(<PropsTable />)).toMatchSnapshot()
  })
  it("Should render correctly with props", () => {
    expect(shallow(<PropsTable props={sampleProps} />)).toMatchSnapshot()
  })
})
