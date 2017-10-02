import * as React from "react"
import { render } from "enzyme"

import { wrapTheme } from "contiamo-ui-utils"
import { contiamoTheme } from "contiamo-ui-components"
import ThemelessFormFields from "../FormFields"

const FormFields = wrapTheme(contiamoTheme)(ThemelessFormFields)

describe("FormFieldsPage", () => {
  it("Should render correctly", () => {
    expect(render(<FormFields />)).toMatchSnapshot()
  })
})
