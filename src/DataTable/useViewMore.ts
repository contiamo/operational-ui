import * as React from "react"

/**
 * Handles logic to display a popup at mouse cursor position,
 * triggered by a click event.
 */
const useViewMore = () => {
  const [viewMorePopup, setViewMorePopup] = React.useState<{ content: string; x: number; y: number } | false>(false)

  const openViewMore = React.useCallback(
    (content: string) => (e: React.MouseEvent) => {
      e.stopPropagation()
      setViewMorePopup({ content, x: e.clientX, y: e.clientY })
    },
    [viewMorePopup],
  )

  const close = () => setViewMorePopup(false)

  return {
    viewMorePopup,
    toggle: (content: string) => (viewMorePopup ? close() : openViewMore(content)),
    open: openViewMore,
    close,
  }
}

export default useViewMore
