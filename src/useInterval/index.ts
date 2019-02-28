import { useEffect, useRef } from "react"

// Ref: https://github.com/Hermanya/use-interval/blob/master/src/index.tsx

// tslint:disable-next-line
const noop = () => {}

/**
 * Hook version of setInterval. Pass null to the delay to cancel an execution.
 */
export function useInterval(callback: () => void, delay: number | null, immediate?: boolean) {
  const savedCallback = useRef(noop)

  // Remember the latest callback.
  // useEffect has no second argument so it will be executed after each render
  // but we don't want to change this value directly in the body of the render function, 
  // because render should be pure function
  useEffect(() => {
    savedCallback.current = callback
  })

  // Execute callback if immediate is set.
  useEffect(() => {
    if (immediate && delay !== null) {
      savedCallback.current()
    }
  }, [immediate])

  // Set up the interval.
  useEffect(() => {
    if (delay === null) {
      return undefined
    }
    const tick = () => savedCallback.current()
  const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}

export default useInterval
