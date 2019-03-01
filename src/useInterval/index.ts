import noop from "lodash/noop"
import { useEffect, useRef } from "react"

// From: https://overreacted.io/making-setinterval-declarative-with-react-hooks/

/**
 * Hook version of setInterval. Pass null to the delay to cancel an execution.
 */
export function useInterval(callback: () => void, delay: number | null, immediate?: boolean) {
  const savedCallback = useRef(noop)

  // Remember the latest callback.
  // useEffect has no second argument so it will be executed after each render
  // but we don't want to change this value directly in the body of the render function,
  // because render should be pure function

  // After every render, save the latest callback into our ref.
  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    if (immediate && delay !== null) {
      savedCallback.current()
    }
  }, [immediate]) // when immediate changes, we want to restart the timer

  // Set up the interval.
  useEffect(() => {
    if (delay === null) {
      return undefined
    }
    // we can read and call latest callback from inside our interval:
    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay]) // when delay changes, we want to restart the timer
}

export default useInterval
