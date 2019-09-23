import * as React from "react"

/**
 * Handles logic to display a popup at mouse cursor position,
 * triggered by a click event.
 */
const useViewMore = () => {
  let closeTimeoutId = 0
  const [viewMorePopup, setViewMorePopup] = React.useState<{ content: string; x: number; y: number } | false>(false)

  const openViewMore = React.useCallback(
    (content: string) => (e: React.MouseEvent) => {
      window.clearTimeout(closeTimeoutId)
      e.stopPropagation()
      setViewMorePopup({
        content,
        x: e.clientX > window.innerWidth / 2 ? e.clientX - 8 : e.clientX + 8,
        y: e.clientY > window.innerHeight / 2 ? e.clientY - 8 : e.clientY + 8,
      })
    },
    [viewMorePopup, closeTimeoutId],
  )

  const close = () => {
    closeTimeoutId = window.setTimeout(() => setViewMorePopup(false), 150)
  }

  React.useEffect(
    () => () => {
      if (closeTimeoutId) {
        window.clearTimeout(closeTimeoutId)
      }
    },
    [closeTimeoutId],
  )

  return {
    viewMorePopup,
    toggle: (content: string) => (viewMorePopup ? close() : openViewMore(content)),
    open: openViewMore,
    close,
  }
}

export default useViewMore
