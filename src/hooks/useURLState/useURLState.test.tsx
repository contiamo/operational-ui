import React from "react"
import { cleanup, fireEvent, render, wait } from "react-testing-library"

import { useURLState } from "./useURLState"

describe("useURLState", () => {
  afterEach(cleanup)
  it("should take the initial state by default", async () => {
    const decoder = () => undefined
    const getSearchParams = () => ({})
    const replaceState: History["replaceState"] = () => null
    const getPathname = () => ""
    const getHash = () => ""

    const Counter = () => {
      const [count, setCount] = useURLState<number>("count", 0, decoder, {
        getSearchParams,
        replaceState,
        getPathname,
        getHash,
      })

      return (
        <>
          <h1 data-testid="count">{count}</h1>
          <button data-testid="up" onClick={() => setCount(count + 1)} children="up" />
          <button data-testid="down" onClick={() => setCount(count - 1)} children="down" />
        </>
      )
    }

    const { getByTestId } = render(<Counter />)

    expect(getByTestId("count").textContent).toEqual("0")
  })

  it("should take the value from the url if provided", () => {
    const decoder = (i: any) => +i
    const getSearchParams = () => ({ count: 42 })
    const replaceState: History["replaceState"] = () => null
    const getPathname = () => ""
    const getHash = () => ""

    const Counter = () => {
      const [count, setCount] = useURLState<number>("count", 0, decoder, {
        getSearchParams,
        replaceState,
        getPathname,
        getHash,
      })

      return (
        <>
          <h1 data-testid="count">{count}</h1>
          <button data-testid="up" onClick={() => setCount(count + 1)} children="up" />
          <button data-testid="down" onClick={() => setCount(count - 1)} children="down" />
        </>
      )
    }

    const { getByTestId } = render(<Counter />)

    expect(getByTestId("count").textContent).toEqual("42")
  })

  it("should take the initial state if the search param is not valid", () => {
    const decoder = () => undefined
    const getSearchParams = () => ({ count: 42 })
    const replaceState: History["replaceState"] = () => null
    const getPathname = () => ""
    const getHash = () => ""

    const Counter = () => {
      const [count, setCount] = useURLState<number>("count", 0, decoder, {
        getSearchParams,
        replaceState,
        getPathname,
        getHash,
      })

      return (
        <>
          <h1 data-testid="count">{count}</h1>
          <button data-testid="up" onClick={() => setCount(count + 1)} children="up" />
          <button data-testid="down" onClick={() => setCount(count - 1)} children="down" />
        </>
      )
    }

    const { getByTestId } = render(<Counter />)

    expect(getByTestId("count").textContent).toEqual("0")
  })

  it("should call replaceState on state change", async () => {
    const decoder = () => undefined
    const getSearchParams = () => ({})
    const replaceState = jest.fn()
    const getPathname = () => "http://myapp.com"
    const getHash = () => ""

    const Counter = () => {
      const [count, setCount] = useURLState<number>("count", 0, decoder, {
        getSearchParams,
        replaceState,
        getPathname,
        getHash,
      })

      return (
        <>
          <h1 data-testid="count">{count}</h1>
          <button data-testid="up" onClick={() => setCount(count + 1)} children="up" />
          <button data-testid="down" onClick={() => setCount(count - 1)} children="down" />
        </>
      )
    }

    const { getByTestId } = render(<Counter />)
    fireEvent.click(getByTestId("up"))

    await wait(() => expect(replaceState).toBeCalledTimes(2))
    expect(getByTestId("count").textContent).toEqual("1")
    expect(replaceState).toBeCalledWith({}, "", "http://myapp.com?count=1")
  })

  it("should not erase previous search params", async () => {
    const decoder = () => undefined
    const getSearchParams = () => ({ please: "keepme" })
    const replaceState = jest.fn()
    const getPathname = () => "http://myapp.com"
    const getHash = () => ""

    const Counter = () => {
      const [count, setCount] = useURLState<number>("count", 0, decoder, {
        getSearchParams,
        replaceState,
        getPathname,
        getHash,
      })

      return (
        <>
          <h1 data-testid="count">{count}</h1>
          <button data-testid="up" onClick={() => setCount(count + 1)} children="up" />
          <button data-testid="down" onClick={() => setCount(count - 1)} children="down" />
        </>
      )
    }

    const { getByTestId } = render(<Counter />)
    fireEvent.click(getByTestId("up"))
    fireEvent.click(getByTestId("up"))

    await wait(() => expect(replaceState).toBeCalledTimes(3))
    expect(getByTestId("count").textContent).toEqual("2")
    expect(replaceState).toBeCalledWith({}, "", "http://myapp.com?please=keepme&count=2")
  })

  it("should not erase the hash", async () => {
    const decoder = () => undefined
    const getSearchParams = () => ({ please: "keepme" })
    const replaceState = jest.fn()
    const getPathname = () => "http://myapp.com"
    const getHash = () => "#myHash"

    const Counter = () => {
      const [count, setCount] = useURLState<number>("count", 0, decoder, {
        getSearchParams,
        replaceState,
        getPathname,
        getHash,
      })

      return (
        <>
          <h1 data-testid="count">{count}</h1>
          <button data-testid="up" onClick={() => setCount(count + 1)} children="up" />
          <button data-testid="down" onClick={() => setCount(count - 1)} children="down" />
        </>
      )
    }

    const { getByTestId } = render(<Counter />)
    fireEvent.click(getByTestId("up"))
    fireEvent.click(getByTestId("up"))

    await wait(() => expect(replaceState).toBeCalledTimes(3))
    expect(getByTestId("count").textContent).toEqual("2")
    expect(replaceState).toBeCalledWith({}, "", "http://myapp.com?please=keepme&count=2#myHash")
  })

  it("should deal with complex object", async () => {
    const decoder = () => undefined
    const getSearchParams = () => ({})
    const replaceState = jest.fn()
    const getPathname = () => "http://myapp.com"
    const getHash = () => ""

    const DatePicker = () => {
      const [dateRange, setDateRange] = useURLState<{ start?: string; end?: string }>("dateRange", {}, decoder, {
        getSearchParams,
        replaceState,
        getPathname,
        getHash,
      })

      return (
        <>
          <h1 data-testid="date">
            {dateRange.start} -> {dateRange.end}
          </h1>
          <button data-testid="set-start" onClick={() => setDateRange({ ...dateRange, start: "17-01-2019" })} />
          <button data-testid="set-end" onClick={() => setDateRange({ ...dateRange, end: "01-02-2019" })} />
        </>
      )
    }

    const { getByTestId } = render(<DatePicker />)
    expect(getByTestId("date").textContent).toEqual(" -> ")
    fireEvent.click(getByTestId("set-start"))
    expect(getByTestId("date").textContent).toEqual("17-01-2019 -> ")
    fireEvent.click(getByTestId("set-end"))
    expect(getByTestId("date").textContent).toEqual("17-01-2019 -> 01-02-2019")

    await wait(() => expect(replaceState).toBeCalledTimes(3))
    expect(replaceState).toBeCalledWith({}, "", "http://myapp.com")
    expect(replaceState).toBeCalledWith({}, "", "http://myapp.com?dateRange%5Bstart%5D=17-01-2019")
    expect(replaceState).toBeCalledWith(
      {},
      "",
      "http://myapp.com?dateRange%5Bstart%5D=17-01-2019&dateRange%5Bend%5D=01-02-2019",
    )
  })

  it("should not add `?` to the url if no param", async () => {
    const decoder = () => undefined
    const getSearchParams = () => ({})
    const replaceState = jest.fn()
    const getPathname = () => "http://myapp.com"
    const getHash = () => ""

    const DatePicker = () => {
      const [dateRange, setDateRange] = useURLState<{ start?: string; end?: string }>("dateRange", {}, decoder, {
        getSearchParams,
        replaceState,
        getPathname,
        getHash,
      })

      return (
        <>
          <h1 data-testid="date">
            {dateRange.start} -> {dateRange.end}
          </h1>
          <button data-testid="set-start" onClick={() => setDateRange({ ...dateRange, start: "17-01-2019" })} />
          <button data-testid="set-end" onClick={() => setDateRange({ ...dateRange, end: "01-02-2019" })} />
        </>
      )
    }

    const { getByTestId } = render(<DatePicker />)
    expect(getByTestId("date").textContent).toEqual(" -> ")

    await wait(() => expect(replaceState).toBeCalledTimes(1))
    expect(replaceState).toBeCalledWith({}, "", "http://myapp.com")
  })
})
