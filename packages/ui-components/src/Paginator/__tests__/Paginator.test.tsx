import * as React from "react"
import { render } from "enzyme"

import ThemelessPaginator from "../Paginator"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const Paginator = wrapDefaultTheme(ThemelessPaginator)

describe("Paginator Component", () => {
  it("Should initialize properly", () => {
    expect(render(<Paginator pageCount={10} onChange={(newPage: string) => {}} />)).toMatchSnapshot()
  })
})
