import * as React from "react"
import { render } from "enzyme"
import { Paginator as ThemelessPaginator } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const Paginator = wrapDefaultTheme(ThemelessPaginator)

describe("Paginator Component", () => {
  it("Should initialize properly", () => {
    expect(render(<Paginator page={3} itemCount={258} itemsPerPage={50} />)).toMatchSnapshot()
  })
})
