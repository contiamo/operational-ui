import { useCallback, useEffect, useRef } from "react"

/**
 * debouncedCB hook.
 */
export function useDebouncedCallback(callback: (...args: any[]) => void, delay: any, deps: React.DependencyList) {
  const fnTimeoutHandler = useRef<any>(null)
  const debouncedFn = useCallback(callback, deps)

  useEffect(
    () => () => {
      clearTimeout(fnTimeoutHandler.current!)
    },
    [],
  )

  return (...args: any[]) => {
    clearTimeout(fnTimeoutHandler.current!)
    fnTimeoutHandler.current! = setTimeout(() => {
      debouncedFn(...args)
    }, delay)
  }
}

export default useDebouncedCallback
