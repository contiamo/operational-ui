import * as React from "react"
import { render, mount } from "enzyme"

import ThemelessButtonGroup from "../ButtonGroup"
import Button from "../../Button/Button"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const ButtonGroup = wrapDefaultTheme(ThemelessButtonGroup)

describe("ButtonGroup Component", () => {
  it("Should initialize properly", () => {
    expect(
      render(
        <ButtonGroup>
          <Button>Hello</Button>
        </ButtonGroup>
      )
    ).toMatchSnapshot()
  })
})
