import * as React from "react"
import { render } from "enzyme"

import ThemelessHeaderSeparator from "../HeaderSeparator"
import wrapDefaultTheme from "../../../../utils/wrap-default-theme"

const HeaderSeparator = wrapDefaultTheme(ThemelessHeaderSeparator)

test("HeaderSeparator component renders", () => {
  expect(render(<HeaderSeparator className="hi" />)).toMatchSnapshot()
})
