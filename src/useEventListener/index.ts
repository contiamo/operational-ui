import { useEffect } from "react"

/**
 * useEventListener
 */
function useEventListener<K extends keyof GlobalEventHandlersEventMap>(
  key: K,
  cb: (e: any) => void,
  addEventListenerOptions?: AddEventListenerOptions,
  removeEventListenerOptions?: EventListenerOptions,
) {
  useEffect(() => {
    window.addEventListener(key, cb, addEventListenerOptions)
    return () => window.removeEventListener(key, cb, removeEventListenerOptions)
  }, [])
}

export default useEventListener
