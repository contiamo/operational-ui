import { toReactPlayground } from "../snippet"

const testSnippet: String = `
import X from 'Y'
import React from 'react'

export default
<div>
  <h1>Hello!</h1>
</div>
`

const trimmedTestSnippet: String = `<div>
  <h1>Hello!</h1>
</div>
`

test("trims", () => {
  expect(toReactPlayground(testSnippet)).toBe(trimmedTestSnippet)
})
