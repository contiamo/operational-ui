import { useEffect, useState } from "react"
import { isClient } from "../utils/isClient"

/**
 * Get the window size.
 */
export const useWindowSize = () => {
  if (isClient()) {
    // tslint:disable-next-line:no-console
    console.error("Unsupported: window is undefined")
    return { width: -1, height: -1 }
  }
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handler = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [])

  return windowSize
}

export default useWindowSize
