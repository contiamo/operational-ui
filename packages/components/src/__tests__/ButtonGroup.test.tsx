import * as React from "react"
import { render, mount } from "enzyme"

import { ButtonGroup as ThemelessButtonGroup, Button } from "../index"
import wrapDefaultTheme from "../utils/wrap-default-theme"

const ButtonGroup = wrapDefaultTheme(ThemelessButtonGroup)

describe("ButtonGroup Component", () => {
  it("Should initialize properly", () => {
    expect(
      render(
        <ButtonGroup>
          <Button>Hello</Button>
        </ButtonGroup>,
      ),
    ).toMatchSnapshot()
  })
})
