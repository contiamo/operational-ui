import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import ThemelessUploads from "../Uploads"

const Uploads = wrapTheme(contiamoTheme)(ThemelessUploads)

describe("Uploads Showcase Page", () => {
  it("Should render correctly", () => {
    expect(render(<Uploads />)).toMatchSnapshot()
  })
})
