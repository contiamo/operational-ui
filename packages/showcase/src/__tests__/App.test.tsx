import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import ThemelessApp from "../App"

const App = wrapTheme(contiamoTheme)(ThemelessApp)

test("App starts", () => {
  expect(render(<App />)).toMatchSnapshot()
})
