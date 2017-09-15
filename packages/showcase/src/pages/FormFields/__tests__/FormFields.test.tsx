import * as React from "react"
import { render } from "enzyme"

import wrapDefaultTheme from "../../../utils/wrap-default-theme"
import ThemelessFormFieldsPage from "../FormFields"

const FormFieldsPage = wrapDefaultTheme(ThemelessFormFieldsPage)

describe("FormFieldsPage", () => {
  it("Should render correctly", () => {
    expect(render(<FormFieldsPage />)).toMatchSnapshot()
  })
})
