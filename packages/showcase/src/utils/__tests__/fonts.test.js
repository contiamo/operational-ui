// @flow

import { getFontSrcString } from "../fonts"

const fontFace = {
  fontFamily: "MyFont",
  fontStyle: "normal",
  path: "/fonts/myfont"
}

test("renders correct font string", () => {
  expect(getFontSrcString(300)(fontFace)(["woff"]).src).toBe("local('MyFont'), url('/fonts/myfont/300.woff')")
})
