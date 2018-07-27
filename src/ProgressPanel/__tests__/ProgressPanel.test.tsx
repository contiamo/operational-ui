import { render } from "enzyme"
import * as React from "react"
import { ProgressPanel as ThemelessProgressPanel } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const ProgressPanel = wrapDefaultTheme(ThemelessProgressPanel)

describe("ProgressPanel Component", () => {
  it("Should initialize properly", () => {
    expect(
      render(
        <ProgressPanel
          items={[
            {
              status: "success",
              title: "Something",
            },
            {
              status: "failure",
              title: "Something",
              error: "Failed to fetch your account data",
            },
            {
              status: "running",
              title: "Something",
            },
            {
              status: "waiting",
              title: "Something",
            },
          ]}
        />,
      ),
    ).toMatchSnapshot()
  })
})
