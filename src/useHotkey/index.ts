import { MutableRefObject, useEffect } from "react"

/**
 * Hook for linking some hotkey to a callback function
 */

/**
 * Create a state that is sync with url search param.
 *
 * @param scope - A ref to an HTMLElement, scoping the hotkey binding
 * @param keyCode - numeric code of the keyboard key
 * @param callback- a callback to be invoked when the hotkey is hit
 * @param withCtrl - optional Ctrl / ⌃ key
 * @param withShift - optional Shift key
 * @param withAlt - optional Alt / ⌥ key
 * @param withMeta - optional meta ⌘ / ⊞ key
 */
export function useHotkey(
  scope: MutableRefObject<HTMLElement>,
  keyCode: number,
  callback: undefined | (() => void),
  withCtrl?: boolean,
  withShift?: boolean,
  withAlt?: boolean,
  withMeta?: boolean,
) {
  useEffect(() => {
    const addKeyBinding = (): void => {
      if (scope.current) {
        scope.current.addEventListener("keydown", keyDownHandler, true)
      }
    }

    const removeKeyBinding = (): void => {
      if (scope.current) {
        scope.current.removeEventListener("keydown", keyDownHandler, true)
      }
    }

    const keyDownHandler = (event: KeyboardEvent): void => {
      if (event.keyCode !== keyCode) {
        return
      }

      if (!callback) {
        return
      }

      if (withCtrl && !event.ctrlKey) {
        return
      }

      if (withShift && !event.shiftKey) {
        return
      }

      if (withAlt && !event.altKey) {
        return
      }

      if (withMeta && !event.metaKey) {
        return
      }

      event.stopPropagation()
      callback()
    }

    addKeyBinding()
    return removeKeyBinding
  }, [scope.current])
}

export default useHotkey
