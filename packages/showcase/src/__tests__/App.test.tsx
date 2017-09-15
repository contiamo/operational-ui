import * as React from "react"
import { shallow } from "enzyme"

import wrapDefaultTheme from "../utils/wrap-default-theme"
import ThemelessApp from "../App"

const App = wrapDefaultTheme(ThemelessApp)

test("App starts", () => {
  expect(shallow(<App />)).toMatchSnapshot()
})
