import * as React from "react"

/**
 * Handles logic to display a popup at mouse cursor position,
 * triggered by a click event.
 */
const useViewMore = () => {
  const [viewMorePopup, setViewMorePopup] = React.useState<{ content: string; x: number; y: number } | false>(false)

  React.useEffect(() => {
    if (!viewMorePopup) {
      return
    }

    const close = () => {
      setViewMorePopup(false)
    }

    document.addEventListener("click", close)
    document.addEventListener("contextmenu", close)
    document.addEventListener("scroll", close)

    return () => {
      document.removeEventListener("click", close)
      document.removeEventListener("contextmenu", close)
      document.removeEventListener("scroll", close)
    }
  }, [viewMorePopup])

  const openViewMore = React.useCallback(
    (content: string) => (e: React.MouseEvent) => {
      setViewMorePopup({ content, x: e.clientX, y: e.clientY })
    },
    [viewMorePopup],
  )

  return {
    viewMorePopup,
    toggle: (content: string) => (viewMorePopup ? setViewMorePopup(false) : openViewMore(content)),
    open: openViewMore,
  }
}

export default useViewMore
