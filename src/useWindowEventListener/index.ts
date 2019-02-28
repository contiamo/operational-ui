import { useEffect } from "react"

/**
 * Hook version of window.addEventListener.
 */
function useWindowEventListener<K extends keyof GlobalEventHandlersEventMap>(
  type: K,
  listener: EventListenerOrEventListenerObject,
  addOptions?: AddEventListenerOptions,
  removeOptions?: EventListenerOptions,
) {
  useEffect(() => {
    window.addEventListener(type, listener, addOptions)
    return () => window.removeEventListener(type, listener, removeOptions)
  }, [])
}

export default useWindowEventListener
