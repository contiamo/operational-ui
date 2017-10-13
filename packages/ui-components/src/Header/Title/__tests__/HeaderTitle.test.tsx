import * as React from "react"
import { render } from "enzyme"

import ThemelessHeaderTitle from "../HeaderTitle"
import wrapDefaultTheme from "../../../../utils/wrap-default-theme"

const HeaderTitle = wrapDefaultTheme(ThemelessHeaderTitle)

test("HeaderTitle component renders", () => {
  expect(render(<HeaderTitle className="hi">hi</HeaderTitle>)).toMatchSnapshot()
})
