import * as React from "react"
import { render } from "enzyme"

import ThemelessTabs, { Tab } from "../Tabs"
import wrapDefaultTheme from "../../../utils/wrap-default-theme"

const Tabs = wrapDefaultTheme(ThemelessTabs)

describe("Tabs", () => {
  it("Should render", () => {
    const component = (
      <Tabs>
        <Tab title="test">Test</Tab>
      </Tabs>
    )

    const renderedComponent = render(component)
    expect(renderedComponent).toMatchSnapshot()
  })
})
