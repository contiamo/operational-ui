import defaultNumberFormatter from "../number_formatter"

describe("number formatter", () => {
  it("defaultNumberFormatter", () => {
    expect(defaultNumberFormatter(1000)).toEqual("1,000")
    expect(defaultNumberFormatter(1000.00005)).toEqual("1,000")
    expect(defaultNumberFormatter(1000.0051)).toEqual("1,000.01")
    expect(defaultNumberFormatter(1000.100007)).toEqual("1,000.1")
    expect(defaultNumberFormatter(123456789)).toEqual("123,456,789")
    expect(defaultNumberFormatter(12345.6789)).toEqual("12,345.68")
  })
})
