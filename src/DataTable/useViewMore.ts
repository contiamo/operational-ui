import * as React from "react"

/**
 * Handles logic to display a popup at mouse cursor position,
 * triggered by a click event.
 */
const useViewMore = () => {
  const closeTimeoutIdRef = React.useRef<number>()
  const [viewMorePopup, setViewMorePopup] = React.useState<{ content: React.ReactNode; x: number; y: number } | false>(
    false,
  )

  const close = React.useCallback((immediately?: true | React.MouseEvent) => {
    window.clearTimeout(closeTimeoutIdRef.current)
    if (immediately === true) {
      closeTimeoutIdRef.current = undefined
      setViewMorePopup(false)
    } else {
      closeTimeoutIdRef.current = window.setTimeout(() => setViewMorePopup(false), 150)
    }
  }, [])
  React.useEffect(() => () => window.clearTimeout(closeTimeoutIdRef.current), [])

  const open = React.useCallback(
    (content: React.ReactNode) => (e: React.MouseEvent) => {
      e.stopPropagation()
      window.clearTimeout(closeTimeoutIdRef.current)
      closeTimeoutIdRef.current = undefined
      const { clientX, clientY } = e
      setViewMorePopup(current =>
        current && current.content === content
          ? current
          : {
              content,
              x: clientX > window.innerWidth / 2 ? clientX - 8 : clientX + 8,
              y: clientY > window.innerHeight / 2 ? clientY - 8 : clientY + 8,
            },
      )
    },
    [],
  )

  const toggle = React.useCallback((content: React.ReactNode) => (viewMorePopup ? close() : open(content)), [
    viewMorePopup,
  ])

  return {
    viewMorePopup,
    toggle,
    open,
    close,
  }
}

export default useViewMore
