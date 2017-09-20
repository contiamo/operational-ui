import transformSnippet from "../transform-snippet"

const testSnippet: string = `
import X from 'Y'
import React from 'react'

export default (
  <div>
    <h1>Hello!</h1>
  </div>
)
`

const transformedTestSnippet: string = `(  <div>
    <h1>Hello!</h1>
  </div>
)
`

describe("ToReactPlayground snippet", () => {
  it("trims", () => {
    expect(transformSnippet(testSnippet)).toBe(transformedTestSnippet)
  })
})
