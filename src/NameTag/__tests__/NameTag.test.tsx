import { render } from "enzyme"
import * as React from "react"
import { NameTag as ThemelessNameTag } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const NameTag = wrapDefaultTheme(ThemelessNameTag)

describe("NameTag Component", () => {
  it("Should render", () => {
    expect(
      render(
        <NameTag color="primary" right>
          PG
        </NameTag>,
      ),
    ).toMatchSnapshot()
  })
})
