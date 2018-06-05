import { guess, tickFormatter } from "../quant_axis_utils"

describe("quant axis utils", () => {
  it("guess", () => {
    expect(guess([])).toEqual([0, 100])
    expect(guess([NaN, undefined, null])).toEqual([0, 100])
    expect(guess([0, 0, 0])).toEqual([0, 100])
    expect(guess([5, 5, 5])).toEqual([0, 10])
    expect(guess([10, 20, 30])).toEqual([0, 30])
    expect(guess([-23, 40, 2])).toEqual([-23, 40])
    expect(guess([-23, -13, -18])).toEqual([-23, 0])
  })

  it("tickFormatter", () => {
    expect(tickFormatter(10, 100, "unit")(30)).toEqual("30")
    expect(tickFormatter(10, 100, "unit")(100)).toEqual("unit")
    expect(tickFormatter(1000, 5000, "unit")(2000)).toEqual("2k")
    expect(tickFormatter(1000, 5000, "unit")(20000)).toEqual("20k")
    expect(tickFormatter(1000000, 5000000, "unit")(2000000)).toEqual("2m")
    expect(tickFormatter(1000000, 5000000, "unit")(20000000)).toEqual("20m")
    expect(tickFormatter(1000000000, 5000000000, "unit")(20000000000)).toEqual("20bn")
  })
})
