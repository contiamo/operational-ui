// @flow
import { toReactPlayground } from "../snippet"

const testSnippet: string = `
import X from 'Y'
import React from 'react'

export default
<div>
  <h1>Hello!</h1>
</div>
`,
  trimmedTestSnippet: string = `<div>
  <h1>Hello!</h1>
</div>
`

test("trims", () => {
  expect(toReactPlayground(testSnippet)).toBe(trimmedTestSnippet)
})
