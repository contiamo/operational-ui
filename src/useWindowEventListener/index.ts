import { useEffect } from "react"

/**
 * Hook version of window.addEventListener.
 */

function useWindowEventListener<K extends keyof WindowEventMap>(
  type: K,
  listener: (ev: WindowEventMap[K]) => any,
  addOptions?: boolean | AddEventListenerOptions,
  removeOptions?: boolean | EventListenerOptions,
) {
  useEffect(() => {
    window.addEventListener(type, listener, addOptions)
    return () => window.removeEventListener(type, listener, removeOptions)
  }, [])
}

export default useWindowEventListener
