import React from "react"
import { act, cleanup, render } from "@testing-library/react"

import { useWindowSize } from "."

const MyComponent = () => {
  const { width, height } = useWindowSize()

  return (
    <div data-testid="result">
      {width}x{height}
    </div>
  )
}

describe("useURLState", () => {
  afterEach(cleanup)
  it("should reflect the window size", async () => {
    const { getByTestId } = render(<MyComponent />)
    expect(getByTestId("result")).toMatchInlineSnapshot(`
<div
  data-testid="result"
>
  1024
  x
  768
</div>
`)
  })

  it("should rerender when the window size changes", async () => {
    const { getByTestId } = render(<MyComponent />)
    expect(getByTestId("result")).toMatchInlineSnapshot(`
<div
  data-testid="result"
>
  1024
  x
  768
</div>
`)
    act(() => {
      // @ts-ignore window.innerWidth _can be_ overwritten in this case.
      window.innerWidth = 200
      // @ts-ignore window.innerHeight _can be_ overwritten in this case.
      window.innerHeight = 500
      window.dispatchEvent(new Event("resize"))
    })

    expect(getByTestId("result")).toMatchInlineSnapshot(`
<div
  data-testid="result"
>
  200
  x
  500
</div>
`)
  })
})
