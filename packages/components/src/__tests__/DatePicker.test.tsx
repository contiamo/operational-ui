import * as React from "react"
import { render } from "enzyme"
import { DatePicker as ThemelessDatePicker } from "../index"
import wrapDefaultTheme from "../utils/wrap-default-theme"
import { toYearMonthDay } from "../DatePicker/DatePicker.utils"
const DatePicker = wrapDefaultTheme(ThemelessDatePicker)
describe("DatePicker Component", () => {
  // @todo: this fails because of the way TypeScript imports are handled between Jest and the compiler.
  // Add this back once a stable solution is found.
  xit("Should render", () => {
    const renderedComponent = render(<DatePicker start="2018-01-02" end="2018-01-23" placeholder="Pick a date" />)
    expect(renderedComponent).toMatchSnapshot()
  })
  it("Converts date string to a structured year-month-day object", () => {
    expect(toYearMonthDay("2018-01-01").year).toEqual(2018)
    expect(toYearMonthDay("2018-01-01").month).toEqual(0)
    expect(toYearMonthDay("2018-01-01").day).toEqual(0)
  })
})
