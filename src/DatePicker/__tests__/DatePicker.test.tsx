import { render } from "enzyme"
import * as React from "react"
import { changeMonth, toYearMonthDay } from "../../DatePicker/DatePicker.utils"
import { DatePicker as ThemelessDatePicker } from "../../index"
import wrapDefaultTheme from "../../utils/wrap-default-theme"

const DatePicker = wrapDefaultTheme(ThemelessDatePicker)

describe("DatePicker Component", () => {
  it("Should render", () => {
    const renderedComponent = render(<DatePicker start="2018-01-02" end="2018-01-23" placeholder="Pick a date" />)
    expect(renderedComponent).toMatchSnapshot()
  })
  it("Converts date string to a structured year-month-day object", () => {
    expect(toYearMonthDay("2018-01-01").year).toEqual(2018)
    expect(toYearMonthDay("2018-01-01").month).toEqual(0)
    expect(toYearMonthDay("2018-01-01").day).toEqual(0)
  })
  it("Changes the current month", () => {
    expect(changeMonth(2, { year: 2018, month: 2 })).toEqual({ year: 2018, month: 4 })
  })
  it("Changes the current month, going into the next year", () => {
    expect(changeMonth(2, { year: 2018, month: 10 })).toEqual({ year: 2019, month: 0 })
  })
  it("Changes the current month, going into the previous year", () => {
    expect(changeMonth(-1, { year: 2018, month: 0 })).toEqual({ year: 2017, month: 11 })
  })
})
