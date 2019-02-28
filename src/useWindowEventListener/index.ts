import { useEffect } from "react"

/**
 * useWindowEventListener
 */
function useWindowEventListener<K extends keyof GlobalEventHandlersEventMap>(
  key: K,
  cb: EventListenerOrEventListenerObject,
  addEventListenerOptions?: AddEventListenerOptions,
  removeEventListenerOptions?: EventListenerOptions,
) {
  useEffect(() => {
    window.addEventListener(key, cb, addEventListenerOptions)
    return () => window.removeEventListener(key, cb, removeEventListenerOptions)
  }, [])
}

export default useWindowEventListener
