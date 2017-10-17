import * as React from "react"
import { Marathon } from "contiamo-ui-components"

export default (() => {
  const value = "Hello"

  const test = ({ test, expect, /*beforeEach, afterEach, beforeAll, afterAll,*/ container }: any) => {
    test("Modifies node content", (done: () => void) => {
      container.innerHTML = "<p>Hello</p>"
      setTimeout(() => {
        expect(container.innerHTML === "<p>Hello</p>")
        done()
      }, 100)
    })

    test("Modifies node content again", (done: () => void) => {
      container.innerHTML = "<p>Good bye</p>"
      setTimeout(() => {
        expect(container.innerHTML === "<p>Good bye!</p>")
        done()
      }, 100)
    })

    test("Empties node", () => {
      container.innerHTML = ""
      expect(container.innerHTML === "")
    })
  }

  return (
    <div>
      <Marathon test={test} timeout={2000} />
    </div>
  )
})()
