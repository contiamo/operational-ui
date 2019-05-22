import { truncate } from "../truncate"

describe("Truncate", () => {
  it("should return the same thing if no truncation required", () => {
    expect(truncate(5)("Tejas")).toEqual("Tejas")
  })

  it("should return a truncated string if it can", () => {
    expect(truncate(5)("Je m'appelle Claude")).toEqual("Je m'…")
  })

  it("should warn and return the thing if its not a primitive", () => {
    jest.spyOn(global.console, "warn")
    const cantTruncateMe = jest.fn()

    truncate(5)(cantTruncateMe)
    expect(global.console.warn).toHaveBeenCalledWith(
      "Attempting to truncate something that is not a JS primitive: this will fail for functions, objects and arrays. Please reconsider the item you are truncating:",
      cantTruncateMe,
    )
  })
})
