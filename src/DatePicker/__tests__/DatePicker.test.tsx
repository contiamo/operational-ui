import { render } from "enzyme"
import * as React from "react"
import { changeMonth, toYearMonthDay, getStartMonthYearInWidget } from "../../DatePicker/DatePicker.utils"
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
  it("Returns current month and year for datepicker to open on initially, if no props are available", () => {
    expect(getStartMonthYearInWidget()).toEqual({ year: new Date().getFullYear(), month: new Date().getMonth() })
  })
  it("Returns current month and year for datepicker to open on initially, if start, end, max and min are not available in props", () => {
    expect(getStartMonthYearInWidget({ placeholder: "Pick a date" })).toEqual({
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    })
  })
  it("Returns month and date of start/end/min/max for datepicker to open on initially, if it is available", () => {
    expect(getStartMonthYearInWidget({ start: "1996-06-18" })).toEqual({ year: 1996, month: 5 })
    expect(getStartMonthYearInWidget({ end: "1995-02-26" })).toEqual({ year: 1995, month: 1 })
    expect(getStartMonthYearInWidget({ max: "1972-05-27" })).toEqual({ year: 1972, month: 4 })
    expect(getStartMonthYearInWidget({ min: "1963-03-23" })).toEqual({ year: 1963, month: 2 })
  })
})
