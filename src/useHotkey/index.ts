import { RefObject, useEffect } from "react"

export interface Key {
  /** Keyboard key value */
  key: string
  /** Optional Ctrl / ⌃ key */
  ctrl?: boolean
  /** Optional Shift key */
  shift?: boolean
  /** Optional Alt / ⌥ key */
  alt?: boolean
  /** Optional meta ⌘ / ⊞ key */
  meta?: boolean
}

/**
 * Hook for linking some hotkey to a callback function
 *
 * @param containerNode - A ref to an HTMLElement, scoping the hotkey binding
 * @param key - hotkey definition object
 * @param callback- a callback to be invoked when the hotkey is hit
 *
 */
export function useHotkey(containerNode: RefObject<HTMLElement>, hotkey: Key, callback: () => void) {
  useEffect(() => {
    const addKeyBinding = (): void => {
      if (containerNode.current) {
        containerNode.current.addEventListener("keydown", keyDownHandler, true)
      }
    }

    const removeKeyBinding = (): void => {
      if (containerNode.current) {
        containerNode.current.removeEventListener("keydown", keyDownHandler, true)
      }
    }

    const keyDownHandler = (event: KeyboardEvent): void => {
      if (event.key.toLowerCase() !== hotkey.key.toLowerCase()) {
        return
      }

      if (hotkey.ctrl && !event.ctrlKey) {
        return
      }

      if (hotkey.shift && !event.shiftKey) {
        return
      }

      if (hotkey.alt && !event.altKey) {
        return
      }

      if (hotkey.meta && !event.metaKey) {
        return
      }

      event.stopPropagation()
      callback()
    }

    addKeyBinding()
    return removeKeyBinding
  }, [containerNode.current])
}

export default useHotkey
