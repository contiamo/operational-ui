import * as React from "react"
import { render } from "enzyme"

import { HeaderSeparator } from "../HeaderSeparator"

test("HeaderSeparator component renders", () => {
  expect(render(<HeaderSeparator className="hi" />)).toMatchSnapshot()
})
