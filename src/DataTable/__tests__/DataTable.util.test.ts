import { defaultRowHeight, getHeaderRowHeight, getRowHeight } from "../DataTable.util"

describe("DataTable: row height calculation", () => {
  it("should return a corresponding number when given a string size", () => {
    expect(getRowHeight("compact")).toEqual(22)
    expect(getRowHeight("regular")).toEqual(defaultRowHeight)
  })
  it("should return a height number value if given a height number value", () => {
    expect(getRowHeight(500)).toEqual(500)
  })
  it("should return a big/regular size for a header even if in compact mode", () => {
    expect(getHeaderRowHeight("compact")).toEqual(defaultRowHeight)
    expect(getHeaderRowHeight("regular")).toEqual(defaultRowHeight)
  })
  it("should return a custom height for a header if given a custom hiehgt", () => {
    expect(getHeaderRowHeight(10e4)).toEqual(10e4)
  })
  it("should return the default when given nothing", () => {
    expect(getHeaderRowHeight(undefined)).toEqual(defaultRowHeight)
  })
})
