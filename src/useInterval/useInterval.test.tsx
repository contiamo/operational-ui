import React from "react"
import { cleanup, render } from "@testing-library/react"

import useInterval, { useInterval as namedHook } from "."

// ref https://github.com/Hermanya/use-interval/blob/master/src/test.tsx
beforeEach(cleanup)

const MyComponent: React.FC<{ fn: () => void; delay: number | null; immediate?: boolean }> = ({
  fn,
  delay,
  immediate,
}) => {
  useInterval(fn, delay, immediate)
  return <span>An Interval is running </span>
}

describe("useInterval", () => {
  it("exports a function (default)", () => {
    expect(useInterval).toBeInstanceOf(Function)
  })
  it("exports a function (named)", () => {
    expect(namedHook).toBeInstanceOf(Function)
  })
  it("hooks identity are the same", () => {
    expect(useInterval).toBe(namedHook)
  })
  it("is a named function", () => {
    // aids stack trace debugging.
    expect(useInterval.name).toBe("useInterval")
  })

  describe("regular mode (delayed)", () => {
    jest.useFakeTimers()

    const fn: () => void = jest.fn()
    const { container } = render(<MyComponent fn={fn} delay={500} />)

    expect(fn).toBeCalledTimes(0 /* not called on first render */)
    jest.advanceTimersByTime(500)
    expect(fn).toBeCalledTimes(1)
    jest.advanceTimersByTime(1500)
    expect(fn).toBeCalledTimes(4)

    test("cancels interval when delay is null", () => {
      render(<MyComponent immediate fn={fn} delay={null} />, { container })
      jest.advanceTimersByTime(1500)
      expect(fn).toBeCalledTimes(4)
    })

    jest.clearAllTimers()
  })

  describe("immediate mode", () => {
    jest.useFakeTimers()

    const fn = jest.fn()
    const { container } = render(<MyComponent immediate fn={fn} delay={500} />)

    expect(fn).toBeCalledTimes(1 /* called immediatelly on render */)
    jest.advanceTimersByTime(500)
    expect(fn).toBeCalledTimes(2)
    jest.advanceTimersByTime(1500)
    expect(fn).toBeCalledTimes(5)

    it("cancels interval when delay is null", () => {
      render(<MyComponent immediate fn={fn} delay={null} />, { container })
      jest.advanceTimersByTime(1500)
      expect(fn).toBeCalledTimes(5)
    })

    jest.clearAllTimers()
  })
})
