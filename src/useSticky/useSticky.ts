import * as React from "react"
import get from "lodash/get"

/**
 *
 * Hook to take a component from an initial position
 * and FIX/stick it to the screen. Typically used for
 * nailing down positions of elements and then placing
 * them above other elements in the viewport.
 *
 * Used in:
 * - SidenavItem/Popout
 * - ContextMenu
 *
 * @param inputRef - a ref to the component we would like to stick
 * @param initialValue - initial positioning CSS values
 */
const useSticky = ({
  inputRef,
  options,
  initialValue,
}: {
  inputRef: React.Ref<HTMLElement>
  options?: {
    shouldAvoidToggler: boolean
  }
  initialValue?: {
    top: string
    left: string
    width?: string
    position: "fixed" | "absolute" | "sticky" | "relative" | "static" | "initial"
    alignment: "flex-start" | "flex-end"
  }
}) => {
  const defaultDisplaySettings = {
    top: initialValue ? initialValue.top : "0",
    left: initialValue ? initialValue.left : "100%",
    width: initialValue ? initialValue.width : "100%",
    position: initialValue ? initialValue.position : "absolute",
    alignment: initialValue ? initialValue.alignment : "flex-start",
  }

  const [displaySettings, setDisplaySettings] = React.useState(defaultDisplaySettings)

  React.useLayoutEffect(() => {
    /**
     * inputRef is of type React.Ref
     * React.Ref = ((instance: HTMLElement | null) => void) | React.RefObject<HTMLElement> | undefined
     *
     * We check for emptiness first with &&, but then we still need the `as` assertion because
     * ts can't figure out that React.Ref in this case is a React.RefObject and NOT a function-style ref.
     */
    const node = inputRef && (inputRef as React.RefObject<HTMLDivElement>).current

    if (node) {
      const draftSettings: Partial<typeof defaultDisplaySettings> = {}
      const rect = node.getBoundingClientRect()
      const hasEnoughRoomUnderContainer = rect.top + rect.height + window.scrollY < window.scrollY + window.innerHeight

      draftSettings.left = `${rect.left}px`
      draftSettings.width = `${rect.width}px`

      if (!hasEnoughRoomUnderContainer) {
        // open towards the top
        draftSettings.top = get(options, "shouldAvoidToggler", false)
          ? `${rect.top -
              (rect.height + (node.parentElement ? node.parentElement.getBoundingClientRect().height : 0))}px`
          : `${rect.top - (rect.height - (node.parentElement ? node.parentElement.clientHeight : 0))}px`

        draftSettings.alignment = "flex-end"
      } else {
        draftSettings.top = `${rect.top}px`
        draftSettings.alignment = "flex-start"
      }

      draftSettings.position = "fixed"
      setDisplaySettings({ ...displaySettings, ...draftSettings })
    }
  }, [inputRef, options])

  return displaySettings
}

export default useSticky
