import * as React from "react"

import { render } from "enzyme"
import { itShouldOnlyMountOnce } from "../../__testUtils__/itShouldOnlyMountOnce"
import { SimpleLink as ThemelessSimpleLink } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const SimpleLink = wrapDefaultTheme(ThemelessSimpleLink)

describe("SimpleLink Component", () => {
  it("Should initialize properly", () => {
    expect(
      render(
        <SimpleLink left icon="Open" color="#000000">
          Custom color
        </SimpleLink>,
      ),
    ).toMatchSnapshot()
  })

  itShouldOnlyMountOnce("SimpleLink", SimpleLink)
})
