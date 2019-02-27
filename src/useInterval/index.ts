import { useEffect, useRef } from "react"

// Ref: https://github.com/Hermanya/use-interval/blob/master/src/index.tsx

// tslint:disable-next-line
const noop = () => {}

/**
 * useInterval
 */
export function useInterval(callback: () => void, delay: number | null, immediate?: boolean) {
  const savedCallback = useRef(noop)

  // Remember the latest callback.
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
    const id = setInterval(tick, delay)
    return () => clearInterval(id)
  }, [delay])
}

export default useInterval
