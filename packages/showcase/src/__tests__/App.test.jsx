// @flow
import React from "react"
import { shallow } from "enzyme"

import App from "../App"

test("App starts", () => {
  expect(shallow(<App />)).toMatchSnapshot()
})
