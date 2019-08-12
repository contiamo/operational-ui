import React, { useRef } from "react"
import { cleanup, fireEvent, render } from "@testing-library/react"

import { useHotkey } from "."

describe("useHotkey", () => {
  afterEach(cleanup)

  it("triggers the callback function on keyDown event", async () => {
    const callback = jest.fn()

    const Component = () => {
      const ref = useRef(null)
      useHotkey(ref, { key: "t" }, callback)

      return <input ref={ref} data-testid="component" />
    }

    const { getByTestId } = render(<Component />)
    const rendered = getByTestId("component")

    fireEvent.keyDown(rendered, { key: "t" })

    expect(callback).toBeCalledTimes(1)
  })

  it("keydown registering is case-insensitive", async () => {
    const callbackP = jest.fn()
    const callbackD = jest.fn()

    const Component = () => {
      const ref = useRef(null)
      useHotkey(ref, { key: "P" }, callbackP)
      useHotkey(ref, { key: "d" }, callbackD)
      return <div ref={ref} data-testid="component" />
    }

    const { getByTestId } = render(<Component />)
    const rendered = getByTestId("component")

    fireEvent.keyDown(rendered, { key: "P" })
    fireEvent.keyDown(rendered, { key: "p" })
    fireEvent.keyDown(rendered, { key: "D" })
    fireEvent.keyDown(rendered, { key: "d" })

    expect(callbackP).toBeCalledTimes(2)
    expect(callbackD).toBeCalledTimes(2)
  })

  it("handles key modifiers", async () => {
    const callbackCtrl = jest.fn()
    const callbackShift = jest.fn()
    const callbackAlt = jest.fn()
    const callbackMeta = jest.fn()
    const callbackAll = jest.fn()

    const Component = () => {
      const ref = useRef(null)

      useHotkey(ref, { key: "o", ctrl: true }, callbackCtrl)
      useHotkey(ref, { key: "o", shift: true }, callbackShift)
      useHotkey(ref, { key: "o", alt: true }, callbackAlt)
      useHotkey(ref, { key: "o", meta: true }, callbackMeta)
      useHotkey(ref, { key: "o", ctrl: true, shift: true, alt: true, meta: true }, callbackAll)

      return <input ref={ref} data-testid="component" />
    }

    const { getByTestId } = render(<Component />)
    const rendered = getByTestId("component")

    // No reaction to event without key modifiers
    fireEvent(rendered, new KeyboardEvent("keydown", { key: "o" }))
    expect(callbackCtrl).toBeCalledTimes(0)
    expect(callbackShift).toBeCalledTimes(0)
    expect(callbackAlt).toBeCalledTimes(0)
    expect(callbackMeta).toBeCalledTimes(0)
    expect(callbackAll).toBeCalledTimes(0)

    // Ctrl
    fireEvent(rendered, new KeyboardEvent("keydown", { key: "o", ctrlKey: true }))
    expect(callbackCtrl).toBeCalledTimes(1)
    expect(callbackShift).toBeCalledTimes(0)
    expect(callbackAlt).toBeCalledTimes(0)
    expect(callbackMeta).toBeCalledTimes(0)
    expect(callbackAll).toBeCalledTimes(0)

    // Shift
    fireEvent(rendered, new KeyboardEvent("keydown", { key: "o", shiftKey: true }))
    expect(callbackCtrl).toBeCalledTimes(1)
    expect(callbackShift).toBeCalledTimes(1)
    expect(callbackAlt).toBeCalledTimes(0)
    expect(callbackMeta).toBeCalledTimes(0)
    expect(callbackAll).toBeCalledTimes(0)

    // Alt
    fireEvent(rendered, new KeyboardEvent("keydown", { key: "o", altKey: true }))
    expect(callbackCtrl).toBeCalledTimes(1)
    expect(callbackShift).toBeCalledTimes(1)
    expect(callbackAlt).toBeCalledTimes(1)
    expect(callbackMeta).toBeCalledTimes(0)
    expect(callbackAll).toBeCalledTimes(0)

    // Meta
    fireEvent(rendered, new KeyboardEvent("keydown", { key: "o", metaKey: true }))
    expect(callbackCtrl).toBeCalledTimes(1)
    expect(callbackShift).toBeCalledTimes(1)
    expect(callbackAlt).toBeCalledTimes(1)
    expect(callbackMeta).toBeCalledTimes(1)
    expect(callbackAll).toBeCalledTimes(0)

    // All modifiers together
    fireEvent(
      rendered,
      new KeyboardEvent("keydown", { key: "o", ctrlKey: true, shiftKey: true, altKey: true, metaKey: true }),
    )
    expect(callbackCtrl).toBeCalledTimes(2)
    expect(callbackShift).toBeCalledTimes(2)
    expect(callbackAlt).toBeCalledTimes(2)
    expect(callbackMeta).toBeCalledTimes(2)
    expect(callbackAll).toBeCalledTimes(1)
  })
})
