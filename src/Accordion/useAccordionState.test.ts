import { act, renderHook } from "react-hooks-testing-library"
import { useAccordionState } from "./useAccordionState"

describe("useAccordionState", () => {
  const initialState = [
    Object.freeze({
      title: "test 0",
      content: () => null,
      expanded: false,
      key: 0,
    }),
    Object.freeze({
      title: "test 1",
      content: () => null,
      expanded: false,
      key: 1,
    }),
  ]

  test("returns initial state on the first call", () => {
    const { result } = renderHook(() => useAccordionState(initialState))

    expect(result.current[0]).toEqual(initialState)
  })

  test("toggles value in the state", () => {
    const { result } = renderHook(() => useAccordionState(initialState))

    expect(result.current[0][0].expanded).toEqual(false)
    act(() => {
      result.current[1](0)
    })
    expect(result.current[0][0].expanded).toEqual(true)
    expect(result.current[0][1].expanded).toEqual(false)
  })

  test("toggles value in the state", () => {
    const { result } = renderHook(() => useAccordionState(initialState))

    expect.assertions(1)
    try {
      act(() => {
        result.current[1](3)
      })
    } catch (e) {
      expect(e.message).toBe("index out of bounds: 3")
    }
  })
})
