
import * as React from "react"
import { shallow } from "enzyme"

import { HeaderTitle } from "../HeaderTitle"

test("HeaderTitle component renders", () => {
  expect(shallow(<HeaderTitle className="hi">hi</HeaderTitle>)).toMatchSnapshot()
})
