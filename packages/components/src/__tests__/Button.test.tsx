import * as React from "react"
import { render, mount } from "enzyme"

import { Button as ThemelessButton } from "../index"
import wrapDefaultTheme from "../utils/wrap-default-theme"

const Button = wrapDefaultTheme(ThemelessButton)

describe("Button Component", () => {
  it("Should initialize properly", () => {
    expect(render(<Button>hi</Button>)).toMatchSnapshot()
  })
})
