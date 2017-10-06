import * as React from "react"
import { render } from "enzyme"

import { HeaderTitle } from "../HeaderTitle"

test("HeaderTitle component renders", () => {
  expect(render(<HeaderTitle className="hi">hi</HeaderTitle>)).toMatchSnapshot()
})
