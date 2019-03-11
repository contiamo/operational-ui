import { MutableRefObject, useEffect } from "react"

export interface Key {
  /** Keyboard key value */
  key: string
  /** Optional Ctrl / ⌃ key */
  withCtrl?: boolean
  /** Optional Shift key */
  withShift?: false
  /** Optional Alt / ⌥ key */
  withAlt?: boolean
  /** Optional meta ⌘ / ⊞ key */
  withMeta?: boolean
}

/**
 * Hook for linking some hotkey to a callback function
 *
 * @param scope - A ref to an HTMLElement, scoping the hotkey binding
 * @param key - hotkey definition object
 * @param callback- a callback to be invoked when the hotkey is hit
 *
 */
export function useHotkey(scope: MutableRefObject<HTMLElement>, hotkey: Key, callback: () => void) {
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
      if (event.key.toLowerCase() !== hotkey.key.toLowerCase()) {
        return
      }

      if (hotkey.withCtrl && !event.ctrlKey) {
        return
      }

      if (hotkey.withShift && !event.shiftKey) {
        return
      }

      if (hotkey.withAlt && !event.altKey) {
        return
      }

      if (hotkey.withMeta && !event.metaKey) {
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
