import * as React from "react"

/**
 * Handles logic to display a popup at mouse cursor position,
 * triggered by a click event.
 */
const useViewMore = () => {
  const closeTimeoutIdRef = React.useRef<number>()
  const [viewMorePopup, setViewMorePopup] = React.useState<{ content: string; x: number; y: number } | false>(false)

  const close = React.useCallback(() => {
    if (viewMorePopup) {
      closeTimeoutIdRef.current = window.setTimeout(() => setViewMorePopup(false), 150)
    }
  }, [viewMorePopup])
  React.useEffect(() => () => window.clearTimeout(closeTimeoutIdRef.current), [])

  const open = React.useCallback(
    (content: string) => (e: React.MouseEvent) => {
      e.stopPropagation()
      window.clearTimeout(closeTimeoutIdRef.current)
      setViewMorePopup({
        content,
        x: e.clientX > window.innerWidth / 2 ? e.clientX - 8 : e.clientX + 8,
        y: e.clientY > window.innerHeight / 2 ? e.clientY - 8 : e.clientY + 8,
      })
    },
    [],
  )

  const toggle = React.useCallback((content: string) => (viewMorePopup ? close() : open(content)), [viewMorePopup])

  return {
    viewMorePopup,
    toggle,
    open,
    close,
  }
}

export default useViewMore
