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

    const handleClickOutside = () => {
      setViewMorePopup(false)
    }

    document.addEventListener("click", handleClickOutside)
    document.addEventListener("contextmenu", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.removeEventListener("contextmenu", handleClickOutside)
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
