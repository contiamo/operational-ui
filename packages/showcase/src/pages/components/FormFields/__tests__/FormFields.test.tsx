import * as React from "react"
import { render } from "enzyme"

import FormFieldsPage from "../FormFields"

describe("FormFieldsPage", () => {
  it("Should render correctly", () => {
    expect(render(<FormFieldsPage />)).toMatchSnapshot()
  })
})
