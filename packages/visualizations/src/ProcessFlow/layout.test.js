import layout from "./layout"

test("singleSourceAbove", () => {
  const singleSourceAbove = new layout().singleSourceAbove
  expect(singleSourceAbove([2, 3, 3, 5])(3)).toBe(false)
  expect(singleSourceAbove([2, 3, 3, 5])(2)).toBe(true)
  expect(singleSourceAbove([2, 3, 3, 5])(1)).toBe(false)
})
