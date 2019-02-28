import { DependencyList, useCallback, useEffect, useRef } from "react"

type AnyFunc = (...args: any[]) => any

type ArgumentTypes<F extends AnyFunc> = F extends (...args: infer A) => any ? A : never

/**
 * useDebounced Callback wraps a callback within useCallback and returns
 */

export function useDebouncedCallback<T extends AnyFunc>(callback: T, delay: number, deps: DependencyList) {
  const fnTimeoutHandler = useRef<any>(null)
  const debouncedFn = useCallback(callback, deps)

  useEffect(
    () => () => {
      clearTimeout(fnTimeoutHandler.current)
    },
    [],
  )

  return (...args: ArgumentTypes<T>) => {
    clearTimeout(fnTimeoutHandler.current)
    fnTimeoutHandler.current = setTimeout(() => {
      debouncedFn(...args)
    }, delay)
  }
}

export default useDebouncedCallback
