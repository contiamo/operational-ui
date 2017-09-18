import transformSnippet from "../transform-snippet"

const regulartestSnippet: string = `
import X from 'Y'
import React from 'react'

export default (
  <div>
    <h1>Hello!</h1>
  </div>
)

`

const regularTestSnippetTransformed: string = `(  <div>
    <h1>Hello!</h1>
  </div>
)

`

const iifeTestSnippet: string = `
import X from 'Y'
import React from 'react'

export default (function() {
  return 2
})()
`

const iifeTestSnippetTransformed: string = `(function() {
  return 2
})()
`

describe("ToReactPlayground snippet", () => {
  it("trims a regular snippet", () => {
    expect(transformSnippet(regulartestSnippet)).toBe(regularTestSnippetTransformed)
  })

  it("trims an iife snippet", () => {
    expect(transformSnippet(iifeTestSnippet)).toBe(iifeTestSnippetTransformed)
  })
})
