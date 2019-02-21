import { useEffect, useState } from "react"

/**
 * Get the window size.
 */
export const useWindowSize = () => {
  if (typeof window === "undefined") {
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
