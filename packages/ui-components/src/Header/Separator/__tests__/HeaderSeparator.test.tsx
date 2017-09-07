
import * as React from "react"
import { shallow } from "enzyme"

import { HeaderSeparator } from "../HeaderSeparator"

test("HeaderSeparator component renders", () => {
  expect(shallow(<HeaderSeparator className="hi" />)).toMatchSnapshot()
})
