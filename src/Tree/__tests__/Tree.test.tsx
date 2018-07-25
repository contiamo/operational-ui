import { render } from "enzyme"
import * as React from "react"
import { Tree as ThemelessTree } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"
import { getInitialOpenPaths, togglePath } from "../Tree.utils"

const Tree = wrapDefaultTheme(ThemelessTree)

describe("Tree Component", () => {
  it("Should intialize without problems", () => {
    const output = render(<Tree trees={[]} />)
    expect(output).toMatchSnapshot()
  })
  it("Toggle path - add case", () => {
    expect(togglePath([1, 2])([[1, 2, 3], [0]])).toEqual([[1, 2, 3], [0], [1, 2]])
  })
  it("Toggle path - remove case", () => {
    expect(togglePath([1, 2])([[1, 2], [0]])).toEqual([[0]])
  })
  it("Works out initially open paths", () => {
    expect(
      getInitialOpenPaths([])({
        label: "",
        initiallyOpen: true,
        childNodes: [
          {
            label: "",
            initiallyOpen: false,
            childNodes: [
              {
                label: "",
                initiallyOpen: true,
                childNodes: [],
              },
            ],
          },
          {
            label: "",
            initiallyOpen: true,
            childNodes: [],
          },
        ],
      }),
    ).toEqual([[], [0, 0], [1]])
  })
})
